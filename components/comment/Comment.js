import Image from "next/image";
import axios from "@/lib/axios";
import CommentForm from "@/components/comment/CommentForm";
import Reply from "@/components/comment/Reply";
import { useState, useEffect } from "react";
import { DropdownButton } from "@/components/DropdownLink";
import Dropdown from "@/components/Dropdown";
import Toaster from "@/components/Toaster";
import CommentEdit from "./CommentEdit";

const Comment = ({
  user,
  model,
  modelName,
  comment,
  canlikeComment,
  setShowLoginModal,
  removeComment,
}) => {
  const [canlike, setCanlike] = useState(canlikeComment);
  const [cmtnBody, setcmtnBody] = useState(comment.body);
  const [cmntImage, setcmntImage] = useState(comment.image);

  const [candislike, setCandislike] = useState(canlikeComment);
  const [canreply, setCanreply] = useState(false);
  const [editComment, setEditComment] = useState(false);
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
  function deleteComment(cmnt_id, reply) {
    if (typeof user === "undefined") {
      setShowLoginModal(true);
    } else {
      axios
        .post("api/comment/destroy", {
          comment_id: cmnt_id,
          user_id: user.id,
        })
        .then((res) => {
          if (res.data.success) {
            Toaster.notify(res.data.message, { type: "success" });
            removeComment(res.data.comment_id);
            if (reply) {
              let ncomments = replies.filter((item) => item.id !== cmnt_id);
              setReplies(ncomments);
            }
          } else {
            Toaster.notify(res.data.message, { type: "error" });
          }
        })
        .catch((error) => {
          // if (error.response.status !== 422) throw error;
          // setErrors(Object.values(error.response.data.errors).flat());
        });
    }
  }
  return (
    <>
      {/* top section of comment */}
      <div className="flex items-cetner justify-start md:ml-20 ml-4 my-6 py-6">
        <div className=" flex items-center">
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
          {/* options */}
          {user ? (
            <div
              className={`${
                comment.author.id != user.id ? "hidden" : ""
              } p-2 rounded-full flex justify-center items-center bg-white  shadow-md`}
            >
              <Dropdown
                align="center"
                width="48"
                trigger={
                  <button className="flex items-center text-sm font-medium text-gray-500  transition duration-150 ease-in-out">
                    <Image
                      src="/settings.svg"
                      alt={comment.author.name}
                      width={20}
                      height={20}
                      className="rounded-full mr-2"
                    />
                  </button>
                }
              >
                {/* Authentication */}
                <DropdownButton
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  Delete
                </DropdownButton>
                <hr></hr>
                <DropdownButton
                  onClick={() => {
                    setEditComment(true);
                  }}
                >
                  Edit
                </DropdownButton>
              </Dropdown>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {editComment == false ? (
        <div className="flex flex-col ml-20">
          <div className="md:px-7 py-1 mb-4">
            <span className="text-sm opacity-60">{cmtnBody}</span>
          </div>
          <div className="p-3 rounded-lg">
            {cmntImage != null ? (
              <Image
                loader={() => {
                  return cmntImage;
                }}
                src={cmntImage}
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
              <span className="text-sm opacity-60 ml-2">
                {comment.created_at}
              </span>
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
      ) : (
        <div className="flex flex-col  ml-20">
          <CommentEdit
            comment={comment}
            user={user}
            setEditComment={setEditComment}
            setcmtnBody={setcmtnBody}
            setcmntImage={setcmntImage}
          />
          <button
            className="text-blue-500 pb-2 pt-0 flex items-start text-sm"
            onClick={() => {
              setEditComment(false);
            }}
          >
            Cancel Edit
          </button>
        </div>
      )}

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
      <hr></hr>
      {/* replies list */}
      {replies != null && replies.length > 0 ? (
        replies.map((reply, index) => (
          <Reply
            user={user}
            key={index}
            reply={reply}
            deleteComment={deleteComment}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default Comment;
