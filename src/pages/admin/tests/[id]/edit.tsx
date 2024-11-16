import { GetServerSideProps } from "next";

import Head from "next/head";

import { useRouter } from "next/router";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import Sidebar from "@/components/sidebar";
import TestEditor from "@/components/testEditor";

import { editTest, getTest } from "@/services/test";
import { getAllQuestions } from "@/services/question";
import { ApiResponse, IQuestion, ITest } from "@/typings";

export default function EditTest({
  test,
  initialQuestions,
}: {
  test: ITest;
  initialQuestions: ApiResponse<IQuestion[]>;
}) {
  const router = useRouter();

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["Questions"],
    queryFn: getAllQuestions,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: { pages: [initialQuestions], pageParams: [0] },
    select: (data) =>
      data.pages.flatMap((page) => page.data || []) as IQuestion[],
  });

  const { mutate, isPending } = useMutation<
    ApiResponse<Partial<ITest>>,
    unknown,
    Partial<ITest>
  >({
    mutationFn: (updatedTest: Partial<ITest>) => editTest(test.id, updatedTest),
    onSuccess: () => {
      router.push("/admin/tests?refetch=true");
    },
    onError: (error) => {
      alert("Error while updating Test" + JSON.stringify(error));
    },
  });

  return (
    <>
      <Head>
        <title>Edit Test</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen">
        <Sidebar />

        <TestEditor
          title="Edit Test"
          isPending={isPending}
          onSave={(data) => mutate(data as Partial<ITest>)}
          data={test}
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
    const { params } = context;
    const test = await getTest(params?.id as string);
    const initialQuestions = await getAllQuestions({ pageParam: 0 });

    return {
      props: {
        test: test.data,
        initialQuestions,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        test: {},
        initialQuestions: [],
      },
    };
  }
};
