import Head from "next/head";

import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import Sidebar from "@/components/sidebar";
import QuestionEditor from "@/components/questionEditor";

import { createQuestion } from "@/services/question";

export default function CreateQuestion() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createQuestion,
    onSuccess: (data) => {
      if (data.data) router.push("/admin/questions?refetch=true");
    },
    onError: (error) => {
      alert("Error while creating test" + JSON.stringify(error));
    },
  });

  return (
    <>
      <Head>
        <title>Create Question</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen">
        <Sidebar />

        <QuestionEditor
          title="Create Question"
          isPending={isPending}
          onSave={mutate}
        />
      </div>
    </>
  );
}
