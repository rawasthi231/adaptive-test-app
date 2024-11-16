import * as Yup from "yup";

export const questionSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
  difficulty: Yup.number().required("Difficulty is required"),
});
