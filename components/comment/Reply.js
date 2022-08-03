import Image from "next/image";

const Reply = ({ reply }) => {
  return (
    <div className="ml-36">
      <hr></hr>
      {/* top section of reply */}
      <div className="flex items-cetner justify-start  my-6">
        <div className=" flex">
          {/* user image  */}
          <div>
            <Image
              loader={() => reply.author.avatar}
              src={reply.author.avatar}
              alt={reply.author.name}
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
                  {reply.author.age}
                </div>
              </div>
              <div className="flex">
                <div className="text-sm font-semibold">Skin Type:</div>
                <div className="text-sm  opacity-60 mx-2">
                  {/* {reply.author.skin_type.data[0].name} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-7 py-1 mb-4">
          <sapn className="text-sm opacity-60">{reply.body}</sapn>
        </div>
        <div className="p-3 rounded-lg">
          {reply.image != null ? (
            <Image
              loader={() => {
                return reply.image;
              }}
              src={reply.image}
              alt={reply.author.name}
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
            <sapn className="text-sm opacity-60 ml-2">{reply.created_at}</sapn>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Reply;
