/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useContactSupportMutation } from "@/hooks/useSettingsService";
import { useTranslation } from "react-i18next";

export default function ProfileLawyerContactSupport() {
  const [attachments, setAttachments] = useState<File[]>([]);
  const { t } = useTranslation("settings");

  const mutation = useContactSupportMutation({
    onSuccess: () => {
      toast.custom(
        () => (
          <div className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-3 rounded-xl shadow-lg animate-slide-up">
            <CheckCircle size={22} className="text-white" />
            <div className="flex flex-col">
              <span className="font-bold text-sm">{t("ContactSupport.successTitle")}</span>
              <span className="text-xs opacity-90">{t("ContactSupport.successDescription")}</span>
            </div>
          </div>
        ),
        { position: "bottom-center", duration: 3000 }
      );
      setAttachments([]);
    },
    onError: () => {
      toast.custom(
        () => (
          <div className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-3 rounded-xl shadow-lg animate-slide-up">
            <AlertCircle size={22} className="text-white" />
            <div className="flex flex-col">
              <span className="font-bold text-sm">{t("ContactSupport.errorTitle")}</span>
              <span className="text-xs opacity-90">{t("ContactSupport.errorDescription")}</span>
            </div>
          </div>
        ),
        { position: "bottom-center", duration: 3000 }
      );
    },
  });

  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .min(10, t("ContactSupport.validationMin"))
      .required(t("ContactSupport.validationRequired")),
  });

  const handleSubmit = (values: { message: string }, { resetForm }: any) => {
    const formData = new FormData();
    formData.append("message", values.message);
    attachments.forEach((file) => formData.append("attachment", file));
    mutation.mutate(formData);
    resetForm();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...filesArray]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full min-h-[753px] bg-white rounded-2xl overflow-hidden p-[30px] flex flex-col gap-5 pt-[40px] relative">
      <Toaster position="bottom-center" />

      {/* العنوان */}
      <div className="w-full inline-flex flex-col justify-start items-start">
        <div className="text-neutral-800 text-2xl font-bold">
          {t("ContactSupport.title")}
        </div>
        <div className="text-slate-600 text-lg font-medium leading-snug">
          {t("ContactSupport.subtitle")}
        </div>
      </div>

      <Formik
        initialValues={{ message: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-5">
            <div>
              <Field
                as="textarea"
                name="message"
                placeholder={t("ContactSupport.placeholderMessage")}
                className={`w-full h-56 bg-white rounded-xl border text-slate-600 text-lg font-medium p-[14px] resize-none focus:outline-none transition
                  ${
                    errors.message && touched.message
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/40"
                      : "border-slate-300 focus:ring-2 focus:border-slate-400/30"
                  }`}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-600 mt-1 text-sm"
              />
            </div>

            <label className="w-full h-16 bg-slate-100 rounded-xl border border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition">
              <span className="text-slate-600 text-base font-bold">
                {t("ContactSupport.addScreenshot")}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border border-slate-300 rounded-lg overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="attachment"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-center w-full mt-6">
              <button
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                className={`w-80 h-14 rounded-[32px] shadow-md text-white text-base font-bold transition 
                  ${
                    isSubmitting || mutation.isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-900 hover:bg-red-800"
                  }`}
              >
                {mutation.isPending
                  ? t("ContactSupport.sendingButton")
                  : t("ContactSupport.sendButton")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
