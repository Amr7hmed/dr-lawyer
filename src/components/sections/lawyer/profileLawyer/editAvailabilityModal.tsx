import { useState } from "react";
import {
  IconCloseModule,
  IconBackModule,
} from "@/assets/icons";

type DaySchedule = {
  day: string;
  enabled: boolean;
  from: string;
  to: string;
};

export default function EditAvailabilityModal({ onClose }: { onClose: () => void }) {
  const [timezone, setTimezone] = useState("UTC+04:00");

  const timezones = ["UTC+00:00", "UTC+02:00", "UTC+03:00", "UTC+04:00"];
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: "Monday", enabled: true, from: "09:00", to: "17:30" },
    { day: "Tuesday", enabled: true, from: "09:00", to: "17:30" },
    { day: "Wednesday", enabled: true, from: "09:00", to: "17:30" },
    { day: "Thursday", enabled: true, from: "09:00", to: "17:30" },
    { day: "Friday", enabled: true, from: "09:00", to: "17:30" },
    { day: "Saturday", enabled: false, from: "09:00", to: "17:30" },
    { day: "Sunday", enabled: false, from: "09:00", to: "17:30" },
  ]);

  const toggleDay = (index: number) => {
    setSchedule((prev) =>
      prev.map((d, i) => (i === index ? { ...d, enabled: !d.enabled } : d))
    );
  };

  const updateTime = (index: number, field: "from" | "to", value: string) => {
    setSchedule((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative flex flex-col gap-6">
        {/* Header */}
        <div className="w-full flex justify-between items-center flex-row-reverse">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <IconCloseModule />
          </button>
          <div className="text-center justify-center text-neutral-800 text-xl font-bold font-['Manrope']">
            Edit Availability
          </div>
          <button onClick={onClose} className="w-6 h-6 cursor-pointer">
            <IconBackModule />
          </button>
        </div>

        {/* Timezone Dropdown */}
        <div className="w-full h-14 relative">
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full h-14 bg-white rounded-3xl shadow-[18.58px_18.58px_37.17px_0px_rgba(211,209,216,0.25)]
              border border-slate-300 px-4 text-neutral-800 text-base font-semibold font-['Manrope']
              focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="flex flex-col gap-4">
          {schedule.map((item, index) => (
            <div
              key={item.day}
              className="flex items-center gap-4 justify-between"
            >
              {/* Toggle & Day */}
              <div className="flex items-center gap-3 w-1/4">
                <button
                  onClick={() => toggleDay(index)}
                  className={`w-10 h-6 rounded-full transition ${
                    item.enabled ? "bg-[#7D1D26]" : "bg-gray-300"
                  } relative`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition ${
                      item.enabled ? "translate-x-4" : ""
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${
                    item.enabled ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {item.day}
                </span>
              </div>

              {/* From Time */}
              <input
                type="time"
                value={item.from}
                disabled={!item.enabled}
                onChange={(e) => updateTime(index, "from", e.target.value)}
                className={`border rounded-full px-3 py-2 w-28 text-center text-sm ${
                  item.enabled
                    ? "border-gray-300 text-gray-800"
                    : "border-gray-200 bg-gray-100 text-gray-400"
                }`}
              />

              {/* To Time */}
              <input
                type="time"
                value={item.to}
                disabled={!item.enabled}
                onChange={(e) => updateTime(index, "to", e.target.value)}
                className={`border rounded-full px-3 py-2 w-28 text-center text-sm ${
                  item.enabled
                    ? "border-gray-300 text-gray-800"
                    : "border-gray-200 bg-gray-100 text-gray-400"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button className="bg-[#7D1D26] text-white rounded-full py-3 font-semibold hover:bg-[#65171e]">
          Save
        </button>
      </div>
    </div>
  );
}
