"use client";

import dynamic from "next/dynamic";

import { HTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import Loader from "@components/loader";

interface TextareaProps<T extends FieldValues>
  extends HTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>;
  control: Control<T>;
}

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => <div className="mb-3"><Loader /></div> ,
});

export default function Textarea<T extends FieldValues>({
  control,
  name,
  ...props
}: TextareaProps<T>) {
  return (
    <Controller
      control={control}
      render={({ field }) => (
        <Editor value={field.value} onChange={field.onChange} />
      )}
      name={name}
      defaultValue={"" as T[typeof name]}
    />
  );
}
