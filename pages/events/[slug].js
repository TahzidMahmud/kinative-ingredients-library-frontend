import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Event = ({ event, running_events }) => {
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          event
        </h2>
      }
    >
      <Head>
        <title>Laravel - event</title>
      </Head>
      <div className="flex px-2 pt-3 justify-between"></div>
      {/* main banner section  */}
      <div className="grid gird-cols-1 ">
        <div className="my-4">
          <Image
            loader={() => event.banner}
            src={event.banner}
            alt={event.slug}
            layout="responsive"
            width={`100vw`}
            height={`25vh`}
            className=""
          />
        </div>
      </div>
    </AppLayout>
  );
};
export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;
  const event = await axios
    .get(`/api/events/${slug}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  const running_events = await axios
    .get(`/api/current-month-events`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      event: event,
      running_events: running_events,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await axios
    .get("/api/event-slug-list")
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

export default Event;
