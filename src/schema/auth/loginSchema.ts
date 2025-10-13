import { z } from "zod";

export const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .trim()
    .min(1, "Required")
    .max(50)
    .refine(
      (value) =>
        z.string().email().safeParse(value).success ||
        /^\+?[0-9]{7,15}$/.test(value),
      {
        message: "Must be a valid email or phone number",
      },
    ),
  password: z
    .string()
    .min(1, "Required")
    .max(50, "Must be at most 50 characters"),
});

export const OTPSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(1, "Required")
    .max(5, "Must be at most 5 characters")
    .refine((data) => data.length === 5, {
      message: "Verification code must be 5 digits",
    }),
});
export type OTPFormData = z.infer<typeof OTPSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
