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

import { deleteQuestion, getAllQuestions } from "@/services/question";
import { ApiResponse, IQuestion } from "@/typings/index";

export default function Questions({
  initialQuestions,
}: {
  initialQuestions: ApiResponse<IQuestion[]>;
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
      queryKey: ["Questions"],
      queryFn: getAllQuestions,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialData: { pages: [initialQuestions], pageParams: [0] },
      select: (data) =>
        data.pages.flatMap((page) => page.data || []) as IQuestion[],
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
    const confirmDelete = confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmDelete) {
      try {
        const res = await deleteQuestion(id);
        if (res.data) {
          refetch();
        } else {
          alert("Failed to delete question");
        }
      } catch (error) {
        alert("Error: " + JSON.stringify(error));
      }
    }
  };

  return (
    <>
      <Head>
        <title>Questions</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {isFetching ? <Loader /> : null}
          <Header title="Questions" />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => router.push("/admin/questions/create")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create New Question
              </button>
            </div>
            {data.map((question, index) => (
              <div
                key={question.id}
                className="bg-white shadow-md rounded-md p-4 mb-4"
              >
                <h2 className="text-lg font-semibold">
                  {index + 1}. {question.question}
                </h2>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(question.id);
                  }}
                  className="float-right ml-5"
                >
                  <Delete />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/questions/${question.id}/edit`);
                  }}
                  className="float-right ml-5"
                >
                  <Edit />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/questions/${question.id}`);
                  }}
                  className="float-right"
                >
                  <View />
                </Button>

                <ul className="list-disc list-inside">
                  {question.options.map((option) => (
                    <li key={option} className="ml-4">
                      {option}
                    </li>
                  ))}
                </ul>
                <p className="mt-2">
                  <strong>Answer: </strong> {question.answer}
                </p>
                <p>
                  <strong>Difficulty:</strong> {question.difficulty}
                </p>
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
    const initialQuestions = await getAllQuestions({ pageParam: 0 });

    return {
      props: {
        initialQuestions,
      },
    };
  } catch (error) {
    console.error("error", error);
    return {
      props: {
        initialQuestions: [],
      },
    };
  }
};
