import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "@/lib/axios";

const Search = ({ onSearch }) => {
  let [ingredients, setIngredients] = useState([
    {
      id: 1,
      name: "qui quaerat dignissimos",
      short_description: "in placeat,earum",
      thumbnail: "http://localhost:8000/thumbnail/1656387402.png",
    },
  ]);
  // useEffect(() => {}, [ingredients]);

  function handleChange(e) {
    let { value } = e.target;
    if (value.length >= 2 || value != "") {
      axios.get(`/api/ingredient/search?name=${value}`).then((res) => {
        onSearch(res.data.data);
      });
    }
    if (value == "") {
      setIngredients([]);
    }
  }
  return (
    <>
      <div className="grid gird-cols-1 relative md:-mt-20">
        <div className="flex justify-center items-center">
          <div className="px-16 py-10 md:w-[55%] bg-white rounded-lg border h-44 shadow-md bg-blue-500">
            <div className="pb-4">
              <h6 className="text-xl font-semibold text-white text-center ">
                Search Ingredients
              </h6>
            </div>
            <div className="relative grid grid-cols-1">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <Image
                  className="rounded-full"
                  src="/icons8-search.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
              </div>
              <input
                type="search"
                id="search"
                className="block p-4 px-6 pl-10 text-sm text-white tex-sm bg-blue-500 rounded-lg border border-white focus:ring-blue-500 focus:white dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Ingredients"
                onChange={handleChange}
              />
              {/* <div className="my-2 bg-white rounded-lg border-blue-500  shadow-md overscroll-contain">
                {ingredients?.map((ingredient) => {
                  <div className="px-6 py-2 flex" key={ingredient.id}>
                    <Image
                      loader={() => ingredient.thumbnail}
                      src={ingredient.thumbnail}
                      alt={ingredient.name}
                      width={40}
                      height={40}
                      className="py-4"
                    />
                    <div className=" text-center pt-4 h-16">
                      <h6 className="text-md font-semibold">
                        {ingredient.name}
                      </h6>
                    </div>
                    <div className="truncate px-4 pt-1 h-6 opacity-80">
                      {ingredient.short_description}
                    </div>
                  </div>;
                })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
