import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Index = ({
  main_banner,
  site_stats,
  home_brands,
  home_blogs,
  home_products,
  home_ingredients,
  events,
  winners,
  points,
  meta_Data,
}) => {
  const [settingsblog, setSettingsblog] = useState({
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  const [settingsproducts, setSettingsproducts] = useState({
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  const [settingsbrands, setSettingsbrands] = useState({
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
  const [settingsingredients, setSettingsingredients] = useState({
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

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
            products
          </h2>
        }
      >
        <div className="py-6">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* main banner  */}
            <Link href={`${main_banner[0].link}`}>
              <div className="h-40">
                <Image
                  loader={() => main_banner[0].img}
                  src={main_banner[0].img}
                  alt={main_banner[0].link}
                  width={`100vw`}
                  height={`33vh`}
                  layout="responsive"
                  className="py-4"
                />
              </div>
            </Link>
            {/* stat site_stats_summary */}
            <div className="grid md:grid-cols-4 grid-cols-1 bg-white my-10 drop-shadow-lg">
              {site_stats.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center py-10 px-2"
                >
                  <div className="flex justify-center items-center">
                    <Image
                      loader={() => item.img}
                      src={item.img}
                      alt={item.title}
                      width={60}
                      height={70}
                      className="py-2"
                    />
                  </div>
                  <div className="text-center font-bold text-lg py-1">
                    {" "}
                    {item.title}
                  </div>
                  <div className="text-center text-sm opacity-70 py-1">
                    {item.subtitle}
                  </div>
                </div>
              ))}
            </div>
            {/* blog section  */}
            <div className="grid md:grid-cols-2 grid-cols-1 mb-4">
              <div className="flex md:justify-start justify-center items-center">
                <span className="text-xl font-bold uppercase pr-3 border-r border-[#ead05b] border-r-4">
                  our blog
                </span>
                <span className="text-sm opacity-70 mx-2">
                  Get Fresh Blog Posts everyday
                </span>
              </div>
              <div className="flex md:justify-end justify-center">
                <Link href={`/blogs`}>
                  <span className="inline-flex items-center md:px-6 px-2 py-2 md:text-md text-xs text-white font-semibold  bg-[#ff2b03] rounded-md border  border-[#ff2b03] h-6">
                    View All
                  </span>
                </Link>
              </div>
            </div>
            {/* blogs list  */}
            <Slider {...settingsblog}>
              {home_blogs.map((blog, index) => (
                <div key={index}>
                  <Link href={`/blogs/${blog.slug.toString()}`}>
                    <div className="px-2">
                      <div className="  rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col justify-start items-baseline">
                          <div className="z-0">
                            <Image
                              loader={() => blog.image}
                              src={blog.image}
                              alt={blog.title}
                              width={1040}
                              height={530}
                              className="py-4"
                            />
                          </div>
                          <div className=" bg-black text-black px-3 py-2 md:-mt-14 md:mb-2  flex justify-center align-center md:ml-4  z-10 rounded">
                            <h2 className="text-md font-semibold text-white uppercase text-center rounded-md">
                              {blog.category}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="h-10 mt-2" style={{ height: "3.5rem" }}>
                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                          {blog.title}
                        </p>
                      </div>
                      <div className="md:py-5 md:pb-3sm:py-2  flex flex-col justify-start border-b ">
                        <h6 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                          Posted On:
                          <span className=" mx-2 opacity-60">
                            {blog.created_at}
                          </span>
                        </h6>
                      </div>
                      <div className="mb-3 mt-1">
                        <div className="flex text-black py-2">
                          <div className="flex">
                            {/* avatar image  */}
                            <Image
                              src="/avatar.PNG"
                              alt={blog.title}
                              width={25}
                              height={25}
                              className="py-4"
                            />
                            <span className="opacity-60 text-sm mx-2">
                              {blog.autor.name}
                            </span>
                          </div>
                          <div className="flex">
                            {/* avatar image  */}
                            <Image
                              src="/comment.PNG"
                              alt={blog.title}
                              width={25}
                              height={25}
                              className="py-4"
                            />
                            <span className="opacity-60 text-sm mx-2">
                              {blog.comments}
                            </span>
                          </div>
                          <div className="flex">
                            {/* avatar image  */}
                            <Image
                              src="/love_icon.png"
                              alt={blog.title}
                              width={15}
                              height={13}
                              className=""
                            />
                            <span className="opacity-60 text-sm mx-2">
                              {blog.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
            {/* products section  */}
            <div className="grid md:grid-cols-2 grid-cols-1 mb-4 mt-10">
              <div className="flex md:justify-start justify-center items-center">
                <span className="text-xl font-bold uppercase pr-3 border-r border-[#ead05b] border-r-4">
                  Products
                </span>
                <span className="text-sm opacity-70 mx-2">
                  Get Real Product Reviews and Details
                </span>
              </div>
              <div className="flex md:justify-end justify-center">
                <Link href={`/products`}>
                  <span className="inline-flex items-center md:px-6 px-2 py-2 md:text-md text-xs text-white font-semibold  bg-[#ff2b03] rounded-md border  border-[#ff2b03] h-6">
                    View All
                  </span>
                </Link>
              </div>
            </div>
            {/* products list  */}
            <Slider {...settingsproducts}>
              {home_products.map((product, index) => (
                <div key={index} className="px-1.5">
                  <Link href={`/products/${product.slug}`}>
                    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                      <Image
                        className="rounded-t-lg"
                        loader={() => product.thumbnail_image}
                        src={product.thumbnail_image}
                        alt={product.name}
                        width={300}
                        height={300}
                      />
                      <div className="px-5 py-2" style={{ height: "6.5rem" }}>
                        <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white text-center">
                          {product.name}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center text-sm opacity-70  text-clip overflow-hidden h-10 line-clamp-2">
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
                </div>
              ))}
            </Slider>
            {/* brands section  */}
            <Slider {...settingsbrands}>
              {home_brands.map((brand, index) => (
                <div key={index} className="px-2 my-10  drop-shadow-lg  ">
                  <div className="bg-white rounded-md px-6 py-8 flex justify-center items-center truncate">
                    {" "}
                    <span className="text-sm opacity-70 truncate ">
                      {brand}
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
            {/* ingredients section  */}
            <div className="grid md:grid-cols-2 grid-cols-1 mb-4 mt-10">
              <div className="flex md:justify-start justify-center items-center">
                <span className="text-xl font-bold uppercase pr-3 border-r border-[#ead05b] border-r-4">
                  ingredients
                </span>
                <span className="text-sm opacity-70 mx-2">
                  Get to know the ingredients used in our products
                </span>
              </div>
              <div className="flex md:justify-end justify-center">
                <Link href={`/ingredients`}>
                  <span className="inline-flex items-center md:px-6 px-2 py-2 md:text-md text-xs text-white font-semibold  bg-[#ff2b03] rounded-md border  border-[#ff2b03] h-6">
                    View All
                  </span>
                </Link>
              </div>
            </div>
            {/* ingredients list  */}
            <Slider {...settingsbrands}>
              {home_ingredients.map((ingredient, index) => (
                <div key={index} className="md:px-2 px-1.5 my-3">
                  <div className="bg-white rounded-md">
                    <Link href={`/ingredients/${ingredient.id.toString()}`}>
                      <div className=" rounded-md flex flex-col p-4 items-center">
                        <div className="flex justify-center items-center">
                          <Image
                            loader={() => ingredient.thumbnail}
                            src={ingredient.thumbnail}
                            alt={ingredient.name}
                            width={85}
                            height={85}
                            className="py-4"
                          />
                        </div>
                        <div
                          className="text-md font-bold text-center line-clamp-2 my-2 h-10"
                          style={{ height: "2.8rem" }}
                        >
                          {ingredient.name}
                        </div>
                        <div
                          className="text-md font-bold text-center line-clamp-2 opacity-70 h-10"
                          style={{ height: "2.8rem" }}
                        >
                          {ingredient.short_description}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
            {/* events section */}
            {/* event section  */}
            <div className="grid md:grid-cols-2 grid-cols-1 mb-4 mt-10">
              <div className="flex md:justify-start justify-center items-center">
                <span className="text-xl font-bold uppercase pr-3 border-r border-[#ead05b] border-r-4">
                  events
                </span>
                <span className="text-sm opacity-70 mx-2">
                  Get to know the events
                </span>
              </div>
              <div className="flex md:justify-end justify-center">
                <Link href={`/events`}>
                  <span className="inline-flex items-center md:px-6 px-2 py-2 md:text-md text-xs text-white font-semibold  bg-[#ff2b03] rounded-md border  border-[#ff2b03] h-6">
                    View All
                  </span>
                </Link>
              </div>
            </div>
            {/* events list  */}
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
                  <Slider {...settingsproducts}>
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
                  </Slider>
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
                <Slider {...settingsproducts}>
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
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const [
    main_banner,
    site_stats,
    home_brands,
    home_blogs,
    home_products,
    home_ingredients,
    events,
    winners,
    points,
    meta_Data,
  ] = await Promise.all([
    axios
      .get("/api/home-settings/main_banner")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => console.log(error)),

    axios
      .get("/api/home-settings/site_stats_summary")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => console.log(error)),

    axios
      .get("/api/home-settings/brand_section")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => console.log(error)),

    axios
      .get("/api/home-settings/home_blogs")
      .then((response) => {
        return response.data.data.data;
      })
      .catch((error) => console.log(error)),
    axios
      .get("/api/home-settings/home_products")
      .then((response) => {
        return response.data.data.data;
      })
      .catch((error) => console.log(error)),
    axios
      .get("/api/home-settings/home_ingredients")
      .then((response) => {
        return response.data.data.data;
      })
      .catch((error) => console.log(error)),
    axios
      .get("/api/events")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => console.log(error)),
    axios
      .get("/api/event-winners")
      .then((response) => {
        return response.data.winners;
      })
      .catch((error) => console.log(error)),
    axios
      .get("/api/home-settings/home_points")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => console.log(error)),
    // fetch meta data
    axios
      .get(`/api/page-meta/home`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => console.log(error)),
  ]);

  return {
    props: {
      main_banner,
      site_stats,
      home_brands,
      home_blogs,
      home_products,
      home_ingredients,
      events,
      winners,
      points,
      meta_Data,
    },
  };
}
export default Index;
