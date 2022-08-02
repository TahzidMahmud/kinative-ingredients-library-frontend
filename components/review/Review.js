import RatingStar from "@/components/RatingStar";
import Image from "next/image";
import axios from "@/lib/axios";
import CommentForm from "../comment/CommentForm";

import { useState, useEffect, setModal } from "react";

const Review = ({ review, user, setShowLoginModal }) => {
  const [likeable, setLikeable] = useState(true);
  const [dislikeable, setDisLikebale] = useState(true);
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);
  const [comments, setComments] = useState([...review.comments.data]);
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
  return (
    <>
      {/* top section of review */}
      <div className="flex items-cetner justify-between p-6 ">
        <div className=" flex">
          {/* user image  */}
          <div>
            <Image
              loader={() => review.profile.avatar}
              src={review.profile.avatar}
              alt={review.profile.name}
              width={60}
              height={60}
              className="rounded-full mr-2"
            />
          </div>
          {/* profile desc  */}
          <div className="flex flex-col px-3">
            <div className="text-md font-semibold ">Short Description</div>
            <div className="flex my-2">
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
          </div>
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
        <div className="my-6 px-6 flex justify-between items-center">
          <div className="flex justify-start items-center">
            <sapn className="text-sm opacity-60 ml-2">{review.created_at}</sapn>
          </div>
          <div className="flex justify-end items-center">
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
                {`(${review.likes})`}
              </div>
            </div>
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
                <div className="text-sm font-medium" onClick={handleClickLike}>
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
              <div className="text-sm  opacity-60 mx-2">{`(${dislikes})`}</div>
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
      <hr className="px-6"></hr>
    </>
  );
};

export default Review;
