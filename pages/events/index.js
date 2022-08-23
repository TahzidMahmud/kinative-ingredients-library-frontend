import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
// import Slider from "react-slick";
import { useState, useEffect } from "react";

const Events = ({ events, winners, meta_Data, points }) => {
  // console.log(winners);

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
        <Head>
          <title>Laravel - events</title>
        </Head>
        <div className="flex px-2 pt-3 justify-between"></div>
        {/* main banner section  */}
        <div className="grid md:gird-cols-1">
          <div className="bg-white shadow-sm sm:rounded-lg h-48 my-8">
            <div className="grid grid-cols-2">
              <div className="flex items-center h-48 md:pl-14 pl-1.5">
                <div className="flex md:flex-row flex-col items-center">
                  <div className="md:border-r-4 border-blue-600 h-10 md:px-4 px-0 flex items-center">
                    {" "}
                    <h1 className="uppercase md:text-3xl text-2xl font-bold text-center">
                      {" "}
                      Events
                    </h1>
                  </div>
                  <h6 className="opacity-80 text-sm md:mx-2 md:px-0 px-4 ml-2">
                    Get Fresh Events and Details
                  </h6>
                </div>
              </div>
              <div className="h-full w-full flex justify-end ">
                <Image
                  src="/product_banner.jpg"
                  alt="ingredient_banner"
                  width={246}
                  height={186}
                  className="py-4 "
                />
              </div>
            </div>
          </div>
        </div>
        {/* event list  */}
        <h1 className="text-xl font-bold my-4 px-3 md:px-0">Running Events</h1>
        <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <Link key={index} href={`/events/${event.slug}`}>
              <div className="px-3 md:px-0">
                <Image
                  loader={() => event.image}
                  src={event.image}
                  alt={event.slug}
                  width={500}
                  height={300}
                  className="py-6"
                />
              </div>
            </Link>
          ))}
        </div>
        {/* point instruction section  */}
        <div className="d-none md:block">
          <div className="grid grid-flow-col grid-cols-10 grid-rows-1 my-10 pb-10">
            <div className="col-span-2 flex flex-col justify-start items-start">
              <h1 className="text-xl font-bold my-4">Event winners</h1>
              <div className="flex flex-col w-full">
                {winners.map((winner, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-sm sm:rounded-lg p-4 my-2 w-full"
                  >
                    <div className="flex items-center">
                      <Image
                        loader={() => winner.avatar}
                        src={winner.avatar}
                        alt={winner.name}
                        width={50}
                        height={50}
                        className="py-6 rounded-full"
                      />
                      <span className="text-md font-medium mx-4">
                        {winner.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-10 pl-10">
              <h1 className="text-xl font-bold my-4">
                Win Points to Participate
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-5">
                {points.map((point, index) => (
                  <div key={index} className="px-2 ">
                    <div className="bg-white  shadow-sm sm:rounded-lg p-4 my-2  w-full">
                      <div className="flex  flex-col items-center">
                        <Image
                          src="/post.PNG"
                          alt={`post`}
                          width={150}
                          height={200}
                          className=""
                        />
                        <span
                          className="text-xs text-center my-2 font-medium mx-2 opacity-70 line-clamp-2"
                          style={{ height: "2rem" }}
                        >
                          {point.description}
                        </span>
                        <span className="text-md font-semibold mx-4">
                          {point.points} point{point.points > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* point section mobile  */}
        <div className="md:hidden">
          <div className=" flex flex-col justify-center items-center my-4">
            <h1 className="text-xl text-center font-bold my-4 ">
              Event winners
            </h1>
            <div className="flex flex-col w-full">
              {winners.map((winner, index) => (
                <div
                  key={index}
                  className="bg-white shadow-sm sm:rounded-lg p-4 my-2 w-full"
                >
                  <div className="flex items-center">
                    <Image
                      loader={() => winner.avatar}
                      src={winner.avatar}
                      alt={winner.name}
                      width={50}
                      height={50}
                      className="py-6 rounded-full"
                    />
                    <span className="text-md font-medium mx-4">
                      {winner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-2">
            <h1 className="text-xl text-center font-bold my-4">
              Win Points to Participate
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-5">
              {points.map((point, index) => (
                <div key={index} className="px-2 ">
                  <div className="bg-white  shadow-sm sm:rounded-lg p-4 my-2  w-full">
                    <div className="flex  flex-col items-center">
                      <Image
                        src="/post.PNG"
                        alt={`post`}
                        width={150}
                        height={200}
                        className=""
                      />
                      <span
                        className="text-xs text-center my-2 font-medium mx-2 opacity-70 line-clamp-2"
                        style={{ height: "2rem" }}
                      >
                        {point.description}
                      </span>
                      <span className="text-md font-semibold mx-4">
                        {point.points} point{point.points > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const events = await axios
    .get("/api/events", {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  const winners = await axios
    .get("/api/event-winners", {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
    .then((response) => {
      console.log(response.data.winners);
      return response.data.winners;
    })
    .catch((error) => console.log(error));
  // fetch meta data
  const meta_Data = await axios
    .get(`/api/page-meta/events`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  const points = await axios
    .get("/api/home-settings/home_points")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      events: events.data,
      winners: winners,
      meta_Data: meta_Data,
      points,
    },
  };
}

export default Events;
