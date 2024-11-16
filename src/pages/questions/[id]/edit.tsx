import { GetServerSideProps } from "next";

import Head from "next/head";

import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import config from "@/config/index";
import QuestionEditor from "@/components/questionEditor";

import { IQuestion } from "@/typings";

export default function EditQuestion({ question }: { question: IQuestion }) {
  const router = useRouter();

  const { mutate, isPending } = useMutation<
    Partial<IQuestion>,
    unknown,
    Partial<IQuestion>
  >({
    mutationFn: (updatedQuestion: Partial<IQuestion>) =>
      fetch(`${config.baseUrl}/questions/${question.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestion),
      }).then((res) => res.json()),
    onSuccess: () => {
      router.push("/questions?refetch=true");
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

      <QuestionEditor
        title="Edit Question"
        isPending={isPending}
        onSave={mutate}
        data={question}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    const res = await fetch(`${config.baseUrl}/questions/${params?.id}`);
    const question = await res.json();

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
