import Dropdown from "@/components/Dropdown";
import Link from "next/link";
import NavLink from "@/components/NavLink";
import ResponsiveNavLink, {
  ResponsiveNavButton,
} from "@/components/ResponsiveNavLink";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { selectHeaderState, setHeaderState } from "../../store/headerSlice";
import { DebounceInput } from "react-debounce-input";
const Navigation = ({ user, data = null }) => {
  const router = useRouter();

  const { logout } = useAuth();
  const { login } = useAuth();

  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchq, setSearchq] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const [headerlogo, setHeaderlogo] = useState(
    data != null ? data[0].data : null
  );
  const [tempLogo, setTempLogo] = useState(null);
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
          setTempLogo(response.data.data.logo_image);
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

  async function searchBlog(q) {
    if (q != "") {
      await axios
        .post(`/api/ajax-search`, {
          qry: q,
        })
        .then((res) => {
          if (res.data.data) {
            setSearchResult(res.data.data);
            highlight_word();
          }
        })
        .catch((err) => console.log(err));
    } else {
      setSearchResult([]);
    }
  }
  function highlight_word() {
    var searchpara = document.getElementById("search_para").innerHTML;
    var text = searchq;
    if (text) {
      var pattern = new RegExp("(" + text + ")", "gi");
      var new_text = searchpara.replace(
        pattern,
        "<span class='text-red-400'>" + text + "</span>"
      );
      document.getElementById("search_para").innerHTML = new_text;
    }
  }
  return (
    <nav className="bg-white flex items-center border-b border-gray-100 shadow ">
      {/* Primary Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center  grid grid-cols-12 h-16">
          <div className="md:col-span-1 col-span-6">
            {/* Logo */}
            <div className=" flex  items-center justify-center">
              <Link href="/">
                {headerlogo == null ? (
                  <></>
                ) : (
                  <Image
                    loader={() => headerlogo}
                    src={headerlogo}
                    alt="logo"
                    width={150}
                    height={50}
                    className="rounded-t-lg py-6"
                  />
                )}
                {/* <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" /> */}
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center  md:col-span-9 col-span-0 items-center ">
            {headerLinks.map((header, index) => (
              <div
                key={`header-${index}`}
                className="hidden sm:-my-px sm:mx-2.5 sm:flex flex justify-cetner"
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
          <div className="hidden md:col-span-2 col-span-3 sm:flex sm:items-center sm:ml-6 z-50">
            <div className="flex items-cetner">
              <div className="flex justify-center items-center">
                {user?.profile && user.profile.avatar ? (
                  <Image
                    loader={() =>
                      `https://admin.glowscam.com/profile-image/${user.profile.avatar}`
                    }
                    src={`https://admin.glowscam.com/profile-image/${user.profile.avatar}`}
                    alt={user.name}
                    width={45}
                    height={45}
                    className="py-2 rounded-full"
                  />
                ) : (
                  <Image
                    className="rounded-full"
                    src="/avatar.PNG"
                    alt="logo"
                    width={30}
                    height={30}
                  />
                )}
              </div>
              {user?.profile ? (
                <div className="flex items-center">
                  <div
                    className="broder border-r border-black px-1 py-0 text-black text-sm hover:text-[#ff2b03]"
                    onClick={() => {
                      router.push(`/profile/${user.id}`);
                    }}
                  >
                    Profile
                  </div>
                  <div
                    className="px-1 text-black text-sm hover:text-[#ff2b03]"
                    onClick={logout}
                  >
                    Logout
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div
                    className="broder border-r border-black px-1 py-0 text-black text-sm hover:text-[#ff2b03]"
                    onClick={() => {
                      router.push(`/login`);
                    }}
                  >
                    {" "}
                    Login
                  </div>
                  <div
                    className="px-1 text-black text-sm hover:text-[#ff2b03]"
                    onClick={() => {
                      router.push(`/register`);
                    }}
                  >
                    Register
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" flex items-center justify-center md:hidden -pt-2 col-span-4">
            <button
              onClick={() => setOpenSearch((openSearch) => !openSearch)}
              className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 outline-none  transition duration-150 ease-in-out"
            >
              <Image
                className="rounded-full"
                src="/search-black.svg"
                alt="logo"
                width={35}
                height={35}
              />
            </button>
          </div>

          {/* Hamburger */}
          <div className=" flex items-center md:hidden">
            <button
              onClick={() => setOpen((open) => !open)}
              className="inline-flex items-center justify-center  pt-4  rounded-md text-gray-400 hover:text-gray-500 outline-none  transition duration-150 ease-in-out"
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
      <div
        className={`fixed top-0 left-0 z-50 sm:hidden  bg-white w-[90%] h-[100%] overflow-y-auto ${
          open
            ? " transition-transform transition delay-150 duration-700 ease-in-out translate-x-0"
            : " transition-transform transition delay-150 duration-700 ease-in-out -translate-x-full"
        }`}
      >
        <div className="flex items-center p-3 bg-[#ff2b03] text-white">
          <div className="flex items-center">
            {user?.profile && user.profile.avatar ? (
              <Image
                loader={() =>
                  `http://admin.glowscam.com/profile-image/${user.profile.avatar}`
                }
                src={`http://admin.glowscam.com/profile-image/${user.profile.avatar}`}
                alt={user.name}
                width={45}
                height={45}
                className="py-2 rounded-full"
              />
            ) : (
              <Image
                className="rounded-full"
                src="/avatar.PNG"
                alt="logo"
                width={30}
                height={30}
              />
            )}
            {user?.profile ? (
              <div className="flex items-center ml-3">
                <div
                  className="broder border-r border-white px-1 py-0 text-white text-sm hover:text-[#ff2b03]"
                  onClick={() => {
                    router.push(`/profile/${user.id}`);
                  }}
                >
                  Profile
                </div>
                <div
                  className="px-1 text-white text-sm hover:text-[#ff2b03]"
                  onClick={logout}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="flex items-center ml-3">
                <div
                  className="broder border-r border-white  px-1 py-0 text-white text-sm hover:text-[#ff2b03]"
                  onClick={() => {
                    router.push(`/login`);
                  }}
                >
                  {" "}
                  Login
                </div>
                <div
                  className="px-1 text-white text-sm hover:text-[#ff2b03]"
                  onClick={() => {
                    router.push(`/register`);
                  }}
                >
                  Register
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-cetner">
            <button
              type="button"
              className="absolute text-white mx-3 my-2 right-2.5 bg-transparent  rounded-full text-sm px-3 py-2 ml-auto inline-flex items-center text-center shadow-md"
              data-modal-toggle="authentication-modal"
              onClick={() => {
                setOpen(false);
              }}
            >
              <span className="text-white">x</span>
            </button>
          </div>
        </div>
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
        <div className="pt-4 pb-1 ">
          <div className="flex items-center">
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
          </div>

          {/* <div className="mt-3 space-y-1">
              <ResponsiveNavButton onClick={logout}>Logout</ResponsiveNavButton>
            </div> */}
        </div>
      </div>

      {/* responsive search bar  */}
      <div
        className={`fixed  top-0 left-0 z-50 sm:hidden w-[100%] h-[22rem] overflow-y-auto ${
          openSearch
            ? " transition-transform transition delay-150 duration-700 ease-in-out translate-y-0"
            : " transition-transform transition delay-150 duration-700 ease-in-out -translate-y-full"
        }`}
      >
        <div className="flex pl-6 items-center  bg-white pt-6 grid grid-cols-4 ">
          <div className="col-span-3">
            <DebounceInput
              minLength={2}
              debounceTimeout={400}
              placeholder="Enter Text here..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-[100%]"
              onChange={(event) => {
                setSearchq(event.target.value);
                searchBlog(event.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-cetner col-span-1 pr-3">
            <button
              type="button"
              className="text-white mx-3 my-2  bg-transparent  rounded-full text-sm px-3 py-2 ml-auto inline-flex items-center text-center shadow-md"
              data-modal-toggle="authentication-modal"
              onClick={() => {
                setSearchResult(null);
                setOpenSearch(false);
              }}
            >
              <span className="text-black">x</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed bg-gray-50  p-2 text-black left-0 z-50 sm:hidden w-[100%] h-[70%] overflow-y-auto ${
          searchResult != null
            ? "top-20 transition-transform transition delay-150 duration-700 ease-in-out translate-y-0"
            : " transition-transform transition delay-50 duration-200 ease-in-out -translate-y-full"
        }`}
      >
        <div className=" h-[100%]  overflow-y-auto z-50">
          <h4 className="font-semibold text-lg border-b  text-center py-2">
            Search Results
          </h4>
          <div id="search_para">
            {searchResult != null && openSearch ? (
              searchResult.length > 0 ? (
                searchResult.map((item, index) => {
                  return (
                    <div
                      key={`res-${index}`}
                      className="flex items-center my-2"
                      onClick={() => {
                        router.push(`/blogs/${item.slug}`);
                      }}
                    >
                      <div className="grid grid-cols-4 gap-2 ">
                        <div className="flex justify-center items-center col-span-1 w-52">
                          <Image
                            loader={() => item.image}
                            src={item.image}
                            alt="logo"
                            width={50}
                            height={50}
                            className="rounded-t-lg py-6"
                          />
                        </div>
                        <div className="flex items-center col-span-3">
                          <span className="text-md fond-semibold text-black">
                            {" "}
                            {item.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  {" "}
                  <h4 className="font-normal text-md  text-center py-2">
                    Noting Found..!!
                  </h4>
                </>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
