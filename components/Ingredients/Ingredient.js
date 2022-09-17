import Image from "next/image";

const Ingredient = ({ ingredient }) => {
  return (
    <div className="py-8 flex h-[18rem]  inline-flex bg-white justify-center  ">
      <div className=" mx-auto">
        <div className="overflow-hidden flex flex-col justify-center items-center p-4">
          <Image
            loader={() => ingredient.thumbnail}
            src={ingredient.thumbnail}
            alt={ingredient.name}
            width={85}
            height={85}
            className="py-4"
          />
          <div className=" text-center pt-4 h-16">
            <h6 className="text-md font-semibold">{ingredient.name}</h6>
          </div>
          <div className="truncate md:px-4 pt-1 h-6 opacity-80">
            {ingredient.short_description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
