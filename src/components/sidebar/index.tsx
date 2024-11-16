import Link from "next/link";

import Button from "../formElements/Button";

import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const { logoutUser, user } = useAuth();

  return (
    <div className="bg-gray-900 text-white h-screen w-64 p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-5">
        {user ? (user.role === 1 ? "Admin" : "User") : ""} Dashboard{" "}
      </h1>
      <nav className="space-y-4">
        {user?.role === 1 ? (
          <>
            <Link
              href="/admin/questions"
              className="block px-3 py-2 rounded hover:bg-gray-700"
            >
              Questions
            </Link>
            <Link
              href="/admin/tests"
              className="block px-3 py-2 rounded hover:bg-gray-700"
            >
              Tests
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/user/tests/"
              className="block px-3 py-2 rounded hover:bg-gray-700"
            >
              My Tests
            </Link>
            <Link
              href="/user/tests/register"
              className="block px-3 py-2 rounded hover:bg-gray-700"
            >
              New Test
            </Link>
          </>
        )}
        <Button
          className="block px-3 py-2 rounded hover:bg-gray-700"
          onClick={() => {
            confirm("Are you sure you want to logout?") && logoutUser();
          }}
        >
          Logout
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
