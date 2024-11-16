import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <h1 className=" text-2xl font-semibold text-center">
            404 Page Not Found
          </h1>
        </main>
      </div>
    </>
  );
}
