import axios from "@/lib/axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import HtmlFormat from "@/components/HtmlFormat";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectFooterState, setFooterState } from "../../store/footerSlice";
const Footer = ({ data = null }) => {
  const [footer, setFooter] = useState(false);
  const [footerlogo, setFooterlogo] = useState(
    data != null ? data[0].data : null
  );
  const [footerabout, setFooterabout] = useState(
    data != null ? data[1].data : null
  );
  const [footersociallinks, setFootersociallinks] = useState(
    data != null ? data[2].data : []
  );
  const [footerquicklinks, setFooterquicklinks] = useState(
    data != null ? data[3].data : []
  );
  const [footerquicklinks2, setFooterquicklinks2] = useState(
    data != null ? data[4].data : []
  );
  const [footercontactinfo, setFootercontactinfo] = useState(
    data != null ? data[5].data : []
  );
  const [footercopyright, setFootercopyright] = useState(
    data != null ? data[6].data : null
  );
  const [email, setEmail] = useState(null);
  const [footerState, setfooterState] = useState(
    useSelector(selectFooterState)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (data == null && data == undefined) {
      getFooterData();
    } else {
      setFooter(true);
    }
  }, []);
  async function getFooterData() {
    await Promise.all([
      axios
        .get("/api/footer-settings/footer_about")
        .then((response) => {
          setFooterlogo(response.data.data.logo_image);
          setFooterabout(response.data.data.description);
          dispatch(
            setFooterState({
              footerData: {
                data: response.data.data.logo_image,
                name: "footer_logo",
              },
            })
          );
          dispatch(
            setFooterState({
              footerData: {
                data: response.data.data.description,
                name: "footer_about",
              },
            })
          );
        })
        .catch((error) => console.log(error)),

      axios
        .get("/api/footer-settings/footer_social_links")
        .then((response) => {
          setFootersociallinks(response.data.data);
          dispatch(
            setFooterState({
              footerData: {
                data: response.data.data,
                name: "footer_social_links",
              },
            })
          );
        })
        .catch((error) => console.log(error)),

      axios
        .get("/api/footer-settings/footer_links")
        .then((response) => {
          setFooterquicklinks(response.data.data.widget_one);
          setFooterquicklinks2(response.data.data.widget_two);
          dispatch(
            setFooterState({
              footerData: {
                data: response.data.data.widget_one,
                name: "footer_links1",
              },
            })
          );
          dispatch(
            setFooterState({
              footerData: {
                data: response.data.data.widget_two,
                name: "footer_links2",
              },
            })
          );
        })
        .catch((error) => console.log(error)),

      axios
        .get("/api/footer-settings/footer_contact_info")
        .then((response) => {
          setFootercontactinfo(response.data.data);
          dispatch(
            setFooterState({
              footerData: {
                data: response.data.data,
                name: "footer_contact_info",
              },
            })
          );
        })
        .catch((error) => console.log(error)),
      axios
        .get("/api/footer-settings/footer_copyright")
        .then((response) => {
          setFootercopyright(response.data.data);
          dispatch(
            setFooterState({
              footerData: {
                data: response.data.data,
                name: "footer_copyright",
              },
            })
          );
          setFooter(true);
        })
        .catch((error) => console.log(error)),
    ]);
  }

  function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append(`email`, email);
    if (email != null) {
      axios
        .post("/api/subscription-requests ", formData)
        .then((response) => {
          if (response.data.success) {
            setemail(null);
          }
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <>
      {footer ? (
        <>
          {/* footer subscription  */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white  border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 md:p-16 p-6 relative -mb-8">
              <div className="grid md:grid-cols-2 sm:grid-cols-1 md:px-14 sm:px-8 flex items-center">
                {/* text section  */}
                <div className="block">
                  <div className="flex-col items-start">
                    <div className="text-lg font-semibold uppercase my-1">
                      SUBSCRIBE
                    </div>
                    <div className="text-sm opacity-70 block">
                      Subscribe to our newsletter to get regular updates and
                      offers directly to your email. Your information is secured
                      ith me
                    </div>
                  </div>
                </div>
                {/* input section  */}
                <div className="block">
                  <div className=" flex h-[3rem] md:pl-8  my-2 md:my-0">
                    <input
                      type="email"
                      className="roundehidden rounded-l-md  bg-white border border-gray-300 text-gray-900 focus:ring-[#ff2b03] focus:border-[#ff2b03] block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.2 h-6"
                      placeholder="Your Email Here"
                      onChange={(e) => setemail(e.target.value)}
                    />
                    <span
                      onClick={submit}
                      className="inline-flex items-center md:px-10 px-2 md:text-sm text-xs text-white font-semibold uppercase bg-[#ff2b03] rounded-r-md border border-r-0 border-[#ff2b03] h-6"
                    >
                      submit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* footer base  */}
          <div className="h-20 bg-[#210373] py-14  pt-16 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-5 sm:grid-cols-1 ">
                {/* details info  */}
                <div className="flex flex-col md:col-span-2">
                  <div className="flex items-center md:justify-start justify-center my-4">
                    <Image
                      loader={() => footerlogo}
                      src={footerlogo}
                      alt={`footer logo`}
                      width={180}
                      height={70}
                      className="py-2"
                    />
                  </div>
                  <div className="flex items-center md:justify-start justify-center my-4">
                    <div className="text-white text-sm">{footerabout}</div>
                  </div>
                  <div className="flex md:justify-start justify-center gap-3 my-4">
                    {footersociallinks.map((social, index) => (
                      <>
                        <div
                          className={`${
                            social.type == "facebook" && social.link != ""
                              ? "p-2 bg-[#385899] rounded-full flex items-center justify-center"
                              : "hidden"
                          } `}
                        >
                          <Link key={index} href={`${social.link}`}>
                            <Image
                              src="/facebook.svg"
                              alt={social.type}
                              width={18}
                              height={18}
                              className="py-4"
                            />
                          </Link>
                        </div>
                        <div
                          className={`${
                            social.type == "twitter" && social.link != ""
                              ? "p-2 bg-[#16a2f2] rounded-full flex items-center justify-center"
                              : "hidden"
                          }`}
                        >
                          <Link key={index} href={`${social.link}`}>
                            <Image
                              src="/twitter.svg"
                              alt={social.type}
                              width={18}
                              height={18}
                              className="py-4"
                            />
                          </Link>
                        </div>
                        <div
                          className={`${
                            social.type == "instagram" && social.link != ""
                              ? "p-2 bg-[#be2ea3] rounded-full flex items-center justify-center"
                              : "hidden"
                          }`}
                        >
                          <Link key={index} href={`${social.link}`}>
                            <Image
                              src="/instagram.svg"
                              alt={social.type}
                              width={18}
                              height={18}
                              className="py-4"
                            />
                          </Link>
                        </div>
                        <div
                          className={`${
                            social.type == "youtube" && social.link != ""
                              ? "p-2 bg-[#ff0000] rounded-full flex items-center justify-center"
                              : "hidden"
                          }`}
                        >
                          <Link key={index} href={`${social.link}`}>
                            <Image
                              src="/youtube.svg"
                              alt={social.type}
                              width={18}
                              height={18}
                              className="py-4"
                            />
                          </Link>
                        </div>
                        <div
                          className={`${
                            social.type == "linkedin" && social.link != ""
                              ? "p-2 bg-[#0070ae] rounded-full flex items-center justify-center"
                              : "hidden"
                          }`}
                        >
                          <Link key={index} href={`${social.link}`}>
                            <Image
                              src="/linkedin.svg"
                              alt={social.type}
                              width={18}
                              height={18}
                              className="py-4"
                            />
                          </Link>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                {/* widget links  */}
                {/* <div className="grid md:grid-cols-2 sm:grid-cols-1"> */}
                {/* widget one  */}

                <div className="flex justify-center ">
                  <div className="flex flex-col md:items-start  items-center ">
                    <div className="text-md font-bold uppercase text-white my-4">
                      quick links
                    </div>
                    {footerquicklinks.map((item, index) => (
                      <Link key={index} href={`${item.link}`}>
                        <span className="text-white text-sm my-1">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* widget  two  */}
                <div className="flex justify-center">
                  <div className="flex flex-col md:items-start items-center">
                    <div className="text-md font-bold uppercase text-white my-4">
                      quick links
                    </div>
                    {footerquicklinks2.map((item, index) => (
                      <Link key={index} href={`${item.link}`}>
                        <span className="text-white text-sm my-1">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* </div> */}
                {/* contact info  */}
                <div className="flex md:justify-end justify-center ">
                  <div className="flex flex-col  md:items-start items-center text-white sm:mx-auto">
                    <div className="text-md font-bold uppercase text-white my-4">
                      contact us
                    </div>
                    <div className="text-sm uppercase my-2">address:</div>
                    <span className="text-sm opacity-70 leading-7">
                      {footercontactinfo.address}
                    </span>
                    <div className="text-sm uppercase my-3">contact</div>
                    <div className="flex items-center bg-[#ff2b03] p-1 rounded-full ">
                      <div className="flex items-center justify-center">
                        <Image
                          src="/phone.PNG"
                          alt={`phone`}
                          width={40}
                          height={40}
                          className="py-1 rounded-full"
                        />
                      </div>

                      <div className="text-sm font-bold px-3">
                        Hotline: {footercontactinfo.phone}
                      </div>
                    </div>
                    <div className="flex items-center bg-[#ff2b03] p-1 rounded-full my-2">
                      <div className="flex items-center justify-center">
                        <Image
                          src="/mail.PNG"
                          alt={`mail`}
                          width={40}
                          height={40}
                          className="py-1 rounded-full"
                        />
                      </div>

                      <div className="text-sm font-bold px-3">
                        {footercontactinfo.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-20 bg-[#ff2b03] py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-sm text-white">
                <HtmlFormat data={footercopyright} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Footer;
