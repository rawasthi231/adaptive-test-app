import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Adaptive Test App</title>
        <meta name="description" content="Biodata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-semibold">
            Welcome to Adaptive Test App
          </h1>
          <p className="text-lg font-semibold">
            This is a simple adaptive test app
          </p>
        </main>
      </div>
    </>
  );
}
