import Image from "next/image";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <>
      <Link href={`/products/${product.slug}`}>
        <div className="max-w-sm bg-white rounded-md border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
          <Image
            className="rounded-t-lg"
            loader={() => product.thumbnail_image}
            src={product.thumbnail_image}
            alt={product.name}
            width={300}
            height={300}
          />
          <div className="px-5 py-2">
            <h5 className="mb-2 md:text-md text-sm font-semibold tracking-tight text-gray-900 dark:text-white text-center text-clip">
              {product.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center text-sm opacity-70  text-clip overflow-hidden h-10">
              {product.short_details}
            </p>
          </div>
          <div className="flex justify-between px-7 pb-4">
            <div className="flex items-center pl-4">
              <Image
                className="rounded-t-lg"
                src="/star_icon.png"
                alt="rating"
                width={18}
                height={18}
              />
              <span className="ml-1 text-gray-700 text-sm">
                {product.rating}
              </span>
              <span className="ml-1 text-gray-900 text-sm opacity-70">
                (1.5k)
              </span>
            </div>
            <div className="flex items-center pr-2">
              <Image
                className="rounded-t-lg"
                src="/love_icon.png"
                alt="rating"
                width={18}
                height={18}
              />
              <span className="ml-1 text-gray-700 text-sm">
                {product.likes}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
