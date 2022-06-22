import React from "react";
import Side from "../Side";
import Product from "./Product";
import axios from "@/lib/axios";

function handleCategoryClick() {}
function handleBrandClick() {}

const ProductList = ({ categories, products, brands }) => {
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
          {products?.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
