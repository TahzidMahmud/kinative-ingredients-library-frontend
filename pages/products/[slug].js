import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import path from "path";
import axios from "@/lib/axios";
import Image from "next/image";
import RatingStar from "@/components/RatingStar";

const Product = ({ product }) => {
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {product.slug}
        </h2>
      }
    >
      <Head>
        <title>Laravel </title>
      </Head>

      <div className="flex py-7">
        {/* left side  */}
        <div className="min-w-[30%]">
          <div className="p-6 mx-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
            <Image
              loader={() => product.images[0]}
              src={product.images[0]}
              alt={product.name}
              width={350}
              height={420}
              className="py-4"
            />
          </div>
        </div>
        {/* right side  */}
        <div className="min-w-[70%]">
          <div className="p-6 mb-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
            <div className="flex flex-col justify-left px-6 py-4 min-h-20 min-w-full">
              <div className="flex justify-between min-w-full border-b pb-4 mb-3">
                <div>
                  <h1 className="text-2xl font-semibold text-center">
                    {product.name}
                  </h1>
                </div>
                <div className="flex justify-between">
                  <div className="flex mr-4">
                    <div className="mx-2">
                      <Image
                        src="/collection_icon.png"
                        alt="collection"
                        width={20}
                        height={20}
                        className="py-4"
                      />
                    </div>
                    <div className="text-sm opacity-80 mb-4">
                      Save to collection
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mx-2">
                      <Image
                        src="/love_icon.png"
                        alt="collection"
                        width={20}
                        height={20}
                        className="py-4"
                      />
                    </div>
                    <div className="text-sm opacity-80 mb-4">Like It</div>{" "}
                    <span className="ml-2 text-sm opacity-60">
                      ({product.likes})
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-md font-semibold text-left mb-2">
                    Short Description
                  </h1>
                  <div className="text-sm opacity-80 mb-4">
                    {product.short_details}
                  </div>
                </div>
                <div className="flex items-center">
                  <RatingStar
                    rating={Array.from(Array(product.rating).keys())}
                    starHeight={20}
                    starWidth={20}
                  />{" "}
                  <span className="ml-2"> {product.rating}</span>
                  <span className="ml-2 opacity-60">(2.1K)</span>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left ">Brand</h1>
                </div>
                <div className="text-sm opacity-80 ">{product.brand}</div>
              </div>
              <div className="flex mb-4">
                <div className="min-w-[15%]">
                  <h1 className="text-md font-semibold text-left ">Category</h1>
                </div>
                <div className="text-sm opacity-60 ">{product.category}</div>
              </div>
            </div>
          </div>
          <div className="p-6 mb-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div className="px-6 min-h-20">
              <h1 className="text-md font-semibold text-left mb-2">
                Description
              </h1>
              <div className="text-sm opacity-80 mb-4">{product.details}</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;
  const product = await axios
    .get(`/api/products/${slug}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await axios
    .get("/api/product/slugs")
    .then((response) => {
      return response.data.slugs;
    })
    .catch((error) => console.log(error));

  const paths = slugs.map((slug) => ({ params: { slug: slug.toString() } }));
  return {
    paths,
    fallback: false,
  };
}

export default Product;
