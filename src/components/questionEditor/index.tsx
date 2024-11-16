import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { IQuestion, Option } from "@/typings";

import InputWrapper from "@/components/formElements/InputWrapper";
import Textarea from "@/components/formElements/Textarea";
import Button from "@/components/formElements/Button";

import { questionSchema } from "@/validation/schema";
import Header from "../header";
import Select from "../formElements/Select";

interface QuestionEditorProps {
  title: string;
  data?: Partial<IQuestion>;
  isPending: boolean;
  onSave: (content: Partial<IQuestion>) => void;
}

const QuestionEditor = ({
  data,
  isPending,
  onSave,
  title,
}: QuestionEditorProps) => {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(questionSchema),
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, []);

  return (
    <div className="flex-1 flex-col">
      <Header title={title} />
      <div className="mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)}>
          <InputWrapper className="mb-2">
            <InputWrapper.Label
              htmlFor="question"
              className="block text-gray-700 font-semibold mb-2"
            >
              Question
            </InputWrapper.Label>
            <Textarea
              control={control}
              id="question"
              name="question"
              className="w-full h-10 p-1 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.question && errors.question.message ? (
              <InputWrapper.Error
                message={errors.question?.message.toString()}
              />
            ) : null}
          </InputWrapper>
          <InputWrapper className="mb-2">
            <InputWrapper.Label
              htmlFor="answer"
              className="block text-gray-700 font-semibold mb-2"
            >
              Answer
            </InputWrapper.Label>
            <Select
              control={control}
              id="answer"
              name="answer"
              className="w-full h-10 p-1 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
              options={
                data?.options?.map((opt) => ({
                  label: opt,
                  value: opt,
                })) as Array<Option>
              }
            />

            {errors.answer && errors.answer.message ? (
              <InputWrapper.Error message={errors.answer?.message.toString()} />
            ) : null}
          </InputWrapper>
          <InputWrapper className="mb-2">
            <InputWrapper.Label
              htmlFor="difficulty"
              className="block text-gray-700 font-semibold mb-2"
            >
              Difficulty
            </InputWrapper.Label>
            <Select
              control={control}
              id="difficulty"
              name="difficulty"
              className="w-full h-10 p-1 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
              options={[...Array(10)].map((_, i) => ({
                label: `${i + 1}`,
                value: i + 1,
              }))}
            />

            {errors.difficulty && errors.difficulty.message ? (
              <InputWrapper.Error
                message={errors.difficulty?.message.toString()}
              />
            ) : null}
          </InputWrapper>

          <Button
            disabled={isPending}
            className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none"
          >
            {data
              ? isPending
                ? "Updating Question..."
                : "Update Question"
              : isPending
              ? "Creating Question..."
              : "Create Question"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuestionEditor;
