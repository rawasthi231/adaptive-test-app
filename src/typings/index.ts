export interface IQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITest {
  id: string;
  title: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
    difficulty: number;
  }[];
  url: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 1 | 2;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserTest {
  id: string;
  user_id: string;
  test_id: string;
  score: number;
  completed: boolean;
  currentDifficulty: number;
  consecutiveCorrect: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserTestSubmission {
  id: string;
  user_test_id: string;
  question_id: string;
  answer: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Option = { label: string; value: string | number };

export interface ApiResponse<T> {
  message: string;
  data: T;
  nextCursor?: number;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignupData extends ILoginData {
  name: string;
}

export type Question = IQuestion & { selected: string };

export type FormFields = {
  title: string;
  description: string;
  questions: Question[] | string[];
};

export interface TestEditorProps {
  title: string;
  questions?: Partial<IQuestion[]>;
  data?: Partial<ITest>;
  isPending: boolean;
  onSave: (data: Partial<FormFields>) => void;
  fetchMoreQuestions: () => void;
  hasMoreQuestions: boolean;
}

export interface ITestData extends Omit<ITest, "questions"> {
  question: Omit<IQuestion, "answer">;
}

export interface INextQuestion {
  shouldEndTest: boolean;
  nextQuestion: Omit<IQuestion, "answer">;
}

export interface ISubmitAnswerData {
  answer: string;
}

export interface IUserTests extends IUserTest {
  test: ITest;
  questions: IQuestion[];
  submittedAnswers: IUserTestSubmission[];
  correctCount: number;
  wrongCount: number;
}
