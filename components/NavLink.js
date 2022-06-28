import Link from "next/link";

const NavLink = ({ active = false, children, ...props }) => (
  <Link {...props}>
    <a
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
        active
          ? " text-indigo-400 focus:text-indigo-400 uppercase"
          : " text-gray-500 hover:text-indigo-400 uppercase focus:text-indigo-400 "
      }`}
    >
      {children}
    </a>
  </Link>
);

export default NavLink;
