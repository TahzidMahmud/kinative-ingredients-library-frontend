import Image from "next/image";
import Link from "next/link";

const FooterNavigation = ({ user }) => {
  return (
    <div className="bg-white p-4 fixed bottom-0 right-0 z-10 w-[100%]  flex justify-between items-center md:hidden rounded-md">
      <Link href="/">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/home.svg"
            alt="logo"
            width={25}
            height={25}
            className="rounded-t-lg py-6"
          />
          <span className="text-sm pt-1">Home</span>
        </div>
      </Link>

      <Link href="/products">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/product.svg"
            alt="logo"
            width={25}
            height={25}
            className="rounded-t-lg py-6"
          />
          <span className="text-sm pt-1">Products</span>
        </div>
      </Link>

      <Link href="/blogs">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/blog.svg"
            alt="logo"
            width={25}
            height={25}
            className="rounded-t-lg py-6"
          />
          <span className="text-sm pt-1">Blogs</span>
        </div>
      </Link>

      {user ? (
        <Link href={`/profile/${user.id}`}>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/profile.svg"
              alt="logo"
              width={25}
              height={25}
              className="rounded-t-lg py-6"
            />
            <span className="text-sm pt-1">Profile</span>
          </div>
        </Link>
      ) : (
        <Link href={`/login`}>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/profile.svg"
              alt="logo"
              width={25}
              height={25}
              className="rounded-t-lg py-6"
            />
            <span className="text-sm pt-1">Profile</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default FooterNavigation;
