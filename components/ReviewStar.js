import Image from "next/image";
import { useState } from "react";

const ReviewStar = ({ rating, starWidth, starHeight, setRating }) => {
  const activeStars = Array.from(Array(5 - rating).keys());
  const inactiveStars = Array.from(Array(rating).keys());
  return (
    <div className="flex flex-col">
      <div className="flex">
        {activeStars.map((star, index) => {
          return (
            <div
              className="flex items-center justify-center"
              key={index}
              onClick={() => {
                setRating(index + 1);
              }}
            >
              <Image
                src="/activestar.svg"
                alt="star"
                width={starWidth}
                height={starHeight}
                className="mx-1"
              />
            </div>
          );
        })}
        {inactiveStars.map((star, index) => {
          return (
            <div
              className="flex items-center justify-center"
              key={index}
              onClick={() => {
                setRating(index + 1);
              }}
            >
              <Image
                src="/inactivestar.svg"
                alt="star"
                width={starWidth}
                height={starHeight}
                className="mx-1"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center p-3">
        <div className="text-gray-900 text-xl">
          {activeStars.length} of 5 stars
        </div>
      </div>
    </div>
  );
};

export default ReviewStar;
