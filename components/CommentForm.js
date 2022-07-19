import { useState, useRef } from "react";
import InputEmoji from "react-input-emoji";
import Image from "next/image";
import axios from "@/lib/axios";

const CommentForm = ({ url, model, modelName, user, handleClick }) => {
  const [comment, setComment] = useState("");
  const imageInput = useRef(null);
  const [cmntimage, setCmntimage] = useState(null);
  function convertImage() {
    var reader = new FileReader();
    var url = reader.readAsDataURL(imageInput.current.files[0]);
    reader.onloadend = function (e) {
      setCmntimage(reader.result);
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (user) {
      const form = document.querySelector("form");
      const formData = new FormData(form);
      formData.append(`${modelName}_id`, model.id);
      formData.append("user_id", user.id);
      formData.append("body", comment);
      axios
        .post(`${url}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            setComment("");
            setCmntimage(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      handleClick(true);
    }
  }
  return (
    <>
      <div className="my-4 w-3/4 ">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700 ">
            <InputEmoji
              value={comment}
              onChange={setComment}
              cleanOnEnter
              borderRadius={0}
              placeholder="Type a comment..."
            />
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              htmlFor="imageInput"
              onClick={() => imageInput.current.click()}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Upload image</span>
            </button>
            <input
              ref={imageInput}
              type="file"
              name="imageInput"
              multiple="true"
              onChange={convertImage}
              className="hidden"
            />
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
        {cmntimage != null ? (
          <div className="mx-2 my-2 flex items-center justify-between">
            <Image
              loader={() => cmntimage}
              src={cmntimage}
              alt={blog.title}
              width={150}
              height={150}
              className="py-6 border border-red-400 rounded-lg m-1"
            />
            <div
              className="bg-white text-black md:p-4 sm:p-3 h-6 w-6 rounded-2xl flex justify-center items-center"
              onClick={() => {
                setCmntimage(null);
              }}
            >
              <span>x</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CommentForm;
