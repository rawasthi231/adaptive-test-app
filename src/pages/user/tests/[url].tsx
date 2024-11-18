import { GetServerSideProps } from "next";

import Head from "next/head";

import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Button from "@/components/formElements/Button";
import InputWrapper from "@/components/formElements/InputWrapper";
import RadioButton, { RadioWrapper } from "@/components/formElements/Radio";

import { yupResolver } from "@hookform/resolvers/yup";
import { answerSubmitSchema } from "@/validation/schema";
import { IQuestion, ISubmitAnswerData, ITest } from "@/typings/index";
import { getTestByUrl, startTest, submitAnswer } from "@/services/test";

export default function Test({ test }: { test: ITest }) {
  const router = useRouter();

  const [hasStarted, setHasStarted] = useState(false);
  const [question, setQuestion] = useState<Omit<IQuestion, "answer">>();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(answerSubmitSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: startTest,
    onSuccess: (res) => {
      if (res.data) {
        reset({ answer: "" });
        setHasStarted(true);
        setQuestion(res.data.question);
      }
    },
    onError: (error) => {
      alert("Error while creating test" + JSON.stringify(error));
    },
  });

  const { mutate: submit, isPending: isSubmitting } = useMutation({
    mutationFn: (formData: ISubmitAnswerData) =>
      submitAnswer(test.id, question?.id!, formData),
    onSuccess: (res) => {
      if (res.data) {
        if (res.data.shouldEndTest) {
          alert("Test Ended!");
          router.push(`/`);
        } else {
          setQuestion(res.data.nextQuestion);
        }
        reset({ answer: "" });
      }
    },
    onError: (error) => {
      alert("Error while creating test" + JSON.stringify(error));
    },
  });

  return (
    <>
      <Head>
        <title>Test | {test.title}</title>
        <meta name="description" content="Projects Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header title={test.title} />
          <div className="p-8 bg-white rounded-lg shadow-lg mt-5">
            <p className="mb-2">
              <strong>Description: </strong>
              {test.description}
            </p>
            {!hasStarted ? (
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    mutate(test.id);
                  }}
                  disabled={isPending}
                  className="float-right block px-3 py-2 rounded bg-gray-700 text-white"
                >
                  Start Test
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <form
                  onSubmit={handleSubmit((formData) =>
                    submit(formData as ISubmitAnswerData)
                  )}
                >
                  <h4>
                    <strong>Question: </strong> {question?.question}
                  </h4>
                  <h6>
                    <strong>Difficulty:</strong> {question?.difficulty}
                  </h6>
                  <div className="p-4 rounded-lg">
                    <h5 className="text-md font-semibold text-gray-800 mb-3">
                      <strong>Options:</strong>
                    </h5>
                    {question?.options?.map((option, index) => (
                      <RadioWrapper
                        key={`${option}-${index}`}
                        className="space-y-2 mb-2"
                      >
                        <RadioWrapper.Label className="inline-flex items-center">
                          <RadioButton
                            className="form-radio h-3 w-3 text-blue-600 rounded border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            name="answer"
                            control={control}
                            value={option}
                          />
                          <span className="ml-2 text-gray-700">{option}</span>
                        </RadioWrapper.Label>
                      </RadioWrapper>
                    ))}
                    {errors.answer && errors.answer.message ? (
                      <InputWrapper.Error
                        message={errors.answer?.message.toString()}
                      />
                    ) : null}
                  </div>
                  <Button
                    disabled={isSubmitting}
                    className="mt-4 block px-3 py-2 rounded bg-gray-700 text-white"
                  >
                    Submit Answer
                  </Button>
                </form>
              </div>
            )}
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
        test: test.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        test: {},
      },
    };
  }
};
