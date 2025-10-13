import type {
  DaysEnum,
  ProfileSetupFormData,
} from "@/schema/auth/profileSetupSchema";
import type { CompleteProfilePayload } from "@/types/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utils/fileToBase64.ts
export const fileToBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string); // data URL
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function transformProfilePayload(
  values: ProfileSetupFormData,
): CompleteProfilePayload {
  if (values.role === "client") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { profileImage, ...rest } = values;
    return rest;
  }

  const {
    experience,
    availability,
    achievements,

    consultationRate,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    countryCode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idCardFront,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idCardBack,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    licenseCertificate,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    profileImage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    companyCertificate,
    ...rest
  } = values;

  const transformedAvailability = {
    availability: Object.entries(availability.days)
      .filter(([, val]) => val.enabled && val.from && val.to)
      .map(([day, val]) => ({
        day: day as z.infer<typeof DaysEnum>,
        slots: [{ from: val.from!, to: val.to! }],
      })),
  };

  return {
    ...rest,
    experience: Number(experience),
    consultationRate: Number(consultationRate),
    achievements: achievements.isHave
      ? (achievements.details?.map((ach) => ({
          ...ach,
          year: Number(ach.year),
        })) ?? [])
      : [],
    availability: transformedAvailability.availability,
  };
}
