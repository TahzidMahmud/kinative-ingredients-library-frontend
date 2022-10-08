import Image from "next/image";
import { useState } from "react";

const ReviewStar = ({ rating, starWidth, starHeight, setRating }) => {
  const [currate, setCurrate] = useState(0);
  const ratings = Array.from(Array(rating).keys());
  const activeStars = Array.from(Array(currate).keys());

  return (
    <div className="flex flex-col">
      <div className="flex">
        {ratings.map((star, index) => {
          return (
            <div
              className="flex items-center justify-center"
              key={index}
              onClick={() => {
                setCurrate(index + 1);
                setRating(activeStars.length);
              }}
            >
              {index >= currate ? (
                <Image
                  src="/inactivestar.svg"
                  alt="star"
                  width={starWidth}
                  height={starHeight}
                  className="mx-1"
                />
              ) : (
                <Image
                  src="/activestar.svg"
                  alt="star"
                  width={starWidth}
                  height={starHeight}
                  className="mx-1"
                />
              )}
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
