import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import HtmlFormat from "@/components/HtmlFormat";

const Custom = ({ page, meta_Data }) => {
  return (
    <>
      <Head>
        <title>{`${meta_Data.title}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta itemProp="name" content={`${meta_Data.meta_title}`}></meta>
        <meta
          itemProp="description"
          content={`${meta_Data.meta_description}`}
        ></meta>
        <meta itemProp="image" content={`${meta_Data.meta_image}`}></meta>
      </Head>
      <AppLayout
        header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            events
          </h2>
        }
      >
        {" "}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white p-10 my-6">
          <HtmlFormat data={page.content} />
        </div>
      </AppLayout>
    </>
  );
};
export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;
  const page = await axios
    .get(`/api/pages/${slug}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  // fetch meta data
  const meta_Data = await axios
    .get(`/api/page-meta/${slug}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));

  return {
    props: {
      page,
      meta_Data,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const slugs = await axios
    .get("/api/page-slugs")
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

export default Custom;
