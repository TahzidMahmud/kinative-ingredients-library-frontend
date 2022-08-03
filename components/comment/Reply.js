import Image from "next/image";

const Reply = ({ reply }) => {
  return (
    <>
      <div className="flex ">
        <div className="w-1/12"></div>
        <div className="w-1/12 border-l border-sky-500 ">
          <div className="flex justify-center items-center ">
            <div className="border-dashed border-b border-sky-500 w-[100%] mt-10"></div>
          </div>
        </div>
        <div>
          <Image
            src="/avatar.PNG"
            alt={reply.name}
            width={60}
            height={60}
            className="py-4 my-4"
          />
        </div>
        <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-6/12 my-4">
          <div className="flex mb-3">
            <span className="opacity-100 font-semibold text-sm mx-2">
              {reply.author.name}
            </span>
            <span className="opacity-60 text-sm mx-2">{reply.created_at}</span>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {reply.body}
          </p>
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
        </div>
      </div>
    </>
  );
};

export default Reply;
