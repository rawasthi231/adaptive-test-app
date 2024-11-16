import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Head from "next/head";

import Edit from "@/components/edit";
import Header from "@/components/header";
import Delete from "@/components/delete";
import Sidebar from "@/components/sidebar";
import Button from "@/components/formElements/Button";

import { IQuestion } from "@/typings/index";
import { deleteQuestion, getQuestion } from "@/services/question";

export default function Questions({ data }: { data: IQuestion }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmDelete) {
      try {
        const res = await deleteQuestion(id);
        if (res.data) {
          router.push("/admin/questions?refetch=true");
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
        <title>Question | {data.question}</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header title="Question" />
          <div className="p-8 bg-white rounded-lg shadow-lg mt-5">
            <h1 className="text-2xl font-semibold">{data.question}</h1>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(data.id);
              }}
              className="float-right"
            >
              <Delete />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/admin/questions/${data.id}/edit`);
              }}
              className="float-right mr-5"
            >
              <Edit />
            </Button>

            <ul className="list-disc list-inside">
              {data.options.map((option) => (
                <li key={option} className="ml-4">
                  {option}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <strong>Answer:</strong> {data.answer}
            </p>
            <p className="mt-2">
              <strong>Difficulty:</strong> {data.difficulty}
            </p>
          </div>
        </div>
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
        data: question.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: {},
      },
    };
  }
};
