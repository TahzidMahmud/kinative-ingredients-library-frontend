/* eslint-disable react/jsx-key */
import Image from "next/image";
import { useState, useEffect } from "react";

const Side = ({
  categories,
  brands,
  handleCategoryClick,
  handleBrandClick,
  closeFilter,
}) => {
  const [loading, setLoading] = useState(true);

  // const [Products, setProducts] = useState(products);
  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 600);
  }, []);
  return (
    <aside className="w-full px-2" aria-label="Sidebar">
      {loading ? (
        <div className="bg-white h-full">
          <div className="border shadow rounded-md p-2">
            <div className="animate-pulse flex space-x-2 flex flex-col items-center">
              <div className="rounded bg-slate-200 h-[3rem] w-[12rem]"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 ">
                    <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem]"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded  h-[3rem] w-[12rem]"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>

                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>

                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>

                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>

                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>

                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>

                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>

                <div className="h-2 bg-slate-200 rounded col-span-1  h-[1rem] w-[12rem] my-3"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto py-6 px-3 bg-white rounded dark:bg-white">
          <div
            className="flex items-center justify-between border-b"
            onClick={() => {
              closeFilter();
            }}
          >
            <h6 className="mb-2 text-xl font-bold ml-2 pb-2">Categories</h6>
            <div className="md:invisible flex justify-center items-center p-3 shadow-md rounded-full -mt-4">
              <Image
                className="rounded-full px-4"
                src="/icons8-close.svg"
                alt="logo"
                width={12}
                height={12}
              />
            </div>
          </div>
          <ul className="space-y-1">
            {categories?.map((category) => (
              <li>
                <button
                  type="button"
                  valu={category.id}
                  className="flex items-center p-2 w-[100%] text-base font-normal text-gray-900 rounded-lg transition duration-75 active:text-blue-500 hover:text-blue-500 group hover:bg-gray-100"
                  onClick={(e) => {
                    let rl = document.getElementById(`${e.target.id}-c`);
                    if (rl) {
                      if (rl.classList.contains("hidden")) {
                        rl.classList.remove("hidden");
                      } else {
                        rl.classList.add("hidden");
                      }
                    }
                    // handleCategoryClick(e);
                  }}
                >
                  <span
                    className="flex-1 ml-3 text-left opacity-90"
                    sidebar-toggle-item="dropdown-example"
                    value="dropdown-example"
                    id={category.id}
                  >
                    {category.name}
                  </span>
                  {/* child menue  */}
                  {category.has_child ? (
                    <svg
                      id={category.id}
                      sidebar-toggle-item=""
                      className="w-[1.5rem] h-[1.5rem]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <></>
                  )}
                </button>
                {category.has_child ? (
                  <ul
                    id={`${category.id}-c`}
                    className="hidden py-2 space-y-2 border-l ml-2 pl-1"
                  >
                    {category.child?.map((cat) => (
                      <li>
                        <a
                          id={cat.id}
                          onClick={handleCategoryClick}
                          href="javascript:void(0)"
                          className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 opacity-70"
                        >
                          {cat.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </li>
            ))}
          </ul>
          <br></br>
          <h6 className="mb-2 text-xl font-bold ml-2 border-b pb-4 mt-2 mb-3">
            Brands
          </h6>
          {brands?.map((brand) => (
            <div className="flex items-center mb-4 mt-6 pl-4">
              <input
                id={`checkbox-${brand.id}`}
                type="checkbox"
                value={brand.id}
                onChange={handleBrandClick}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="checkbox"
                className="ml-2 text-sm text-dark opacity-90 "
              >
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Side;
