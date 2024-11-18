import { GetServerSideProps } from "next";

import Head from "next/head";

import React from "react";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

import { getUserTests } from "@/services/test";
import { IUserTests } from "@/typings/index";

export default function Tests({ data }: { data: IUserTests[] }) {
  return (
    <>
      <Head>
        <title>Tests</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Tests" />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            {data?.map((element, index) => (
              <div
                key={element.id}
                className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-90"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {index + 1}. {element.test.title}
                </h2>
                <p className="text-gray-600 mb-2">{element.test.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600 mb-2">
                    <strong>Submitted On: </strong>
                    {element.updatedAt
                      ? new Date(element.updatedAt!).toDateString()
                      : ""}
                  </p>
                  <p className="text-gray-600">
                    <strong>Score:</strong>
                    {element.score}
                  </p>
                  <p className="text-green-600">
                    <strong>Correct Answers:</strong>
                    {element.correctCount}
                  </p>
                  <p className="text-red-600">
                    <strong>Wrong Answers:</strong>
                    {element.wrongCount}
                  </p>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getUserTests();

    return {
      props: {
        data: res.data,
      },
    };
  } catch (error) {
    console.error("error", error);
    return {
      props: {
        data: [],
      },
    };
  }
};
