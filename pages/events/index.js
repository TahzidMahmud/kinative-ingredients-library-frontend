import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";

const Events = ({ events, winners }) => {
  // console.log(winners);
  return (
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
      <div className="grid gird-cols-1 ">
        <div className="bg-white shadow-sm sm:rounded-lg h-48 my-8">
          <div className="flex justify-between">
            <div className="flex items-center h-48 pl-14">
              <div className="flex items-center">
                <div className="border-r-4 border-blue-600 h-10 px-4 flex items-center">
                  {" "}
                  <h1 className="uppercase text-3xl font-bold text-center">
                    {" "}
                    Events
                  </h1>
                </div>
                <h6 className="opacity-80 text-sm mx-2">
                  Get Fresh Events and Details
                </h6>
              </div>
            </div>
            <Image
              src="/product_banner.jpg"
              alt="ingredient_banner"
              width={246}
              height={186}
              className="py-4"
            />
          </div>
        </div>
      </div>
      {/* event list  */}
      <h1 className="text-xl font-bold my-4">Running Events</h1>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <Link key={index} href={`/events/${event.slug}`}>
            <div>
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
          <h1 className="text-xl font-bold my-4">Win Points to Participate</h1>
          <div className="flex flex-col grid grid-cols-5 gap-4 w-full">
            <div className="bg-white shadow-sm sm:rounded-lg p-4 my-2 w-full">
              <div className="flex  flex-col items-center">
                <Image
                  src="/post.PNG"
                  alt={`post`}
                  width={150}
                  height={200}
                  className=""
                />
                <span className="text-sm my-2 font-medium mx-4 opacity-70">
                  Write a Post and Get
                </span>
                <span className="text-md font-semibold mx-4">20 points</span>
              </div>
            </div>
            <div className="bg-white shadow-sm sm:rounded-lg p-4 my-2 w-full">
              <div className="flex  flex-col items-center">
                <Image
                  src="/post.PNG"
                  alt={`post`}
                  width={150}
                  height={200}
                  className=""
                />
                <span className="text-sm my-2 font-medium mx-4 opacity-70">
                  Like a Comment and Get
                </span>
                <span className="text-md font-semibold mx-4">1 point</span>
              </div>
            </div>
            <div className="bg-white shadow-sm sm:rounded-lg p-4 my-2 w-full">
              <div className="flex  flex-col items-center">
                <Image
                  src="/post.PNG"
                  alt={`post`}
                  width={150}
                  height={200}
                  className=""
                />
                <span className="text-sm my-2 font-medium mx-4 opacity-70">
                  Write a Post and Get
                </span>
                <span className="text-md font-semibold mx-4">20 points</span>
              </div>
            </div>
            <div className="bg-white shadow-sm sm:rounded-lg p-4 my-2 w-full">
              <div className="flex  flex-col items-center">
                <Image
                  src="/profile.PNG"
                  alt={`post`}
                  width={150}
                  height={200}
                  className=""
                />
                <span className="text-sm my-2 font-medium mx-4 opacity-70">
                  Create Account and Get
                </span>
                <span className="text-md font-semibold mx-4">500 points</span>
              </div>
            </div>
            <div className="bg-white shadow-sm sm:rounded-lg p-4 my-2 w-full">
              <div className="flex  flex-col items-center">
                <Image
                  src="/review.PNG"
                  alt={`post`}
                  width={150}
                  height={200}
                  className=""
                />
                <span className="text-sm my-2 font-medium mx-4 opacity-70">
                  Write a Review and Get
                </span>
                <span className="text-md font-semibold mx-4">50 points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
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
  return {
    props: {
      events: events.data,
      winners: winners,
    },
  };
}

export default Events;
