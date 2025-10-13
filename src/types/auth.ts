export type UserStatus =
  | "ACTIVE"
  | "PENDING"
  | "Verified"
  | "UNDER_REVIEW"
  | "COMPLETED"
  | "SUSPENDED"
  | "REJECTED";
export interface User {
  id: string;
  isActive: boolean;
  email?: string | null;
  phone?: string | null;
  role: "client" | "lawyer";
  createdAt: string;
  updatedAt: string;
  status: UserStatus;
  profileImage?: string | null;
  fullName: string;
  gender: "male";
  languages: string[];
}
export interface AuthResponse {
  success: boolean;
  message: string;
  nextStep?: string;
}

export interface LoginResponse extends AuthResponse {
  data: {
    accessToken: string;
    user: User;
  };
}
export interface RegisterResponse extends AuthResponse {
  data: {
    userId: string;
  };
}
export interface VerifyOtpResponse extends AuthResponse {
  data: {
    temporaryToken?: string;
    resetPasswordToken?: string;
  };
}

export interface AuthTokens {
  accessToken: string;
  // refreshToken: string;
  // expiresIn: number;
}

export interface RegisterCredentials {
  email?: string;
  phone?: string;
}
export interface VerifyOtpCredentials {
  emailOrPhone: string;
  otp: string;
  type: "SIGNUP" | "PASSWORD_RESET" | "LOGIN_2FA";
}
export interface SetPasswordCredentials {
  setPasswordToken: string;
  password: string;
}

export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

export interface ForgotPasswordCredentials {
  emailOrPhone: string;
}

export interface ResetPasswordCredentials {
  resetPasswordToken: string;
  newPassword: string;
}

export type CompleteClientProfilePayload = {
  role: "client";
  fullName: string;
  gender: "male" | "female";
  languages?: string[];
  profileImage?: string;
};

export type AvailabilitySlot = {
  from: string;
  to: string;
};

export type AvailabilityItem = {
  day: string;
  slots: AvailabilitySlot[];
};

export type AchievementPayload = {
  name: string;
  by: string;
  year: number;
};

export type CompleteLawyerProfilePayload = {
  role: "lawyer";
  fullName: string;
  gender: "male" | "female";
  languages?: string[];
  profileImage?: string;
  rateCurrency: string;
  country: string;
  city?: string;
  address?: string;
  postalCode?: string;
  location?: string;
  availabilityTimeZone: string;
  consultationRate: number;
  experience: number;
  specializations: Record<string, string[]>;
  availability?: AvailabilityItem[];

  // idCardFront?: string;
  // idCardBack?: string;
  // licenseCertificate?: string;

  agreedToTerms: boolean;
  achievements?: AchievementPayload[];
};

export interface LawyerFromAPI {
  id: string;
  fullName: string;
  email: string;
  profileImage: string | null;
  lawyerProfile: {
    country: string;
    licenseNumber: string | null;
    licenseState: string | null;
  };
  practiceTypeTranslated: {
    title: string;
    description: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface LawyerCardData {
  name: string;
  location: string;
  rate: string;
  ratings: string;
  experience: string;
  avatar?: string;
}

export type CompleteProfilePayload =
  | CompleteClientProfilePayload
  | CompleteLawyerProfilePayload;

export type FileUploadType =
  | "idCardFront"
  | "idCardBack"
  | "licenseCertificate"
  | "companyLicense";
