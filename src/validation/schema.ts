import * as Yup from "yup";

export const questionSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
  difficulty: Yup.number().required("Difficulty is required"),
});

export const testSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        selected: Yup.string(),
        id: Yup.string(),
        question: Yup.string().required("Question is required"),
        options: Yup.array().of(Yup.string()),
        answer: Yup.string(),
        difficulty: Yup.number(),
      })
    )
    .min(1, "At least 1 question is required"),
});

const email = Yup.string()
  .trim()
  .matches(
    /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/,
    "Email should be a valid email address"
  )
  .required("Email is required");

const password = Yup.string()
  .trim()
  .matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/,
    "Password should be 8-16 characters long and should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
  )
  .required("Password is required");

export const loginSchema = Yup.object({
  email,
  password,
});

export const signupSchema = Yup.object({
  email,
  password,
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name is too long")
    .min(3, "Name is too short"),
});

export const answerSubmitSchema = Yup.object({
  answer: Yup.string().required("Please select an answer"),
});
