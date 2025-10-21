import {
  IconProfileLastActive, IconProfileStar,
  IconProfileCurrentCasesDate,
  IconProfileGender,
  IconProfileLocation,
  IconProfileLanguage,
  IconProfileRisingStar,
  IconStar,
  IconHalfStar,
  IconUneStar
} from "@/assets/icons";
import dayjs from "dayjs";

import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/authService";
import type { User } from "@/types/auth";
import { motion } from "framer-motion";
import SidebarInfo from "@/components/sections/lawyer/profileLawyer/aboutus/sidebarInfo";
import "./stayle.scss";


export default function ProfileLawyerAbout() {
  const { data, isLoading, isError } = useQuery<{ data: User }>({
    queryKey: ["currentUser"],
    queryFn: AuthService.getCurrentUser,
  });

  if (isLoading) {
    return (
      <div className="p-[30px] bg-white rounded-2xl w-full flex flex-col gap-6">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-full h-10 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-xl"
          />
        ))}
      </div>
    );
  }

  // 🛑 في حالة الخطأ
  if (isError || !data) {
    return (
      <div className="p-8 text-red-500">
        Failed to load profile.
      </div>
    );
  }

  const user = data.data;

  console.log("user>>", user);

  return (
    <div className="w-full flex gap-3 h-full">
      {/* Sidebar */}
      <div className="w-120 h-full bg-white rounded-xl p-[30px] flex flex-col items-center gap-[80px]">
        <div className="w-40 inline-flex flex-col justify-start items-center gap-[5px]">
          <img
            className="w-36 h-36 rounded-full"
            src="https://placehold.co/150x150"
          />
          <div className="self-stretch text-center justify-center text-neutral-800 text-xl font-bold font-['Manrope']">
            {user?.fullName}
          </div>
          <div className="inline-flex justify-start items-center gap-1">
            <IconProfileStar />
            <div className="w-14 h-4 justify-center">
              <span className="text-slate-600 text-sm font-bold font-['Manrope']">
                5.0
              </span>
              <span className="text-slate-600 text-sm font-medium font-['Manrope']">
                (129)
              </span>
            </div>
          </div>
        </div>
        {/* Info Section */}
        <div className="w-full inline-flex flex-col justify-start items-start gap-[20px]">

          <SidebarInfo
            icon={<IconProfileLastActive />}
            label="Last active"
            value={`${dayjs(user.updatedAt).fromNow()} (Active User)`}
          />

          <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-slate-200 w-full" />

          <SidebarInfo
            icon={<IconProfileCurrentCasesDate />}
            label="Current Cases"
            value="3 Cases in Queue"
          />

          <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-slate-200 w-full" />

          <SidebarInfo
            icon={<IconProfileGender />}
            label="Gender"
            value={user?.gender || "—"}
          />

          <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-slate-200 w-full" />

          <SidebarInfo
            icon={<IconProfileLocation />}
            label="Location"
            value={`${user?.lawyerOrganization?.city || "—"}, ${user?.lawyerOrganization?.country || ""}`}
          />

          <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-slate-200 w-full" />

          <SidebarInfo
            icon={<IconProfileLanguage />}
            label="Language"
            value={user.languages?.length ? user.languages.map((lang) => lang.name).join(", ") : "—"}
          />
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 h-full bg-white rounded-xl p-[25px]">
        <div className="w-full inline-flex flex-col justify-start items-start gap-7">
          {/* About me */}
          <div className="w-full flex flex-col justify-start items-start gap-1.5">
            <div className="self-stretch justify-center text-neutral-800 text-xl font-bold font-['Manrope']">
              About me
            </div>
            <div className="w-full justify-center">
              <span className="text-neutral-800 text-base font-medium font-['Manrope']">
                Hi, I am Mark, and I have been working as a lawyer for the past 10
              </span>
              <span className="text-neutral-800 text-base font-bold font-['Manrope']">
                see more
              </span>
            </div>
          </div>

          {/* Specialized in */}
          <div className="w-full flex flex-col justify-start items-start gap-3.5">
            <div className="self-stretch justify-center text-neutral-800 text-xl font-['Manrope']">
              Specialized in
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              {["Divorce", "Child Custody", "DUI/DWI", "White Collar Crime", "Homicide"].map(
                (item) => (
                  <div
                    key={item}
                    className="px-3.5 py-2 bg-slate-100 rounded-2xl flex justify-center items-center gap-2.5"
                  >
                    <div className="justify-center text-neutral-800 text-base font-medium font-['Manrope']">
                      {item}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Certification */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <div className="self-stretch justify-center text-neutral-800 text-xl font-bold font-['Manrope']">
              Certification
            </div>
            <div className="flex flex-col justify-start items-start gap-3.5">
              {[
                "Rising Star – Super Lawyers®",
                "Legal Ethics Conduct Certificate",
              ].map((cert) => (
                <div
                  key={cert}
                  className="w-full flex justify-start items-start gap-2"
                >
                  <IconProfileRisingStar />
                  <div className="flex flex-col justify-start items-start">
                    <div className="justify-center text-neutral-800 text-base font-semibold font-['Manrope'] leading-snug">
                      {cert}
                    </div>
                    <div className="self-stretch justify-start text-slate-400 text-xs font-medium font-['Manrope'] leading-tight">
                      August 2023
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
            <div className="self-stretch justify-center text-neutral-800 text-xl font-bold font-['Manrope']">
              Reviews
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
              <div className="w-full h-32 rounded-2xl border border-slate-300 px-[25px] py-[12px]">
                <div className="w-full flex flex-col justify-start items-start gap-2.5">
                  <div className="inline-flex justify-start items-center gap-2">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://placehold.co/42x42"
                    />
                    <div className="w-28 inline-flex flex-col justify-start items-start gap-0.5">
                      <div className="inline-flex justify-start items-center gap-[3px]">
                        <div className="justify-center text-neutral-800 text-sm font-semibold font-['Manrope']">
                          Julio Pope
                        </div>
                        <div className="justify-center text-slate-600 text-xs font-normal font-['Manrope']">
                          13h
                        </div>
                      </div>
                      <div className="w-32 h-6 px-3 py-2.5  rounded-md inline-flex justify-start items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1">
                          <IconStar />
                          <IconStar />
                          <IconStar />
                          <IconHalfStar />
                          <IconUneStar />

                        </div>
                        <div className="justify-start text-neutral-800 text-sm font-semibold font-['Manrope'] leading-tight">5.0</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full justify-center text-slate-600 text-base font-medium font-['Manrope']">
                    It was a great experience with Dr. Mathew Ju. He examines my
                    Leg deeply and within 2 weeks I can be able to walk again.
                    Thank you
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

