import Dropdown from "@/components/Dropdown";
import Link from "next/link";
import NavLink from "@/components/NavLink";
import ResponsiveNavLink, {
  ResponsiveNavButton,
} from "@/components/ResponsiveNavLink";
import { DropdownButton } from "@/components/DropdownLink";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { selectHeaderState, setHeaderState } from "../../store/headerSlice";

const Navigation = ({ user, data = null }) => {
  const router = useRouter();

  const { logout } = useAuth();
  const { login } = useAuth();

  const [open, setOpen] = useState(false);
  const [headerlogo, setHeaderlogo] = useState(
    data != null ? data[0].data : null
  );
  const [headerLinks, setHeaderLinks] = useState(
    data != null ? data[1].data : []
  );
  const [header, setHeader] = useState(false);
  const [headerState, setheaderState] = useState(
    useSelector(selectHeaderState)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (data == null && data == undefined) {
      getHeaderData();
    }
  }, []);
  async function getHeaderData() {
    await Promise.all([
      axios
        .get("/api/header-settings/header_logo")
        .then((response) => {
          setHeaderlogo(response.data.data.logo_image);
          dispatch(
            setHeaderState({
              headerData: {
                data: response.data.data.logo_image,
                name: "header_logo",
              },
            })
          );
        })
        .catch((error) => console.log(error)),

      axios
        .get("/api/header-settings/header_links")
        .then((response) => {
          setHeaderLinks(response.data.data);
          dispatch(
            setHeaderState({
              headerData: {
                data: response.data.data,
                name: "header_links",
              },
            })
          );
        })
        .catch((error) => console.log(error)),
    ]);
  }

  return (
    <nav className="bg-white border-b border-gray-100 shadow ">
      {/* Primary Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex  items-center justify-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex  items-center justify-center">
              <Link href="/">
                <Image
                  loader={() => (headerlogo != null ? headerlogo : "/logo.svg")}
                  src={"/logo.svg"}
                  alt="logo"
                  width={110}
                  height={30}
                  className="rounded-t-lg py-6"
                />

                {/* <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" /> */}
              </Link>
            </div>

            {/* Navigation Links */}
            {headerLinks.map((header, index) => (
              <div
                key={`footer-${index}`}
                className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex text-uppercase"
              >
                <NavLink
                  href={`${header.link}`}
                  active={router.pathname === `${header.link}`}
                >
                  {header.title}
                </NavLink>
              </div>
            ))}
          </div>

          {/* Settings Dropdown */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 z-50">
            <Dropdown
              align="right"
              width="60"
              trigger={
                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                  <div className="flex items-cetner">
                    <div className="flex justify-center items-center">
                      {user?.profile && user.profile.avatar ? (
                        <Image
                          loader={() =>
                            `http://localhost:8000/profile-image/${user.profile.avatar}`
                          }
                          src={`http://localhost:8000/profile-image/${user.profile.avatar}`}
                          alt={user.name}
                          width={50}
                          height={50}
                          className="py-2 rounded-full"
                        />
                      ) : (
                        <Image
                          className="rounded-full"
                          src="/avatar.PNG"
                          alt="logo"
                          width={50}
                          height={50}
                        />
                      )}
                    </div>
                    <div className="flex justify-center items-center ">
                      <span className="ml-3"> {user?.name}</span>
                    </div>
                  </div>

                  <div className="ml-1">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              }
              // style={{ width: "10rem" }}
            >
              {/* Authentication */}
              {user ? (
                <div>
                  <DropdownButton
                    onClick={() => {
                      router.push(`/profile/${user.id}`);
                    }}
                  >
                    Profile
                  </DropdownButton>
                  <DropdownButton onClick={logout}>Logout</DropdownButton>
                </div>
              ) : (
                <div className="w-20 z-20" style={{ minWidth: "8rem" }}>
                  <DropdownButton
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Log In
                  </DropdownButton>
                </div>
              )}
            </Dropdown>
          </div>

          {/* Hamburger */}
          <div className="mr-2 flex items-center md:hidden">
            <button
              onClick={() => setOpen((open) => !open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg viewBox="0 0 100 80" width="40" height="40">
                <rect width="50" height="5"></rect>
                <rect y="15" width="50" height="5"></rect>
                <rect y="30" width="50" height="5"></rect>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Navigation Menu */}
      {open && (
        <div className="block sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {headerLinks.map((header, index) => (
              <ResponsiveNavLink
                key={`footer-${index}`}
                href={`${header.link}`}
                active={router.pathname === header.link}
              >
                {header.title}
              </ResponsiveNavLink>
            ))}
          </div>

          {/* Responsive Settings Options */}
          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-10 w-10 fill-current text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              {/* <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div> */}
            </div>

            <div className="mt-3 space-y-1">
              {/* Authentication */}
              <ResponsiveNavButton onClick={logout}>Logout</ResponsiveNavButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
