import { GetServerSideProps } from "next";

import Head from "next/head";

import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useInfiniteQuery } from "@tanstack/react-query";

import View from "@/components/view";
import Edit from "@/components/edit";
import Header from "@/components/header";
import Loader from "@/components/loader";
import Delete from "@/components/delete";
import Sidebar from "@/components/sidebar";
import Button from "@/components/formElements/Button";

import { deleteTest, getAllTests } from "@/services/test";
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

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this test?");
    if (confirmDelete) {
      try {
        const res = await deleteTest(id);
        if (res.data) {
          refetch();
        }
      } catch (error) {
        alert("Error: " + JSON.stringify(error));
      }
    }
  };

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
                    handleDelete(test.id);
                  }}
                  className="float-right ml-5"
                >
                  <Delete />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/tests/${test.id}/edit`);
                  }}
                  className="float-right ml-5"
                >
                  <Edit />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/tests/${test.id}`);
                  }}
                  className="float-right"
                >
                  <View />
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
