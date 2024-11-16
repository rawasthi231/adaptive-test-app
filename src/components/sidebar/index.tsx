import Link from "next/link";

const Sidebar = () => (
  <div className="bg-gray-800 text-white h-screen w-64 p-5 flex flex-col">
    <h1 className="text-xl font-bold mb-5">Admin Dashboard</h1>
    <nav className="space-y-4">
      <Link
        href="/questions"
        className="block px-3 py-2 rounded hover:bg-gray-700"
      >
        Questions
      </Link>
      <Link href="/tests" className="block px-3 py-2 rounded hover:bg-gray-700">
        Tests
      </Link>
    </nav>
  </div>
);

export default Sidebar;
