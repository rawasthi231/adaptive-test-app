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
  questions: string[];
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

export type Option = { label: string; value: string | number };
