import axios from "@/lib/axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import HtmlFormat from "@/components/HtmlFormat";
import Link from "next/link";

const Footer = () => {
  const [footer, setFooter] = useState(false);
  const [footerlogo, setFooterlogo] = useState([]);
  const [footerabout, setFooterabout] = useState([]);
  const [footersociallinks, setFootersociallinks] = useState([]);
  const [footerquicklinks, setFooterquicklinks] = useState([]);
  const [footerquicklinks2, setFooterquicklinks2] = useState([]);
  const [footercontactinfo, setFootercontactinfo] = useState([]);
  const [footercopyright, setFootercopyright] = useState([]);

  useEffect(() => {
    getFooterData();
  }, [footer]);
  async function getFooterData() {
    await Promise.all([
      axios
        .get("/api/footer-settings/footer_about")
        .then((response) => {
          setFooterlogo(response.data.data.logo_image);
          setFooterabout(response.data.data.description);
        })
        .catch((error) => console.log(error)),

      axios
        .get("/api/footer-settings/footer_social_links")
        .then((response) => {
          setFootersociallinks(response.data.data);
        })
        .catch((error) => console.log(error)),

      axios
        .get("/api/footer-settings/footer_links")
        .then((response) => {
          setFooterquicklinks(response.data.data.widget_one);
          setFooterquicklinks2(response.data.data.widget_two);
        })
        .catch((error) => console.log(error)),

      axios
        .get("/api/footer-settings/footer_contact_info")
        .then((response) => {
          setFootercontactinfo(response.data.data);
        })
        .catch((error) => console.log(error)),
      axios
        .get("/api/footer-settings/footer_copyright")
        .then((response) => {
          setFootercopyright(response.data.data);
          setFooter(true);
        })
        .catch((error) => console.log(error)),
    ]);
  }

  return (
    <>
      {footer ? (
        <>
          <div className="h-20 bg-[#210373]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 sm:grid-cols-1 ">
                {/* details info  */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-start">
                    <Image
                      loader={() => footerlogo}
                      src={footerlogo}
                      alt={`footer logo`}
                      width={150}
                      height={50}
                      className="py-4"
                    />
                  </div>
                  <div className="flex items-center justify-start">
                    <div className="text-white">{footerabout}</div>
                  </div>
                  <div className="flex items-center justify-start"></div>
                </div>
                {/* widget links  */}
                <div className="grid md:grid-cols-2 sm:grid-cols-1">
                  {/* widget one  */}
                  <div className="flex flex-col sm:items-center md:items-start">
                    {footerquicklinks.map((item, index) => (
                      <Link key={index} href={`${item.link}`}>
                        <span className="text-white">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                  {/* widget  two  */}
                  <div className="flex flex-col sm:items-center md:items-start">
                    {footerquicklinks2.map((item, index) => (
                      <Link key={index} href={`${item.link}`}>
                        <span className="text-white">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* contact info  */}
                <div className="flex flex-col sm:items-center md:items-start text-white">
                  <span>{footercontactinfo.address}</span>
                  <span>{footercontactinfo.phone}</span>
                  <span>{footercontactinfo.email}</span>
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
