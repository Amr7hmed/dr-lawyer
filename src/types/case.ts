/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "./auth";

export type CreateCasePayload = {
  title: string;
  description: string;
  caseType?: string;
  currency?: string;
  budget?: string;
  practiceType: any;
  documentType?: string;
  serviceNeeded?: string;
  sourcelangauge?: string;
  targetlangauge?: string;
  areaOfExpert?:string;
  attachments?: File[];
};

export type CaseStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED" | "ACTIVE" | "CANCELED" | "COMPLETED";

export type CaseFilter = {
  status?: CaseStatus;
  clientId?: string;
  assignedLawyerId?: string;
  caseType?: string;
  mine?: boolean;
};

export type Case = {
  offers: any;
  location: string;
  id: string;
  title: string;
  description: string;
  caseType: string; // extend as needed
  budget?: string;
  attachments?: string[];
  client: User;
  assignedLawyer: null | string;
  clientId: string;
  assignedLawyerId: string | null;
  createdAt: string;
  updatedAt: string;
  status: CaseStatus;
  currency: string;
  caseTypeTranslated: string;
  currencyTranslated: string;
  practiceType: string;
  documentType: string;
  serviceNeeded: string;
  sourceLanguage: string;
  targetLanguage: string;
};

export type CasesCount = {
  ACTIVE: number;
  CANCELED: number;
  COMPLETED: number;
  PENDING: number;
};
