import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import { useAuth } from "@/hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { user } = useAuth({ middleware: "guest" });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setTimeout(function () {
        router.push(`/profile/${user.id}`);
      }, 1000);
    }
  }, []);
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <h1 className="text-center text-xl font-bold py-10">
                Welcome To <span className="text-[#210373]">GLOW</span>
                <span className="text-[#ff2b03]">SCAM</span>
              </h1>
              <h6 className="text-center text-[#210373] animate-pulse">
                Redirecting To Your Profile......
              </h6>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
