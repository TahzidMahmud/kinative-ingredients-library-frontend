import axios from "@/lib/axios";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import AppLayout from "@/components/Layouts/AppLayout";
import ProfileEditModal from "@/modals/ProfileEditModal";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const Profile = ({ Concerns, SkinTypes, Profile, Wishlist }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [wishlist, setWishlist] = useState(Wishlist);

  function closeModal() {
    setEditProfile(false);
  }
  function deleteWishlist(id) {
    axios
      .delete(`/api/collections/${id}`)
      .then((res) => {
        if (res.data.success) {
          let newWishlist = wishlist.filter((item) => item.id !== id);
          setWishlist(newWishlist);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {Profile.name}
        </h2>
      }
    >
      <Head>
        <title>Laravel </title>
      </Head>

      <div className="flex  p-10">
        {/* left section  */}
        <div className="md:min-w-[30%] px-8 border-r">
          <div className="flex flex-col items-center justify-center">
            {/* image  */}
            <div>
              <Image
                loader={() => Profile.avatar}
                src={Profile.avatar}
                alt={Profile.user.name}
                width={350}
                height={350}
                className="py-6 border border-blue-500 rounded-sm"
              />
            </div>
            {/* details  */}
            <div className="p-6 w-full  h-96 bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer">
              <ul>
                <Link href={`/blogs/create`}>
                  <li className="text-gray-800 border-b py-2 hover:bg-gray-100 hover:text-blue-400 rounded-md">
                    <span className="font-semibold px-3">Crea New Post</span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        {/* right section  */}
        <div className="md:min-w-[70%] px-6">
          <div className="p-6 w-full h-96 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex justify-between imtes-center border-b pb-2">
              <div className="flex items-center ">
                {/* <Image
                  src="/user.gif"
                  alt={Profile.user.name}
                  width={70}
                  height={70}
                  className="py-2"
                /> */}
                <span className="text-xl font-semibold px-1">About</span>
                {Profile.rank !== null ? (
                  <button className="rounded-full bg-emerald-300 p-3 text-white text-sm mx-2">
                    {Profile.rank}
                  </button>
                ) : (
                  <button className="rounded-full bg-red-600 p-3 text-white text-sm mx-2">
                    Un-Ranked
                  </button>
                )}
              </div>

              <div
                className=""
                onClick={() => {
                  console.log("edit profile");
                  setEditProfile(true);
                }}
              >
                <div className="p-4 bg-stone-100 rounded-full flex justify-center items-center">
                  <Image
                    src="/edit.svg"
                    alt={Profile.user.name}
                    width={20}
                    height={20}
                    className=""
                  />
                </div>
              </div>
            </div>
            {/* profile Description */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="grid grid-cols-2 py-6 md:px-4 sm:px-3">
                <div className="font-semibold text-md md:my-3 sm:my-2">
                  Name
                </div>
                <div className=" text-md opacity-70 md:my-3 sm:my-2">
                  {Profile.user.name}
                </div>
                <div className="font-semibold text-md md:my-3 sm:my-2">
                  Skin Type
                </div>
                <div className=" text-md opacity-70 md:my-3 sm:my-2">
                  {Profile.skin_type.data[0].name}
                </div>
                <div className="font-semibold text-md md:my-3 sm:my-2">
                  Email
                </div>
                <div className=" text-md opacity-70 md:my-3 sm:my-2">
                  {Profile.user.email != null ? Profile.user.email : "Not Set"}
                </div>
                <div className="font-semibold text-md md:my-3 sm:my-2">
                  Points
                </div>
                <div className=" text-md opacity-70 md:my-3 sm:my-2">
                  {Profile.points}
                </div>
              </div>
              <div className="grid grid-cols-2 py-6">
                <div className="font-semibold text-md md:my-3 sm:my-2">
                  Birthday
                </div>
                <div className=" text-md opacity-70 md:my-3 sm:my-2">
                  {Profile.birth_date}
                </div>
                <div className="font-semibold text-md md:my-3 sm:my-2">
                  Concern
                </div>
                <div className=" text-md opacity-70 md:my-3 sm:my-2">
                  {Profile.concern.data.map((con, index) => {
                    return <div key={index}>{con.name}</div>;
                  })}
                </div>
                <div className="font-semibold text-md md:my-3 sm:my-2">
                  Contact No
                </div>
                <div className=" text-md opacity-70 md:my-3 sm:my-2">
                  {Profile.user.phone}
                </div>
                <div className="font-semibold text-md md:my-3 sm:my-2">
                  Member Since
                </div>
                <div className=" text-md opacity-70 md:my-3 sm:my-2">
                  {Profile.created_at}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-6 w-full ${
              wishlist.length > 0 ? "h-96" : "d-none"
            }  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 my-6 overflow-y-auto`}
          >
            {wishlist.length > 0 ? (
              <div className="text-center font-bold text-lg border-b pb-1">
                Product Wishlist
              </div>
            ) : (
              <> </>
            )}
            <div className="grid grid-cols-1 my-4">
              {wishlist.length > 0 ? (
                wishlist.map((wish, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center my-1"
                  >
                    <div className="flex items-center">
                      <Image
                        loader={() => wish.image}
                        src={wish.image}
                        alt={wish.name}
                        width={60}
                        height={60}
                        className="py-6 border border-blue-500 rounded-sm"
                      />
                    </div>
                    <div className="flex  justify-start items-center cursor-pointer">
                      <Link href={`/products/${wish.slug}`}>
                        <div className="font-base text-md mx-4">
                          {wish.name}
                        </div>
                      </Link>
                    </div>
                    <div
                      className="p-2 rounded-full bg-gray-200 flex justify-center items-center"
                      onClick={() => {
                        deleteWishlist(wish.id);
                      }}
                    >
                      <Image
                        src="/trash-icon.svg"
                        alt={wish.name}
                        width={20}
                        height={20}
                        className="py-6 border border-blue-500 rounded-sm"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {editProfile ? (
          <div className="h-2/3">
            <ProfileEditModal
              show={editProfile}
              closeModal={closeModal}
              profile={Profile}
              Concerns={Concerns}
              Skintypes={SkinTypes}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </AppLayout>
  );
};
export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;
  const profile = await axios
    .get(`/api/profiles/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  const concerns = await axios
    .get("/api/concerns")
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  const skinTypes = await axios
    .get("/api/skin-types")
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

  return {
    props: {
      Concerns: concerns.data,
      SkinTypes: skinTypes.data,
      Profile: profile.data,
      Wishlist: profile.data.wish_list.data,
    },
  };
}

export default Profile;
