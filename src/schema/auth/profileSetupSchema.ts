import { z } from "zod";

const imageSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => file && file.size > 0, "required")
  .refine(
    (file) => file && file.size <= 5 * 1024 * 1024,
    "Image must be less than 5MB",
  )
  .refine((file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    return file && allowedTypes.includes(file.type);
  }, "Invalid file type. Only JPEG, PNG, and WebP are allowed");

const fileSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => file && file.size > 0, "required")
  .refine(
    (file) => file && file.size <= 5 * 1024 * 1024,
    "File must be less than 5MB",
  )
  .refine((file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    return file && allowedTypes.includes(file.type);
  }, "Invalid file type. Only JPEG, PNG, WebP, or PDF are allowed");

/* Year Validation */

const yearField = z
  .string()
  .min(1, "required")
  .min(4, "Invalid year")
  .refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 1900 && num <= new Date().getFullYear();
  }, "Invalid year");

const timeHHmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time");

const optionalTime = timeHHmm.or(z.literal("")).optional();

/* Availability per day */
const dayAvailabilitySchema = z
  .object({
    enabled: z.boolean(),
    from: optionalTime,
    to: optionalTime,
  })
  .superRefine(({ enabled, from, to }, ctx) => {
    if (!enabled) return;

    if (!from) {
      ctx.addIssue({
        path: ["from"],
        message: "required",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!to) {
      ctx.addIssue({
        path: ["to"],
        message: "required",
        code: z.ZodIssueCode.custom,
      });
    }

    if (from && to && from >= to) {
      ctx.addIssue({
        path: ["to"],
        message: "To time must be after From time",
        code: z.ZodIssueCode.custom,
      });
    }
  });

/* Days Enum */
export const DaysEnum = z.enum([
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]);

/* Base Fields */
const baseUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .nonempty("required")
    .transform((val) => val.replace(/[\u200E\u200F\u202A-\u202E]/g, "").trim()),
  gender: z.enum(["male", "female"], {
    message: "required",
  }),
  languages: z.array(z.string()).min(1, "required"),
  profileImage: imageSchema,
});

const singleAchievementSchema = z.object({
  name: z.string().min(1, "required"),
  by: z.string().min(1, "required"),
  year: yearField,
});

const achievementsSchema = z.discriminatedUnion("isHave", [
  z.object({
    isHave: z.literal(false),
    details: z.any().optional(), // No validation when false
  }),
  z.object({
    isHave: z.literal(true),
    details: z.array(singleAchievementSchema).min(1, "required"),
  }),
]);

/* Client Schema */
const clientSchema = z
  .object({
    role: z.literal("client"),
  })
  .merge(baseUserSchema);

/* Lawyer Schema */
const lawyerSchema = z
  .object({
    role: z.literal("lawyer"),
    experience: z
      .string()
      .min(1, "required")
      .refine((val) => Number(val) >= 0, "Invalid number"),

    country: z.string().min(1, "required"),
    city: z.string().min(1, "required"),
    address: z.string().min(1, "required"),
    postalCode: z.string().optional(),
    countryCode: z.string().trim().min(1, "required"),

    consultationRate: z.string().min(1, "required"),
    practiceType: z.string().min(1, "required"),

    // specialization: z.array(z.string()).min(1, "required"),
    specializations: z
      .record(z.string(), z.array(z.string()).min(1))
      .refine((val) => Object.keys(val).length > 0, {
        message: "At least one specialization is required",
      }),
    availabilityTimeZone: z.string().min(1, "required"),
    availability: z
      .object({
        days: z.record(DaysEnum, dayAvailabilitySchema),
      })
      .superRefine((data, ctx) => {
        const hasAtLeastOneEnabled = Object.values(data.days).some(
          (day) => day.enabled,
        );

        if (!hasAtLeastOneEnabled) {
          ctx.addIssue({
            path: ["days"],
            code: z.ZodIssueCode.custom,
            message: "At least one day must be enabled",
          });
        }
      }),
    rateCurrency: z.string().min(1, "required"),
    idCardFront: imageSchema,
    idCardBack: imageSchema,
    licenseCertificate: fileSchema,
    companyCertificate: fileSchema,
    agreedToTerms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),

    achievements: achievementsSchema,
  })
  .merge(baseUserSchema);

/* Final Union Schema */
export const profileSetupFormSchema = z.discriminatedUnion("role", [
  lawyerSchema,
  clientSchema,
]);

export type LawyerData = z.infer<typeof lawyerSchema>;
export type ClientData = z.infer<typeof clientSchema>;

/* Type Inference */
export type ProfileSetupFormData = z.infer<typeof profileSetupFormSchema>;

// Overloads
export function getProfileDefaults(role: "client"): ClientData;
export function getProfileDefaults(role: "lawyer"): LawyerData;

// Implementation
export function getProfileDefaults(
  role: "client" | "lawyer",
): ProfileSetupFormData {
  const base = {
    fullName: "",
    gender: "" as unknown as "male" | "female",
    languages: [],
    profileImage: undefined,
  };

  if (role === "client") {
    return {
      role: "client",
      ...base,
    };
  }

  return {
    role: "lawyer",
    ...base,
    experience: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    countryCode: "",

    consultationRate: "",
    practiceType: "",
    specializations: {},
    availabilityTimeZone:
      Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    availability: {
      days: {
        saturday: { from: "09:00", to: "17:30", enabled: false },
        sunday: { from: "09:00", to: "17:30", enabled: true },
        monday: { from: "09:00", to: "17:30", enabled: true },
        tuesday: { from: "09:00", to: "17:30", enabled: true },
        wednesday: { from: "09:00", to: "17:30", enabled: true },
        thursday: { from: "09:00", to: "17:30", enabled: true },
        friday: { from: "09:00", to: "17:30", enabled: false },
      },
    },
    rateCurrency: "",
    idCardFront: undefined,
    idCardBack: undefined,
    licenseCertificate: undefined,
    companyCertificate: undefined,
    agreedToTerms: false,

    achievements: {
      isHave: true,
      details: [{ by: "", name: "", year: "" }],
    },
  };
}
