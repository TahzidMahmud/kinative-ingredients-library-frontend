import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import HtmlFormat from "@/components/HtmlFormat";
import { useRouter } from "next/router";
import LoginModal from "@/modals/LoginModal";

import { useEffect, useState } from "react";

import { useCountdown } from "@/hooks/useCountdown";

const Event = ({ event, running_events }) => {
  const [days, hours, minutes, seconds] = useCountdown(event.end_date);
  const [timeleft, setTimeleft] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [participated, setParticipated] = useState(true);
  const { user } = useAuth({ middleware: "guest" });
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      setTimeleft(false);
    }
    isParticipated();
  }, []);
  function isParticipated() {
    if (user) {
      axios
        .post(`/api/participated`, {
          event_id: event.id,
          user_id: user.id,
        })
        .then((res) => {
          if (res.data.is_participated == true) {
            setParticipated(true);
          } else {
            setParticipated(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setParticipated(false);
    }
  }
  function canParticipate(e) {
    if (user) {
      setShowLoginModal(false);
      axios
        .post(`/api/can-participate`, {
          event_id: event.id,
          user_id: user.id,
        })
        .then((response) => {
          if (response.data.can_participate) {
            alert(`${response.data.message}`);
          } else {
            alert(`${response.data.message}`);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setShowLoginModal(true);
    }
  }
  function closeModal() {
    setShowLoginModal(false);
  }
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
      <div className="flex px-2 pt-3  justify-between"></div>
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
      <div className="grid grid-cols-1 px-2 md:px-0">
        <div className="p-6 md:px-16  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="grid md:grid-cols-2 grid-cols-1 border-b pb-4 flex items-center">
            <div className="flex justify-start items-cetner">
              <h1 className="text-xl font-bold ">{event.title}</h1>
            </div>
            <div className="flex md:justify-end justify-center items-cetner">
              <div className={`${participated ? "d-none" : ""}`}>
                {timeleft ? (
                  <button
                    className="ml-auto bg-blue-500 rounded-lg p-3 text-white text-sm"
                    onClick={() => {
                      canParticipate();
                    }}
                  >
                    Participate
                  </button>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-red-400">
                      Event Ended..!!
                    </h1>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 flex items-center my-4">
            <div className="flex justify-start items-cetner">
              <div className="flex items-center ">
                <span className="md:text-md text-sm font-semibold mx-2">
                  Event Entry Expiry:
                </span>
                <div className="flex md:ml-2">
                  <span className="m-1 md:px-3 px-1.5 rounded-md py-3 bg-blue-100 text-blue-500">
                    {days}d
                  </span>
                  <span className="m-1 md:px-3 px-1.5 rounded-md py-3 bg-blue-100 text-blue-500">
                    {hours}h
                  </span>
                  <span className="m-1 md:px-3 px-1.5 rounded-md py-3 bg-blue-100 text-blue-500">
                    {minutes}m
                  </span>
                  <span className="m-1 md:px-3 px-1.5 rounded-md py-3 bg-blue-100 text-blue-500">
                    {seconds}s
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-cetner">
              <div className="flex items-center">
                <span className="text-md font-semibold mx-2">Entry Fee:</span>
                <span className="text-xl font-bold text-blue-500">
                  {event.fees} Points
                </span>
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-start my-6 mx-2">
            <div className="my-4">
              <span className="text-md font-semibold ">Description</span>
            </div>
            <div className="opacity-70">
              <HtmlFormat data={event.description} />
            </div>
          </div>
          <div className=" flex flex-col justify-start my-6 mx-2">
            <div className="my-4">
              <span className="text-md font-semibold ">Event Rules</span>
            </div>
            <div className="opacity-70">
              <ul className="list-disc list-inside">
                {event.rules.map((rule, index) => (
                  <li className="mb-2" key={index}>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 my-4 mb-16 mx-3 md:mx-0">
        <div className="p-6 md:px-16 sm:px-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-start items-cetner mx-2 my-6">
            <h1 className="text-xl font-bold ">This Month Events</h1>
          </div>
          <div className="flex items-center grid grid-cols-1 md:grid-cols-3 gap-4">
            {running_events.map((itm, index) => (
              <Link key={index} href={`/events/${itm.slug}`}>
                <div className={`px-3 ${itm.id == event.id ? "d-none" : ""}`}>
                  <Image
                    loader={() => itm.image}
                    src={itm.image}
                    alt={itm.slug}
                    width={500}
                    height={300}
                    className="py-6"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/*log in  modal section  */}
      {isSSR === false ? (
        <LoginModal
          show={showLoginModal}
          page={`/events`}
          closeModal={closeModal}
          className="z-40 opacity-100"
        />
      ) : (
        <></>
      )}
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
    revalidate: 60,
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
