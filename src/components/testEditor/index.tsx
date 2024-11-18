import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";

import { FormFields, Question, TestEditorProps } from "@/typings";

import Header from "@/components/header";
import Options from "@/components/options";
import Button from "@/components/formElements/Button";
import Textarea from "@/components/formElements/Textarea";
import InputWrapper from "@/components/formElements/InputWrapper";
import Checkbox, { CheckboxWrapper } from "@/components/formElements/Checkbox";

import { testSchema } from "@/validation/schema";

const TestEditor = ({
  data,
  isPending,
  onSave,
  questions,
  title,
  fetchMoreQuestions,
  hasMoreQuestions,
}: TestEditorProps) => {
  const [element, setElement] = useState(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(testSchema),
  });

  const { append, fields } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description,
        // questions: data?.questions?.map((question) => ({
        //   id: question,
        //   selected: "true",
        // })),
      });
    }
  }, []);

  useEffect(() => {
    if (questions) {
      questions.map((question) =>
        append({
          id: question?.id,
          question: question?.question as string,
          options: question?.options,
          answer: question?.answer as string,
          difficulty: question?.difficulty as number,
        })
      );
    }
  }, [questions]);

  useEffect(() => {
    if (!element || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio) {
          await fetchMoreQuestions();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [element, fetchMoreQuestions]);

  const handleSave = (data: FormFields) => {
    const payload = {
      ...data,
      questions: (data.questions as Question[]).reduce((acc, question) => {
        if (question.selected === "true") {
          acc.push(question.id);
        }
        return acc;
      }, [] as string[]),
    };
    onSave(payload);
  };

  return (
    <div className="flex-1 flex-col">
      <Header title={title} />
      <div className="mx-auto p-8 bg-white rounded-lg shadow-lg mt-5">
        <form onSubmit={handleSubmit((data) => handleSave(data as FormFields))}>
          <InputWrapper className="mb-2">
            <InputWrapper.Label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </InputWrapper.Label>
            <Textarea
              control={control}
              id="title"
              name="title"
              className="w-full h-10 p-1 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.title && errors.title.message ? (
              <InputWrapper.Error message={errors.title?.message.toString()} />
            ) : null}
          </InputWrapper>
          <InputWrapper className="mb-2">
            <InputWrapper.Label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </InputWrapper.Label>
            <Textarea
              control={control}
              id="description"
              name="description"
              className="w-full h-10 p-1 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.description && errors.description.message ? (
              <InputWrapper.Error
                message={errors.description?.message.toString()}
              />
            ) : null}
          </InputWrapper>

          <div className="h-64 overflow-y-auto p-4">
            {fields.map((question, index) => (
              <CheckboxWrapper
                key={`${question.question}-${index}`}
                className="mb-2"
              >
                <CheckboxWrapper.Label
                  className="inline-flex items-center"
                  htmlFor={`questions.${index}.selected`}
                >
                  <Checkbox
                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    control={control}
                    id={`questions.${index}.selected`}
                    name={`questions.${index}.selected`}
                    value={question.id}
                  />
                  <span className="ml-2 text-gray-700">
                    {question.question}
                  </span>
                </CheckboxWrapper.Label>
                <div className="p-4 rounded-lg shadow-md">
                  <p>
                    <strong>Answer:</strong> {question.answer}
                  </p>
                  <p>
                    <strong>Difficulty:</strong> {question.difficulty}
                  </p>
                </div>
                <Options options={question.options as string[]} />
              </CheckboxWrapper>
            ))}
            {hasMoreQuestions && fields.length ? (
              <div
                ref={
                  setElement as unknown as React.LegacyRef<HTMLParagraphElement>
                }
              >
                Loading...
              </div>
            ) : null}
          </div>

          <Button
            disabled={isPending}
            className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none"
          >
            {data
              ? isPending
                ? "Updating Test..."
                : "Update Test"
              : isPending
              ? "Creating Test..."
              : "Create Test"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TestEditor;
