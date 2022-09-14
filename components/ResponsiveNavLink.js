import Link from "next/link";

const ResponsiveNavLink = ({ active = false, children, ...props }) => (
  <Link {...props}>
    <a
      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
        active
          ? "border-[#ff2b03] text-white bg-[#ff2b03] focus:text-white focus:bg-[#ff2b03]"
          : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
      }`}
    >
      {children}
    </a>
  </Link>
);

export const ResponsiveNavButton = (props) => (
  <button
    className="block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
    {...props}
  />
);

export default ResponsiveNavLink;
