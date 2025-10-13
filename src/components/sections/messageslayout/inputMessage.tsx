/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  IconPlus, IconOfferCricale,
  IconFileCricale,
  IconImageCricale,
  IconLocationCricale
} from "@/assets/icons/index";

const InputMessage = ({ sendMessage, setInput, input }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-3 border-t border-slate-200 flex items-center gap-2 bg-white relative">
      {/* زرار الـ + */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition"
        >
          <IconPlus />
        </button>

        {/* الـ Dropdown */}
        {open && (
          <div className="absolute bottom-12 left-0 bg-white shadow-lg rounded-xl border border-slate-200 p-2 w-55 flex flex-col gap-2 z-10">
            <button
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition text-sm text-slate-700 cursor-pointer"
              onClick={() => {
                // Placeholder for Offer
                setOpen(false);
              }}
            >
              <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center">
                <IconOfferCricale />
              </div>
              <div className="justify-center text-slate-600 text-sm font-semibold font-['Manrope']">
                Create Offer
              </div>
            </button>

            {/* File Upload */}
            <button
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition text-sm text-slate-700 cursor-pointer"
              onClick={() => {
                document.getElementById("fileInput")?.click();
              }}
            >
              <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center">
                <IconFileCricale />
              </div>
              <div className="justify-center text-slate-600 text-sm font-semibold font-['Manrope']">
                File
              </div>
            </button>
            <input
              type="file"
              id="fileInput"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  sendMessage({ file: e.target.files[0] });
                  setOpen(false);
                }
              }}
            />

            <button
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition text-sm text-slate-700 cursor-pointer"
              onClick={() => {
                document.getElementById("imageInput")?.click();
              }}
            >
              <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center">
                <IconImageCricale />
              </div>
              <div className="justify-center text-slate-600 text-sm font-semibold font-['Manrope']">
                Photos & videos
              </div>
            </button>
            <input
              type="file"
              id="imageInput"
              accept="image/*,video/*"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  sendMessage({ file: e.target.files[0] });
                  setOpen(false);
                }
              }}
            />
            <button
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition text-sm text-slate-700 cursor-pointer"
              onClick={() => {
                if (!navigator.geolocation) {
                  alert("❌ المتصفح لا يدعم مشاركة الموقع");
                  return;
                }
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    sendMessage({
                      location: { latitude, longitude, url: mapUrl },
                    });
                    setOpen(false);
                  },
                  (err) => {
                    console.error("❌ Error getting location:", err);
                    alert("❌ تعذر الحصول على الموقع");
                  }
                );
              }}
            >
              <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center">
                <IconLocationCricale />
              </div>
              <div className="justify-center text-slate-600 text-sm font-semibold font-['Manrope']">
                Location
              </div>
            </button>

          </div>
        )}
      </div>

      {/* الـ Input */}
      <input
        type="text"
        placeholder="Type a comment"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="flex-1 border border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  );
};

export default InputMessage;
