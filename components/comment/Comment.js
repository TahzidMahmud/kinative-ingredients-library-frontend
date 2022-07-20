import Image from "next/image";
import axios from "@/lib/axios";
import CommentForm from "@/components/comment/CommentForm";
import Reply from "@/components/comment/Reply";
import { useState, useEffect } from "react";

const Comment = ({
  user,
  blog,
  comment,
  canlikeComment,
  setShowLoginModal,
}) => {
  const [canlike, setCanlike] = useState(canlikeComment);
  const [canreply, setCanreply] = useState(false);
  const [replies, setReplies] = useState(comment.reply);
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
    if (typeof user === "undefined") {
      setShowLoginModal(true);
    } else {
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
  function replyComment() {
    if (typeof user === "undefined") {
      setShowLoginModal(true);
    } else {
      setCanreply(true);
    }
  }
  function addReply(comment) {
    setReplies([...replies, comment]);
    setCanreply(false);
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
      <div className="flex pt-3 px-6">
        {canlike === true ? (
          <div className="flex mx-2" onClick={likeComment}>
            {likes} Likes
          </div>
        ) : (
          <div className="flex mx-2" onClick={unlikeComment}>
            {likes} <span className="text-red-400">Unlikes</span>
          </div>
        )}
        <div className="flex mx-2 " onClick={replyComment}>
          Reply
        </div>
      </div>

      {canreply === true ? (
        <div className="md:px-16">
          <CommentForm
            url={`api/comments/store`}
            model={blog}
            parent_id={comment.id}
            modelName={`blog`}
            user={user}
            handleClick={null}
            addComment={addReply}
          />
        </div>
      ) : (
        <></>
      )}
      {/* replies list */}
      {replies.map((reply, index) => (
        <Reply key={index} reply={reply}  />
      ))}
    </>
  );
};

export default Comment;
