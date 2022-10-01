import RatingStar from "@/components/RatingStar";
import Image from "next/image";
import axios from "@/lib/axios";
import CommentForm from "../comment/CommentForm";
import Comment from "../comment/Comment";
import { DropdownButton } from "@/components/DropdownLink";
import Dropdown from "@/components/Dropdown";
import { useState, useEffect, setModal } from "react";
import Toaster from "@/components/Toaster";

const Review = ({ review, user, setShowLoginModal, removeReview }) => {
  const [likeable, setLikeable] = useState(true);
  const [dislikeable, setDisLikebale] = useState(true);
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);
  const [comments, setComments] = useState(
    review.comments.length > 0 ? [...review.comments.data] : []
  );
  const [cancomment, setCancomment] = useState(false);

  useEffect(() => {
    canLike();
    canDisLike();
  }, []);

  function canLike() {
    if (user) {
      axios
        .post("/api/review/likeable", {
          review_id: review.id,
          user_id: user.id,
        })
        .then((res) => {
          if (res.data.success) {
            setLikeable(true);
          } else {
            setLikeable(false);
          }
        });
    }
    setLikeable(true);
  }
  function handleClickLike(e) {
    if (user) {
      setShowLoginModal(false);
      if (likeable) {
        axios
          .post("api/review/like", {
            review_id: review.id,
            user_id: user.id,
          })
          .then((res) => {
            if (res.data.success) {
              setLikeable(false);
            } else {
              setLikeable(true);
            }
            setLikes(res.data.likes);
          })
          .catch((error) => {
            // if (error.response.status !== 422) throw error;
            // setErrors(Object.values(error.response.data.errors).flat());
          });
      } else {
        axios
          .post("api/review/unlike", {
            review_id: review.id,
            user_id: user.id,
          })
          .then((res) => {
            if (res.data.success) {
              setLikeable(true);
            } else {
              setLikeable(false);
            }
            setLikes(res.data.likes);
          })
          .catch((error) => {
            // if (error.response.status !== 422) throw error;
            // setErrors(Object.values(error.response.data.errors).flat());
          });
      }
    } else {
      setShowLoginModal(true);
    }
  }
  function canDisLike() {
    if (user) {
      axios
        .post("/api/review/dislikeable", {
          review_id: review.id,
          user_id: user.id,
        })
        .then((res) => {
          if (res.data.success) {
            setDisLikebale(true);
          } else {
            setDisLikebale(false);
          }
        });
    }
    setDisLikebale(true);
  }
  function handleClickDislike(e) {
    if (user) {
      setShowLoginModal(false);
      if (dislikeable) {
        axios
          .post("api/review/dislike", {
            review_id: review.id,
            user_id: user.id,
          })
          .then((res) => {
            if (res.data.success) {
              setDisLikebale(false);
            } else {
              setDisLikebale(true);
            }
            setDislikes(res.data.likes);
          })
          .catch((error) => {
            // if (error.response.status !== 422) throw error;
            // setErrors(Object.values(error.response.data.errors).flat());
          });
      } else {
        axios
          .post("api/review/undislike", {
            review_id: review.id,
            user_id: user.id,
          })
          .then((res) => {
            if (res.data.success) {
              setDisLikebale(true);
            } else {
              setDisLikebale(false);
            }
            setDislikes(res.data.likes);
          })
          .catch((error) => {
            // if (error.response.status !== 422) throw error;
            // setErrors(Object.values(error.response.data.errors).flat());
          });
      }
    } else {
      setShowLoginModal(true);
    }
  }
  function handleClickComment(e) {
    if (user) {
      setShowLoginModal(false);
      setCancomment(true);
    } else {
      setShowLoginModal(true);
    }
  }
  function addComment(comment) {
    setComments([...comments, comment]);
  }

  function deleteReview(review_id) {
    if (typeof user === "undefined") {
      setShowLoginModal(true);
    } else {
      axios
        .post("api/review/destroy", {
          review_id: review_id,
          user_id: user.id,
        })
        .then((res) => {
          if (res.data.success) {
            Toaster.notify(res.data.message, { type: "success" });
            removeReview(review_id);
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
    <div className="bg-gray-100 rounded-lg dark:bg-gray-800 my-6 md:px-10">
      <div className="md:p-4 border-b ">
        {/* top section of review */}
        <div className="flex items-cetner justify-between ">
          <div className=" flex  md:py-1 py-3 px-1">
            {/* user image  */}
            <div>
              {review.profile.avatar ? (
                <Image
                  loader={() => review.profile.avatar}
                  src={review.profile.avatar}
                  alt={review.profile.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-2"
                />
              ) : (
                <Image
                  src="/avatar.PNG"
                  alt={review.profile.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-2"
                />
              )}
            </div>
            {/* profile desc  */}
            <div className="flex flex-col px-3 ">
              <div className="text-md font-semibold ">Short Description</div>
              <div className="flex grid grid-cols-1 md:grid-cols-3 my-2">
                <div className="flex">
                  <div className="text-sm font-semibold">Age</div>
                  <div className="text-sm  opacity-60 mx-2">
                    {review.profile.age}
                  </div>
                </div>
                <div className="flex">
                  <div className="text-sm font-semibold">Skin Type:</div>
                  <div className="text-sm  opacity-60 mx-2">
                    {review.profile.skin_type.data[0].name}
                  </div>
                </div>
                <div className="flex">
                  <div className="text-sm font-semibold">Days use:</div>
                  <div className="text-sm  opacity-60 mx-2">
                    {review.days_used}
                  </div>
                </div>
              </div>
              {/* options */}
            </div>
          </div>
          <div className="flex justify-center items-center">
            {user ? (
              <div
                className={`${
                  review.user_id != user.id ? "hidden" : ""
                } p-2 rounded-full flex justify-center items-center bg-white  shadow-md`}
              >
                <Dropdown
                  align="center"
                  width="48"
                  trigger={
                    <button className="flex items-center text-sm font-medium text-gray-500  transition duration-150 ease-in-out">
                      <Image
                        src="/settings.svg"
                        alt={review.profile.name}
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
                      deleteReview(review.id);
                    }}
                  >
                    Delete
                  </DropdownButton>
                  <hr></hr>
                  {/* <DropdownButton
                      onClick={() => {
                        setEditComment(true);
                      }}
                    >
                      Edit
                    </DropdownButton> */}
                </Dropdown>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-end ">
            <RatingStar
              rating={Array.from(Array(review.rating).keys())}
              starHeight={20}
              starWidth={20}
            />
          </div>
        </div>
        {/* body section of review */}
        <div className="flex flex-col ">
          {/* liked section  */}
          <div className="px-7 py-4 mb-4">
            <span className="text-sm font-semibold">what I Liked</span>:
            <sapn className="text-sm opacity-60 ml-2">
              {review.liking_factors}
            </sapn>
          </div>
          {/* dislike section  */}
          <div className="px-7 py-4 mb-4">
            <span className="text-sm font-semibold">what I Liked</span>:
            <sapn className="text-sm  opacity-60 ml-2">
              {review.disliking_facotrs}
            </sapn>
          </div>
          {/* image section  */}
          <div className="px-6 rounded-md">
            {review.image != null ? (
              <Image
                loader={() => {
                  return review.image;
                }}
                src={review.image}
                alt={review.image}
                width={300}
                height={200}
                className="py-4"
              />
            ) : (
              <></>
            )}
          </div>
          {/* like dislike section  */}
          <div className="my-6 px-6 grid grid-cols-1 md:grid-col-3">
            <div className="flex justify-start items-center md:col-span-1 col-span-3 my-2 md:my-0">
              <sapn className="text-sm opacity-60 ml-2">
                {review.created_at}
              </sapn>
            </div>
            <div className="flex justify-end items-center  md:col-span-2 col-span-3">
              <div className="flex" onClick={handleClickComment}>
                <div className="px-2">
                  <Image
                    src="/comment.PNG"
                    alt={review.likes}
                    width={20}
                    height={20}
                    className="py-4"
                  />
                </div>
                <div className="text-sm font-medium">Reply:</div>
                <div className="text-sm  opacity-60 mx-2">
                  {`(${comments.length})`}
                </div>
              </div>
              <div className={`${likeable == false ? "hidden" : ""}`}>
                <div className="flex">
                  <div className="px-2">
                    <Image
                      src="/dislike_icon.png"
                      alt={review.dislikes}
                      width={20}
                      height={20}
                      className=""
                    />
                  </div>

                  {dislikeable ? (
                    <div
                      className="text-sm  opacity-100 mx-2"
                      onClick={handleClickDislike}
                    >
                      Dislike
                    </div>
                  ) : (
                    <div
                      className="text-sm  opacity-100 mx-2 text-red-600"
                      onClick={handleClickDislike}
                    >
                      Dislike
                    </div>
                  )}
                  <div className="text-sm  opacity-60 mx-2">{`(${dislikes})`}</div>
                </div>
              </div>
              <div className={`${dislikeable == false ? "hidden" : ""}`}>
                <div className="flex">
                  <div className="px-2">
                    <Image
                      src="/love_icon.png"
                      alt={review.likes}
                      width={20}
                      height={20}
                      className=""
                    />
                  </div>
                  {likeable ? (
                    <div
                      className="text-sm font-medium"
                      onClick={handleClickLike}
                    >
                      Like:
                    </div>
                  ) : (
                    <div
                      className="text-sm font-medium text-red-600"
                      onClick={handleClickLike}
                    >
                      UnLike:
                    </div>
                  )}
                  <div className="text-sm  opacity-60 mx-2">{`(${likes})`}</div>
                </div>
              </div>
            </div>
          </div>
          {/* comment section  */}
          {cancomment ? (
            <CommentForm
              url={`api/comments/store`}
              model={review}
              parent_id={null}
              modelName={`review`}
              user={user}
              handleClick={setShowLoginModal}
              addComment={addComment}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {comments.length > 0 ? (
        comments.map((comment, index) => {
          return (
            <>
              <Comment
                key={index}
                user={user}
                model={review}
                modelName={`review`}
                comment={comment}
                canlikeComment={true}
                setShowLoginModal={setShowLoginModal}
              />
            </>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Review;
