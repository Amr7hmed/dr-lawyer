import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const ForgotPwSchema = z.object({
  emailOrPhone: z
    .string()
    .trim()
    .min(1, "Required")
    .max(50)
    .refine(
      (value) =>
        z.string().email().safeParse(value).success || isValidPhoneNumber,
      {
        message: "Must be a valid email or phone number",
      },
    ),
});

export type ForgotPwFormData = z.infer<typeof ForgotPwSchema>;
