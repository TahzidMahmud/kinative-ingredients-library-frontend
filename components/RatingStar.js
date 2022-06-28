import Image from "next/image";

const RatingStar = ({ rating, starWidth, starHeight }) => {
  return (
    <div className="flex">
      {rating.map((star, index) => {
        return (
          <div className="flex items-center justify-center" key={index}>
            <Image
              src="/yellow_star_icon.png"
              alt="star"
              width={starWidth}
              height={starHeight}
              className="mx-1"
            />
          </div>
        );
      })}
    </div>
  );
};

export default RatingStar;
