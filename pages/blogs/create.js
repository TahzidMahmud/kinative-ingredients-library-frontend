import QuillNoSSRWrapper from "@/components/Quil";
import { modules, formats } from "@/components/Quil";
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import LoginModal from "@/modals/LoginModal";
import { useEffect, useState } from "react";

const Create = () => {
  const [isSSR, setIsSSR] = useState(true);

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
      <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />;
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

export default Create;
