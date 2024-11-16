import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Head from "next/head";

import config from "@/config/index";
import Header from "@/components/header";
import Delete from "@/components/delete";
import Button from "@/components/formElements/Button";

import { IQuestion } from "@/typings/index";

export default function Questions({ data }: { data: IQuestion }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this question?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`${config.baseUrl}/questions/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          router.push("/questions?refetch=true");
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

          <ul className="list-disc list-inside">
            {data.options.map((option) => (
              <li key={option} className="ml-4">
                {option}
              </li>
            ))}
          </ul>
          <p className="mt-4">Answer: {data.answer}</p>
          <p className="mt-2">Difficulty: {data.difficulty}</p>
          <Button
            onClick={() => router.push(`/questions/${data.id}/edit`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/4 mt-4"
          >
            Edit
          </Button>
        </div>
      </div>
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
