import RatingStar from "@/components/RatingStar";
import Image from "next/image";

const Review = ({ review }) => {
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
                <div className="text-sm font-semibold opacity-70 mx-2">
                  {review.profile.age}
                </div>
              </div>
              <div className="flex">
                <div className="text-sm font-semibold">Skin Type:</div>
                <div className="text-sm font-semibold opacity-70 mx-2">
                  {review.profile.skin_type.data[0].name}
                </div>
              </div>
              <div className="flex">
                <div className="text-sm font-semibold">Days use:</div>
                <div className="text-sm font-semibold opacity-70 mx-2">
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
          <sapn className="text-sm font-semibold opacity-70 ml-2">
            {review.liking_factors}
          </sapn>
        </div>
        {/* dislike section  */}
        <div className="px-7 py-4 mb-4">
          <span className="text-sm font-semibold">what I Liked</span>:
          <sapn className="text-sm font-semibold opacity-70 ml-2">
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
      </div>
      <hr className="px-6"></hr>
    </>
  );
};

export default Review;
