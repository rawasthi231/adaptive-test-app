import { GetServerSideProps } from "next";

import Head from "next/head";

import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import Header from "@/components/header";
import Loader from "@/components/loader";
import Sidebar from "@/components/sidebar";
import Button from "@/components/formElements/Button";

import { ITest } from "@/typings/index";
import { getTestByUrl, startTest } from "@/services/test";
import { useEffect } from "react";

export default function PlayGround({ data }: { data: ITest }) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: startTest,
    onSuccess: (data) => {
      if (data.data) {
        router.push(`/user/tests/${data.data.id}`);
      }
    },
    onError: (error) => {
      alert("Error while creating test" + JSON.stringify(error));
    },
  });

  useEffect(() => {
    mutate(data.id);
  }, []);

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
          {isPending ? <Loader /> : null}
          <Header title="Test" />
          <div className="p-8 bg-white rounded-lg shadow-lg mt-5">
            <h1 className="text-2xl font-semibold">{data.title}</h1>

            <p className="mb-2">
              <strong>Description: </strong>
              {data.description}
            </p>

            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="float-right block px-3 py-2 rounded bg-gray-700 text-white"
            >
              Start Test
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

    const test = await getTestByUrl(params?.url as string);

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
