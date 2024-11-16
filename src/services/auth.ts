import { post } from ".";
import { ILoginData, ISignupData, IUser } from "@/typings";

export const login = (data: ILoginData) =>
  post<ILoginData, IUser>("/auth/login", data);

export const signup = (data: ISignupData) =>
  post<ISignupData & { role: 1 | 2 }, IUser>("/auth/signup", {
    ...data,
    role: 2,
  });

export const logout = () => post("/auth/logout");
