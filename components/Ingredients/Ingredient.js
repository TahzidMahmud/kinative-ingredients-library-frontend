import Image from "next/image";

const Ingredient = ({ ingredient }) => {
  return (
    <div className="py-12 flex h-[20rem]  inline-flex ">
      <div className="w-11/12  mx-auto  bg-white shadow-sm sm:rounded-lg">
        <div className="overflow-hidden flex flex-col justify-center items-center p-4">
          <Image
            loader={() => ingredient.thumbnail}
            src={ingredient.thumbnail}
            alt={ingredient.name}
            width={85}
            height={85}
            className="pt-4"
          />
          <div className=" text-center">
            <h6 className="text-lg font-semibold">{ingredient.name}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
