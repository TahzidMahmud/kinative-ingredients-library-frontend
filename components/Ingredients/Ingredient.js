import Image from "next/image";

const Ingredient = ({ ingredient }) => {
  return (
    <div className="flex h-[13rem]  inline-flex shadow-lg">
      <div className="w-12/12  mx-auto  bg-white shadow-sm sm:rounded-lg">
        <div className="overflow-hidden flex flex-col justify-center items-center p-4">
          <Image
            loader={() => ingredient.thumbnail}
            src={ingredient.thumbnail}
            alt={ingredient.name}
            width={85}
            height={85}
            className="pt-4 pb-2 "
          />
          <div className=" text-center mt-4">
            <h6 className="text-lg font-semibold">{ingredient.name}</h6>
          </div>
          <div className="truncate px-4 mx-4 pt-1 h-6 opacity-80">
            {ingredient.short_description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
