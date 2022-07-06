import axios from "@/lib/axios";
import Image from "next/image";
import AppLayout from "@/components/Layouts/AppLayout";
import HtmlFormat from "@/components/HtmlFormat";
import Head from "next/head";

const blog = ({ blog }) => {
  const body = (blog) => {
    return { __html: blog.body };
  };

  return (
    <div>
      <div className="  rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <HtmlFormat data={blog.body} />
      </div>
    </div>
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
