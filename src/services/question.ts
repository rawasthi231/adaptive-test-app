import { del, get, post, put } from ".";
import { IQuestion } from "@/typings";

export const getAllQuestions = ({ pageParam }: { pageParam: number }) =>
  get<{ skip: number }, IQuestion[]>(`/questions`, {
    skip: pageParam,
  });

export const createQuestion = (data: Partial<IQuestion>) =>
  post<Partial<IQuestion>, IQuestion>("/questions", data);

export const getQuestion = (id: string) =>
  get<undefined, IQuestion>(`/questions/${id}`);

export const editQuestion = (id: string, data: Partial<IQuestion>) =>
  put<Partial<IQuestion>, IQuestion>(`/questions/${id}`, data);

export const deleteQuestion = (id: string) =>
  del<undefined, IQuestion>(`/questions/${id}`);
