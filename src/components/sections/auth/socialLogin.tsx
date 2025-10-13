import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const SocialLogin = () => {
  const { t } = useTranslation("login");
  return (
    <div className="flex flex-col gap-6">
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2 font-light">
          {t("social.or")}
        </span>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
        <div className="w-full">
          <Button
            variant="outline"
            className="w-full rounded-4xl rtl:flex-row-reverse"
            size="lg"
          >
            <svg
              className="mt-0.5 h-4! w-6!"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272v95.3h146.9c-6.3 33.6-25 62.1-53.4 81.1v67h86.2c50.5-46.5 81.8-115.1 81.8-192z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c72.6 0 133.6-24.1 178.1-65.6l-86.2-67c-24.3 16.3-55.2 26-91.9 26-70.7 0-130.6-47.7-152-111.4h-90.4v69.9c44.9 88.2 136.2 148.1 242.4 148.1z"
                fill="#34A853"
              />
              <path
                d="M120 326.3c-10.5-31.4-10.5-65.5 0-96.9v-69.9H29.6C-10 222.3-10 322 29.6 387.2l90.4-60.9z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c39.5-.6 77.2 13.5 106.4 39.8l79.6-79.6C419.6 24.6 347.8-1.4 272 0 165.8 0 74.5 59.9 29.6 148.1l90.4 69.9C141.4 155.4 201.3 107.7 272 107.7z"
                fill="#EA4335"
              />
            </svg>
            {t("social.google")}
          </Button>
        </div>
        <div className="w-full">
          <Button
            variant="outline"
            className="w-full rounded-4xl rtl:flex-row-reverse"
            size="lg"
            type="button"
          >
            <svg
              className="h-5! w-5!"
              viewBox="0 0 814 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M749 748c-13 31-28 58-45 81-23 30-42 51-58 64-23 17-47 25-72 25-18 0-41-5-67-15-26-10-49-15-69-15-22 0-46 5-72 15-27 10-48 15-63 15-26 0-51-8-75-25-20-14-42-36-66-65-28-34-51-75-70-124-20-55-30-109-30-160 0-59 13-110 40-153 20-32 46-57 77-73 32-17 66-25 102-25 20 0 46 6 78 18 31 12 52 18 62 18 8 0 32-7 72-20 39-13 72-18 97-15 71 6 125 34 162 84-64 39-96 93-96 161 0 54 20 100 59 137-12 34-25 63-38 88zM569 126c0 44-17 84-50 117-39 36-85 56-136 53a147 147 0 0 1-1-18c0-42 19-83 52-114 18-17 39-30 64-39 25-9 47-12 68-9 2 3 3 6 3 10z"
                fill="#000"
              />
            </svg>
            {t("social.apple")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
