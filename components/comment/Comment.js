import Image from "next/image";

const Comment = ({ comment }) => {
  return (
    <>
      <div className="flex my-4 ">
        <div>
          <Image
            src="/avatar.PNG"
            alt={comment.autor.name}
            width={60}
            height={60}
            className="py-4"
          />
        </div>
        <div className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-8/12">
          <div className="flex mb-3">
            <span className="opacity-100 font-semibold text-sm mx-2">
              {comment.autor.name}
            </span>
            <span className="opacity-60 text-sm mx-2">
              {comment.created_at}
            </span>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {comment.body}
          </p>
        </div>
      </div>
    </>
  );
};

export default Comment;
