import Head from "next/head";
import Link from "next/link";
import AppLayout from "@/components/Layouts/AppLayout";

import { useAuth } from "../hooks/auth";

export default function Home() {
  const { user } = useAuth({ middleware: "guest" });

  return (
    <>
      {" "}
      <AppLayout
        header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            products
          </h2>
        }
      >
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200 text-center text-4xl p-10">
                Welcome To GlowSacam
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
