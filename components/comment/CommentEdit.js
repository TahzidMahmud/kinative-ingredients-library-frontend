import { useState, useEffect, useRef } from "react";
import axios from "@/lib/axios";
import InputEmoji from "react-input-emoji";
import Image from "next/image";
import Toaster from "@/components/Toaster";

const CommentEdit = ({
  comment,
  user,
  setEditComment,
  setcmtnBody,
  setcmntImage,
}) => {
  console.log(comment.body);
  const [body, setBody] = useState(comment.body);
  const [loading, setLoading] = useState(true);
  const imageInput = useRef(null);
  const [cmntimage, setCmntimage] = useState(null);
  useEffect(() => {
    axios
      .post(`/api/get-comment`, {
        comment_id: comment.id,
      })
      .then((res) => {
        if (res.data.data) {
          setTimeout(() => {
            setBody(res.data.data.body);
          }, 300);
          setCmntimage(res.data.data.image);
          setLoading(false);
        }
      });
  }, []);
  function convertImage() {
    var reader = new FileReader();
    reader.readAsDataURL(imageInput.current.files[0]);
    if (imageInput.current.files[0].size < 5245329) {
      reader.onloadend = function (e) {
        setCmntimage(reader.result);
      };
    } else {
      Toaster.notify("Image Size Must Be Smaller Than 5MB", { type: "error" });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (user) {
      let url = `/api/comment/update`;
      const form = document.querySelector("form");
      const formData = new FormData(form);

      formData.append("user_id", user.id);
      formData.append("comment_id", comment.id);
      formData.append("body", body);
      formData.append("image", cmntimage);
      formData.append("imgname", imageInput.current.value);

      await axios
        .post(`${url}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            setCmntimage(null);
            Toaster.notify(res.data.message, { type: "success" });
            setcmtnBody(res.data.comment.body);
            setcmntImage(res.data.comment.image);
            setCmntimage(null);
            setBody("");
            setEditComment(false);
          } else {
            Toaster.notify(res.data.message, { type: "error" });
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
      {loading ? (
        <div className="animate-pulse flex space-x-2 flex flex-col items-center w-full my-2">
          <div className="rounded bg-slate-200 h-[2rem] w-[90%]  "></div>
        </div>
      ) : (
        <>
          <div className="my-4 mr-6">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <InputEmoji
                  value={body}
                  onChange={setBody}
                  cleanOnEnter
                  borderRadius={0}
                  placeholder="Type a comment..."
                />
                <button
                  type="button"
                  className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  onClick={() => imageInput.current.click()}
                >
                  <Image
                    src="/icons8-picture.svg"
                    alt="logo"
                    width={24}
                    height={24}
                    className="rounded-t-lg py-6"
                  />
                  <span className="sr-only">Upload image</span>
                </button>
                <input
                  ref={imageInput}
                  type="file"
                  name="imageInput"
                  // multiple="true"
                  onChange={convertImage}
                  className="hidden"
                />
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <Image
                    src="/icons8-plus.svg"
                    alt="logo"
                    width={26}
                    height={26}
                    className="rounded-t-lg py-4"
                  />
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>
            {cmntimage != null ? (
              <div className="mx-2 my-2 flex items-center justify-between">
                <Image
                  loader={() => cmntimage}
                  src={cmntimage}
                  alt={`comment_${comment.id}_${comment.author.id}`}
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
      )}
    </>
  );
};

export default CommentEdit;
