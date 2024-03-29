import axios from "@/lib/axios";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import AppLayout from "@/components/Layouts/AppLayout";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const Profile = () => {
  return <div>index</div>;
};
export async function getServerSideProps(context) {
  const { params } = context;
  const slug = params.slug;
  const profile = await axios
    .get(`/api/profile/${user.id}`)
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
