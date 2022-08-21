import Navigation from "@/components/Layouts/Navigation";
import { useAuth } from "@/hooks/auth";
import Footer from "@/components/Layouts/Footer";
import { useEffect } from "react";

const AppLayout = ({ header, children }) => {
  useEffect(() => {
    document.oncontextmenu = document.body.oncontextmenu = function () {
      return false;
    };
    document.oncopy = document.body.oncopy = function () {
      return false;
    };
  }, []);
  const { user } = useAuth({ middleware: "guest" });
  // const { user } = {};

  return (
    <div className=" bg-gray-100">
      <Navigation className="" user={user} />

      {/* Page Heading */}
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {header}
        </div>
      </header> */}

      {/* Page Content */}
      <main className="container mx-auto ">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
