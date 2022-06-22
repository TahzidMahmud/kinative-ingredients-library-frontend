import Image from "next/image";
import Link from "next/link";

const Product = ({ product }) => {
  return (
    <>
      <Link href={`/products/${product.slug}`}>
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <Image
            className="rounded-t-lg"
            loader={() => product.thumbnail_image}
            src={product.thumbnail_image}
            alt={product.name}
            width={350}
            height={350}
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center ">
              {product.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center ">
              {product.short_details}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
