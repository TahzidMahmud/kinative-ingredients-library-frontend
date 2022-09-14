import Link from "next/link";

const NavLink = ({ active = false, children, ...props }) => (
  <Link {...props}>
    <a
      className={`inline-flex items-center px-1 pt-1 text-sm font-md leading-5 focus:outline-none transition duration-150 ease-in-out ${
        active
          ? " text-[#ff2b03] focus:text-[#ff2b03] uppercase"
          : " text-black hover:text-[#ff2b03] uppercase focus:text-[#ff2b03] "
      }`}
    >
      {children}
    </a>
  </Link>
);

export default NavLink;
