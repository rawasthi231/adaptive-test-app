import { del, get, post, put } from ".";

import { INextQuestion, ISubmitAnswerData, ITest, ITestData } from "@/typings";

export const getAllTests = ({ pageParam }: { pageParam: number }) =>
  get<{ skip: number }, ITest[]>(`/tests`, {
    skip: pageParam,
  });

export const getTest = (id: string) => get<undefined, ITest>(`/tests/${id}`);

export const createTest = (data: Partial<ITest>) =>
  post<Partial<ITest>, ITest>("/tests", data);

export const editTest = (id: string, data: Partial<ITest>) =>
  put<Partial<ITest>, ITest>(`/tests/${id}`, data);

export const deleteTest = (id: string) => del<undefined, ITest>(`/tests/${id}`);

export const getTestByUrl = (url: string) =>
  get<undefined, ITest>(`/tests/${url}/url`);

export const getUserTests = () =>
  get<undefined, ITest>(`/tests/user/attempted`);

export const startTest = (testId: string) =>
  post<undefined, ITestData>(`/tests/${testId}/start`);

export const submitAnswer = (
  testId: string,
  questionId: string,
  data: ISubmitAnswerData
) =>
  post<ISubmitAnswerData, INextQuestion>(
    `/tests/${testId}/questions/${questionId}/answer`,
    data
  );
