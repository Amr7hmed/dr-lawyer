import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/hooks/useSettingsService";
import { useTranslation } from "react-i18next";

export default function ProfileLawyerNotificationSettings() {
  const { t } = useTranslation("settings");

  const { data, isLoading } = useGetNotificationSettingsQuery();
  const updateSettings = useUpdateNotificationSettingsMutation();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [settings, setSettings] = useState<Record<string, boolean>>({});

  console.log("raw data>>", data);

  // 🧠 استخراج فقط القيم من نوع Boolean من data.data (أو data مباشرة)
  const booleanSettings = useMemo(() => {
    const payload = data?.data ?? data;
    if (!payload) return {};
    const clean: Record<string, boolean> = {};
    Object.entries(payload).forEach(([key, value]) => {
      if (typeof value === "boolean") clean[key] = value as boolean;
    });
    return clean;
  }, [data]);

  useEffect(() => {
    if (Object.keys(booleanSettings).length > 0) {
      setSettings(booleanSettings);
    }
  }, [booleanSettings]);

  // ⏳ شاشة تحميل أنيقة
  if (isLoading) {
    return (
      <div className="p-[30px] bg-white rounded-2xl w-full flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-full h-14 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-[10px]"
          />
        ))}
      </div>
    );
  }

  // ✅ عند الضغط على toggle
  const handleToggle = (key: string) => {
    let updated = { ...settings, [key]: !settings[key] };

    // 👇 لو ضغط على "all" وتم تفعيله = true → كل المفاتيح تبقى true
    if (key === "all" && !settings[key]) {
      updated = Object.fromEntries(
        Object.keys(settings).map((k) => [k, true])
      ) as Record<string, boolean>;
    }

    setSettings(updated);

    updateSettings.mutate(updated, {
      onSuccess: () => {
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 2000);
      },
    });
  };

  // 🔘 مكوّن السويتش
  const Switch = ({ label, field }: { label: string; field: string }) => (
    <div className="w-full h-14 bg-white rounded-[10px] border border-slate-300 p-[16px] flex items-center justify-between">
      <div className="text-slate-600 text-base font-semibold capitalize">
        {label}
      </div>
      <label className="relative inline-block w-10 h-5">
        <input
          type="checkbox"
          checked={!!settings[field]}
          onChange={() => handleToggle(field)}
          className="opacity-0 w-0 h-0 peer"
        />
        <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] rounded-full transition peer-checked:bg-[#3e0e0e] before:content-[''] before:absolute before:h-[14px] before:w-[14px] before:left-[3px] before:bottom-[3px] before:bg-white before:rounded-full before:transition peer-checked:before:translate-x-5"></span>
      </label>
    </div>
  );

  // 🧱 واجهة الصفحة
  const orderedKeys = [
    "all",
    ...Object.keys(settings).filter((k) => k !== "all"),
  ];

  return (
    <div className="relative w-full h-full bg-white rounded-2xl p-[30px] flex flex-col gap-5 overflow-hidden">
      <div className="text-neutral-800 text-xl font-bold">
        {t("AllowNotifications.title")}
      </div>

      <div className="flex flex-col gap-4">
        {orderedKeys.map((key) => (
          <Switch key={key} label={t(`AllowNotifications.${key}`, key)} field={key} />
        ))}
      </div>

      {/* Snackbar Animation */}
      <AnimatePresence>
        {showSnackbar && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3e0e0e] text-white px-6 py-2 rounded-full shadow-md"
          >
            {t("AllowNotifications.success")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
