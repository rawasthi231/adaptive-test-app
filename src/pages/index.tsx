import Head from "next/head";

import Sidebar from "@/components/sidebar";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Adaptive Test App</title>
        <meta name="description" content="Biodata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <h1 className="text-2xl font-semibold">
              Welcome to Adaptive Test App, {user?.name}
            </h1>
            <p className="text-lg font-semibold">
              This is a simple adaptive test app built with Next.js and Tailwind
              CSS.
            </p>
            <br />
            Here are some of the features:
            <br />
            <ul className="list-disc list-inside">
              <li>Authentication</li>
              <li>Authorization</li>
              <li>Role-based access control</li>
              <li>Adaptive tests</li>
              <li>Question bank</li>
              <li>Test results</li>
            </ul>
          </main>
        </div>
      </div>
    </>
  );
}
