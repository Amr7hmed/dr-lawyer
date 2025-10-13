import { z } from "zod";

// Allowed MIME types
export const allowedMimeTypes = [
  "application/pdf",
  "text/plain",
  "image/jpeg",
  "image/png",
  "video/mp4",
];

export const caseSchema = z
  .object({
    title: z.string().min(1, "required"),
    description: z.string().min(1, "required"),
    caseType: z.string().optional(),
    practiceType: z.string().min(1, "required"),
    documentType: z.string().optional(),
    serviceNeeded: z.string().optional(),
    sourcelangauge: z.string().optional(),
    targetlangauge: z.string().optional(),
    areaOfExpert: z.string().optional(),
    attachments: z
      .array(z.instanceof(File))
      .max(8, "You can upload a maximum of 8 files.")
      .refine(
        (files) => files.every((file) => file.size <= 5 * 1024 * 1024), // 5MB
        "Each file must be 5MB or less.",
      )
      .refine(
        (files) => files.every((file) => allowedMimeTypes.includes(file.type)),
        "One or more files have an unsupported format, only Images, Videos, Documents, and PDFs are allowed.",
      )
      .optional(),
  })

export type CaseFormValues = z.infer<typeof caseSchema>;
