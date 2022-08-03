import Head from "next/head";
import Navigation from "@/components/Layouts/Navigation";
import { useAuth } from "@/hooks/auth";
const GuestLayout = ({ children }) => {
  const { user } = {};
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} />

      {/* Page Heading */}
      {/* <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header> */}

      {/* Page Content */}
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default GuestLayout;
