import { GetServerSideProps } from "next";

import Head from "next/head";

import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import Sidebar from "@/components/sidebar";
import QuestionEditor from "@/components/questionEditor";

import { ApiResponse, IQuestion } from "@/typings";
import { editQuestion, getQuestion } from "@/services/question";

export default function EditQuestion({ question }: { question: IQuestion }) {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    ApiResponse<Partial<IQuestion>>,
    unknown,
    Partial<IQuestion>
  >({
    mutationFn: (updatedQuestion: Partial<IQuestion>) =>
      editQuestion(question.id, updatedQuestion),
    onSuccess: () => {
      router.push("/admin/questions?refetch=true");
    },
    onError: (error) => {
      alert("Error while updating Question" + JSON.stringify(error));
    },
  });

  return (
    <>
      <Head>
        <title>Edit Question</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen">
        <Sidebar />

        <QuestionEditor
          title="Edit Question"
          isPending={isPending}
          onSave={mutate}
          data={question}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;

    const question = await getQuestion(params?.id as string);

    return {
      props: {
        question: question.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        question: {},
      },
    };
  }
};
