import { GetServerSideProps } from "next";

import Head from "next/head";

import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useInfiniteQuery } from "@tanstack/react-query";

import View from "@/components/view";
import Header from "@/components/header";
import Loader from "@/components/loader";
import Sidebar from "@/components/sidebar";
import Button from "@/components/formElements/Button";

import { getAllTests } from "@/services/test";
import { ApiResponse, ITest } from "@/typings/index";

export default function Tests({
  initialTests,
}: {
  initialTests: ApiResponse<ITest[]>;
}) {
  const router = useRouter();

  const [element, setElement] = React.useState(null);

  useEffect(() => {
    if (router.query.refetch) {
      refetch();
    }
  }, []);

  const { data, hasNextPage, fetchNextPage, isFetching, refetch } =
    useInfiniteQuery({
      queryKey: ["Tests"],
      queryFn: getAllTests,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialData: { pages: [initialTests], pageParams: [0] },
      select: (data) =>
        data.pages.flatMap((page) => page.data || []) as ITest[],
    });

  useEffect(() => {
    if (!element || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio) {
          await fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [element, fetchNextPage]);

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
          {isFetching ? <Loader /> : null}
          <Header title="Tests" />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            {data.map((test, index) => (
              <div
                key={test.id}
                className="bg-white shadow-md rounded-md p-4 mb-4"
              >
                <h2 className="text-lg font-semibold">
                  {index + 1}. {test.title}
                </h2>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/user/tests/${test.url}`);
                  }}
                  className="float-right block px-3 py-2 rounded bg-gray-700 text-white"
                >
                  Register for test
                </Button>

                <p className="mt-2">{test.description}</p>
              </div>
            ))}
            {hasNextPage && data.length ? (
              <div
                ref={
                  setElement as unknown as React.LegacyRef<HTMLParagraphElement>
                }
              >
                Loading...
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialTests = await getAllTests({ pageParam: 0 });
    return {
      props: {
        initialTests,
      },
    };
  } catch (error) {
    console.error("error", error);
    return {
      props: {
        initialTests: [],
      },
    };
  }
};
