import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "@/lib/axios";

// const ProductList = dynamic(() => import("@/components/Products/ProductList"));
import HtmlFormat from "@/components/HtmlFormat";

const Paginate = ({
  from_page,
  current_page,
  last_page,
  page_Links,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fromPage, setFromPage] = useState(from_page);
  const [lastPage, setLastPage] = useState(last_page);
  const [links, setLinks] = useState(page_Links);

  async function fetchNewPage(url) {
    const data = await axios
      .get(`${url}`)
      .then((response) => {
        setCurrentPage(response.data.meta.current_page);
        return response.data;
      })
      .catch((error) => console.log(error));
    onPageChange(data.data);
    // setLinks(data.meta.links);
  }

  return (
    <div className="flex justify-center items-center my-10">
      {lastPage != fromPage ? (
        <div className="flex justify-between">
          {links.map((link, index) => (
            <div key={`${link.url}+${index}`} className="mx-1">
              {link.url !== null && index + 1 != links.length ? (
                <div
                  onClick={() => {
                    fetchNewPage(link.url);
                  }}
                >
                  <div
                    className={`py-2 px-3 rounded-sm text-blue-500 hover:text-white bg-blue-200 hover:bg-blue-500 ${
                      index + 1 == currentPage ? " bg-blue-500 text-white" : ""
                    }`}
                  >
                    <HtmlFormat data={link.label} />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Paginate;
