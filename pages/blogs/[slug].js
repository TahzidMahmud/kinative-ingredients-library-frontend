import axios from "@/lib/axios";
import Image from "next/image";
import AppLayout from "@/components/Layouts/AppLayout";
import HtmlFormat from "@/components/HtmlFormat";
import Head from "next/head";

const blog = ({ blog }) => {
 
 return (
    <AppLayout header={<> </>}>
    <Head>
      <title>Blogs</title>
    </Head>
  
    <div className="flex">
      <div className="md:min-w-[70%] sm:min-w-[100%] my-4">
        <div className=" rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <Image
                loader={() => blog.image}
                src={blog.image}
                alt={blog.title}
                width={1040}
                height={530}
                className="py-6"
              />

            <h1 className="text-3xl font-bold text-left py-6">
             {blog.title}
            </h1>
          <HtmlFormat data={blog.body} />
        </div>
      </div>
      <div className="md:min-w-[30%] sm:min-w-[100%] ">
      </div>
    </div>
  </AppLayout>

  );
};
export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;
  const blog = await axios
    .get(`/api/blogs/${slug}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      blog: blog,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await axios
    .get("/api/blog/slugs")
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

export default blog;
