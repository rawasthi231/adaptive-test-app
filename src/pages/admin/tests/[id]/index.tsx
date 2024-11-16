import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Head from "next/head";

import Edit from "@/components/edit";
import Header from "@/components/header";
import Delete from "@/components/delete";
import Sidebar from "@/components/sidebar";
import Button from "@/components/formElements/Button";

import { ITest } from "@/typings/index";
import { deleteTest, getTest } from "@/services/test";

export default function Test({ data }: { data: ITest }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this Test?");
    if (confirmDelete) {
      try {
        const res = await deleteTest(id);
        if (res.data) {
          router.push("/test?refetch=true");
        } else {
          alert("Failed to delete test");
        }
      } catch (error) {
        alert("Error: " + JSON.stringify(error));
      }
    }
  };

  return (
    <>
      <Head>
        <title>Test | {data.title}</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header title="Test" />
          <div className="p-8 bg-white rounded-lg shadow-lg mt-5">
            <h1 className="text-2xl font-semibold">{data.title}</h1>
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
                router.push(`/test/${data.id}/edit`);
              }}
              className="float-right mr-5"
            >
              <Edit />
            </Button>

            <p className="mt-4">{data.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;

    const test = await getTest(params?.id as string);

    return {
      props: {
        data: test.data,
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
