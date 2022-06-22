import React from "react";
import Side from "../Side";
import Product from "./Product";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";

const ProductList = ({ categories, products, brands }) => {
  const [fetchproducts, setFetchProducts] = useState([]);
  const [queryparams, setQueryPrams] = useState({
    categories: [],
    brands: [],
  });
  useEffect(() => {
    setFetchProducts([...fetchproducts, ...products]);
  }, []);

  function handleCategoryClick() {}
  function handleBrandClick(e) {
    const { value, checked } = e.target;
    const { brands } = queryparams;
    if (checked) {
      setQueryPrams({
        categories: [...categories],
        brands: [...brands, value],
      });
    } else {
      setQueryPrams({
        categories: [...categories],
        brands: brands.filter((e) => e !== value),
      });
    }
    fetchProducts();
  }

  function fetchProducts() {
    axios
      .post("/api/filter-products", {
        brands: queryparams.brands.toString(),
      })
      .then((response) => {
        setFetchProducts(response.data.data);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <div className="flex">
        <div className="invisible md:visible pr-2">
          <Side
            categories={categories}
            brands={brands}
            handleCategoryClick={handleCategoryClick}
            handleBrandClick={handleBrandClick}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {fetchproducts?.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
