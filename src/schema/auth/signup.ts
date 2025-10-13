import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const registerEmailSchema = z.object({
  email: z.string().trim().min(1, "Required").email(),
  isAccepted: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const registerPhoneSchema = z.object({
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  isAccepted: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const registerPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, "Required")
      .max(50, "Must be at most 50 characters")
      .refine((value) => value.length >= 8, {
        message: "Password must be at least 8 characters long",
      })
      .refine(
        (value) => {
          const hasUpper = /[A-Z]/.test(value);
          const hasLower = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecial = /[^A-Za-z0-9]/.test(value);
          return hasUpper && hasLower && hasNumber && hasSpecial;
        },
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(1, "Required")
      .max(50, "Must be at most 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type RegisterPasswordFormData = z.infer<typeof registerPasswordSchema>;

export type RegisterPhoneFormData = z.infer<typeof registerPhoneSchema>;

export type RegisterEmailFormData = z.infer<typeof registerEmailSchema>;
