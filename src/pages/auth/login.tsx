import Link from "next/link";

import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/formElements/Button";
import Textbox from "@/components/formElements/Textbox";
import InputWrapper from "@/components/formElements/InputWrapper";

import { loginSchema } from "@/validation/schema";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/services/auth";

export default function Login() {
  const router = useRouter();

  const { loginUser } = useAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      loginUser(data);
      router.push("/");
    },
    onError: (error) => {
      alert("Error while updating Question" + JSON.stringify(error));
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit((data) => mutate(data))}>
          <InputWrapper className="mb-2">
            <InputWrapper.Label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </InputWrapper.Label>
            <Textbox
              control={control}
              id="email"
              name="email"
              className="w-full h-10 p-1 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
              autoComplete="false"
            />
            {errors.email && errors.email.message ? (
              <InputWrapper.Error message={errors.email?.message.toString()} />
            ) : null}
          </InputWrapper>
          <InputWrapper className="mb-2">
            <InputWrapper.Label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </InputWrapper.Label>
            <Textbox
              control={control}
              type="password"
              id="password"
              name="password"
              className="w-full h-10 p-1 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.password && errors.password.message ? (
              <InputWrapper.Error
                message={errors.password?.message.toString()}
              />
            ) : null}
          </InputWrapper>
          <Button
            disabled={isPending}
            className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none"
          >
            Login
          </Button>
        </form>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-500">
            {" "}
            <u>Register </u>
          </Link>
        </div>
      </main>
    </div>
  );
}
