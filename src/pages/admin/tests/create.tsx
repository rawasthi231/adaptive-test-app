import { GetServerSideProps } from "next";

import Head from "next/head";

import { useRouter } from "next/router";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import Sidebar from "@/components/sidebar";
import TestEditor from "@/components/testEditor";

import { ApiResponse, IQuestion, ITest } from "@/typings";
import { getAllQuestions } from "@/services/question";
import { createTest } from "@/services/test";

export default function EditTest({
  initialQuestions,
}: {
  initialQuestions: ApiResponse<IQuestion[]>;
}) {
  const router = useRouter();

  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ["Questions"],
    queryFn: getAllQuestions,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [initialQuestions], pageParams: [0] },
    select: (data) =>
      data.pages.flatMap((page) => page.data || []) as IQuestion[],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createTest,
    onSuccess: (data) => {
      if (data.data) router.push("/admin/tests?refetch=true");
    },
    onError: (error) => {
      alert("Error while creating test" + JSON.stringify(error));
    },
  });

  return (
    <>
      <Head>
        <title>Create Test</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen">
        <Sidebar />

        <TestEditor
          title="Create Test"
          isPending={isPending}
          onSave={(data) => mutate(data as Partial<ITest>)}
          questions={data}
          fetchMoreQuestions={fetchNextPage}
          hasMoreQuestions={hasNextPage}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const initialQuestions = await getAllQuestions({ pageParam: 0 });

    return {
      props: {
        initialQuestions,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialQuestions: [],
      },
    };
  }
};
