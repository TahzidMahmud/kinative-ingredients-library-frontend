import axios from "@/lib/axios";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import AppLayout from "@/components/Layouts/AppLayout";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const Profile = ({ Profile }) => {
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
      ;
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
  return {
    props: {
      Profile: profile.data,
    },
  };
}

export default Profile;
