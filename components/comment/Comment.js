import Image from "next/image";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";

const Comment = ({ user, comment, canlikeComment }) => {
  const [canlike, setCanlike] = useState(canlikeComment);
  const [likes, setLikes] = useState(comment.likes);
  useEffect(() => {
    if (user) {
      likedBefore();
    }
  }, [user]);
  function likedBefore() {
    if (typeof user !== "undefined") {
      setCanlike(true);
    } else {
      setCanlike(false);
    }
    if (user) {
      axios
        .post("/api/comment/likeable", {
          comment_id: comment.id,
          user_id: user.id,
        })
        .then((res) => {
          if (res.data.success) {
            setCanlike(true);
          } else {
            setCanlike(false);
          }
        });
    } else {
      setCanlike(true);
    }
  }
  function likeComment() {
    axios
      .post("api/comment/like", {
        comment_id: comment.id,
        user_id: user.id,
      })
      .then((res) => {
        if (res.data.success) {
          setCanlike(false);
        } else {
          setCanlike(true);
        }
        setLikes(res.data.likes);
      })
      .catch((error) => {
        // if (error.response.status !== 422) throw error;
        // setErrors(Object.values(error.response.data.errors).flat());
      });
  }
  function unlikeComment() {
    axios
      .post("api/comment/unlike", {
        comment_id: comment.id,
        user_id: user.id,
      })
      .then((res) => {
        if (res.data.success) {
          setCanlike(true);
        } else {
          setCanlike(false);
        }
        setLikes(res.data.likes);
      })
      .catch((error) => {
        // if (error.response.status !== 422) throw error;
        // setErrors(Object.values(error.response.data.errors).flat());
      });
  }
  return (
    <>
      <div className="flex my-4 ">
        <div>
          <Image
            src="/avatar.PNG"
            alt={comment.name}
            width={60}
            height={60}
            className="py-4"
          />
        </div>
        <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-8/12">
          <div className="flex mb-3">
            <span className="opacity-100 font-semibold text-sm mx-2">
              {comment.autor.name}
            </span>
            <span className="opacity-60 text-sm mx-2">
              {comment.created_at}
            </span>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {comment.body}
          </p>
          <div className="p-3 rounded-lg">
            {comment.image != null ? (
              <Image
                loader={() => {
                  return comment.image;
                }}
                src={comment.image}
                alt={comment.autor.name}
                width={300}
                height={200}
                className="py-4"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="flex p-3 px-6">
        {canlike === true ? (
          <div className="flex mx-2" onClick={likeComment}>
            {likes} Likes
          </div>
        ) : (
          <div className="flex mx-2" onClick={unlikeComment}>
            {likes} <span className="text-red-400">Unlikes</span>
          </div>
        )}
        <div className="flex mx-2">Reply</div>
      </div>
    </>
  );
};

export default Comment;
