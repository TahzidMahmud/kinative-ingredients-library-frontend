import Image from "next/image";
import axios from "@/lib/axios";
import CommentForm from "@/components/comment/CommentForm";
import Reply from "@/components/comment/Reply";
import { useState, useEffect } from "react";

const Comment = ({
  user,
  model,
  modelName,
  comment,
  canlikeComment,
  setShowLoginModal,
}) => {
  const [canlike, setCanlike] = useState(canlikeComment);
  const [candislike, setCandislike] = useState(canlikeComment);
  const [canreply, setCanreply] = useState(false);
  const [replies, setReplies] = useState(comment.reply);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);

  useEffect(() => {
    if (user) {
      likedBefore();
      dislikedBefore();
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
  function dislikedBefore() {
    if (typeof user !== "undefined") {
      setCandislike(true);
    } else {
      setCandislike(false);
    }
    if (user) {
      axios
        .post("/api/comment/dislikeable", {
          comment_id: comment.id,
          user_id: user.id,
        })
        .then((res) => {
          if (res.data.success) {
            setCandislike(true);
          } else {
            setCandislike(false);
          }
        });
    } else {
      setCandislike(true);
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

  function dislikeComment() {
    if (typeof user === "undefined") {
      setShowLoginModal(true);
    } else {
      axios
        .post("api/comment/dislike", {
          comment_id: comment.id,
          user_id: user.id,
        })
        .then((res) => {
          if (res.data.success) {
            setCandislike(false);
          } else {
            setCandislike(true);
          }
          setDislikes(res.data.dislikes);
        })
        .catch((error) => {
          // if (error.response.status !== 422) throw error;
          // setErrors(Object.values(error.response.data.errors).flat());
        });
    }
  }
  function undislikeComment() {
    axios
      .post("api/comment/undislike", {
        comment_id: comment.id,
        user_id: user.id,
      })
      .then((res) => {
        if (res.data.success) {
          setCandislike(true);
        } else {
          setCandislike(false);
        }
        setDislikes(res.data.dislikes);
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
      {/* top section of comment */}
      <div className="flex items-cetner justify-start ml-20 my-6">
        <div className=" flex">
          {/* user image  */}
          <div>
            {comment.author.avatar ? (
              <Image
                loader={() => comment.author.avatar}
                src={comment.author.avatar}
                alt={comment.author.name}
                width={60}
                height={60}
                className="rounded-full mr-2"
              />
            ) : (
              <Image
                src="/avatar.PNG"
                alt={comment.author.name}
                width={60}
                height={60}
                className="rounded-full mr-2"
              />
            )}
          </div>
          {/* profile desc  */}
          <div className="flex flex-col px-3">
            <div className="text-md font-semibold ">Short Description</div>
            <div className="flex my-2">
              <div className="flex">
                <div className="text-sm font-semibold">Age</div>
                <div className="text-sm  opacity-60 mx-2">
                  {comment.author.age}
                </div>
              </div>
              <div className="flex">
                <div className="text-sm font-semibold">Skin Type:</div>
                <div className="text-sm  opacity-60 mx-2">
                  {comment.author.skin_type.data[0].name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-20">
        <div className="md:px-7 py-1 mb-4">
          <sapn className="text-sm opacity-60">{comment.body}</sapn>
        </div>
        <div className="p-3 rounded-lg">
          {comment.image != null ? (
            <Image
              loader={() => {
                return comment.image;
              }}
              src={comment.image}
              alt={comment.author.name}
              width={300}
              height={200}
              className="py-4"
            />
          ) : (
            <></>
          )}
        </div>
        {/* like dislike section  */}
        <div className="my-6 md:px-6 flex justify-between items-center grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-start items-center ">
            <sapn className="text-sm opacity-60 ml-2">
              {comment.created_at}
            </sapn>
          </div>
          <div className="flex justify-end items-center my-2 md:my-0 mx-2 md:mx-0">
            <div className="flex cursor-pointer" onClick={replyComment}>
              <div className="px-2 cursor-pointer">
                <Image
                  src="/comment.PNG"
                  alt={comment.likes}
                  width={20}
                  height={20}
                  className="py-4"
                />
              </div>
              <div className="text-sm font-medium cursor-pointer">Reply:</div>
              <div className="text-sm  opacity-60 mx-2">
                {`(${comment.reply.length})`}
              </div>
            </div>
            <div className={`${canlike == false ? "hidden" : ""}`}>
              <div className="flex cursor-pointer">
                <div className="px-2 cursor-pointer">
                  <Image
                    src="/dislike_icon.png"
                    alt={comment.dislikes}
                    width={20}
                    height={20}
                    className=""
                  />
                </div>

                {candislike ? (
                  <div
                    className="text-sm  opacity-100 mx-2 cursor-pointer"
                    onClick={dislikeComment}
                  >
                    <span className="cursor-pointer">Dislike</span>
                  </div>
                ) : (
                  <div
                    className="text-sm  opacity-100 mx-2 text-red-600 cursor-pointer"
                    onClick={undislikeComment}
                  >
                    <span className="cursor-pointer">Un Dislike</span>
                  </div>
                )}
                <div className="text-sm  opacity-60 mx-2">{`(${
                  dislikes.length > 0 ? dislikes : 0
                })`}</div>
              </div>
            </div>
            <div className={`${candislike == false ? "hidden" : ""}`}>
              <div className="flex cursor-pointer">
                <div className="px-2">
                  <Image
                    src="/love_icon.png"
                    alt={comment.likes}
                    width={20}
                    height={20}
                    className=""
                  />
                </div>
                {canlike === true ? (
                  <div
                    className="text-sm font-medium cursor-pointer"
                    onClick={likeComment}
                  >
                    <span className="cursor-pointer">Like:</span>
                  </div>
                ) : (
                  <div
                    className="text-sm font-medium text-red-600 cursor-pointer"
                    onClick={unlikeComment}
                  >
                    <span className="cursor-pointer"> UnLike:</span>
                  </div>
                )}
                <div className="text-sm  opacity-60 mx-2">{`(${
                  likes.length > 0 ? likes : 0
                })`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {canreply === true ? (
        <div className="md:px-16">
          <CommentForm
            url={`api/comments/store`}
            model={model}
            parent_id={comment.id}
            modelName={modelName}
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
        <Reply key={index} reply={reply} />
      ))}
    </>
  );
};

export default Comment;
