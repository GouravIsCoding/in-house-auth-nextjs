import z from "zod";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

export const signupSchema = z.object({
  firstname: z.string().min(1, { message: "firstname cannot be blank" }),
  lastname: z.string().min(1, { message: "lastname cannot be blank" }),
  email: z.string().email({ message: "invalid email" }),
  password: z.string().regex(passwordRegex, {
    message:
      "password must contain atleast 6 characters and be a mix of alphabets and numbers",
  }),
});

export type signupType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(6, { message: "password must contain atleast 6 characters" }),
});

export type signinType = z.infer<typeof signinSchema>;
