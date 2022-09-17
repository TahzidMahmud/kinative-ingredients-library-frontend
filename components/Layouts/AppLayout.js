import Navigation from "@/components/Layouts/Navigation";
import { useAuth } from "@/hooks/auth";
import Footer from "@/components/Layouts/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFooterState, setFooterState } from "../../store/footerSlice";
import { selectHeaderState, setHeaderState } from "../../store/headerSlice";
import FooterNavigation from "./FooterNavigation";
import { useRouter } from "next/router";

const AppLayout = ({ header, children }) => {
  useEffect(() => {
    // document.oncontextmenu = document.body.oncontextmenu = function () {
    //   return false;
    // };
    // document.oncopy = document.body.oncopy = function () {
    //   return false;
    // };
  }, []);
  const router = useRouter();
  const { user } = useAuth({ middleware: "guest" });
  const [footerState, setfooterState] = useState(
    useSelector(selectFooterState)
  );
  const [headerState, setheaderState] = useState(
    useSelector(selectHeaderState)
  );
  // const { user } = {};

  return (
    <div className="w-screen">
      <div className=" bg-gray-100">
        {headerState.length > 0 ? (
          <Navigation className="" user={user} data={headerState} />
        ) : (
          <Navigation className="" user={user} />
        )}

        {/* Page Heading */}
        {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {header}
        </div>
      </header> */}

        {/* Page Content */}
        <main className="mx-auto my-6 w-[100%] overflow-x-hidden max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </main>
        {/* {console.log(footerState)} */}
        {footerState.length > 0 ? <Footer data={footerState} /> : <Footer />}
        <FooterNavigation user={user} router={router} />
      </div>
    </div>
  );
};

export default AppLayout;
