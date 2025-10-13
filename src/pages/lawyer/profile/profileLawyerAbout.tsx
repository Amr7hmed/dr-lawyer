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

/* eslint-disable no-irregular-whitespace */
export default function ProfileLawyerAbout() {
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
            Mark Henry
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
        {/**
IconProfileLastActive
IconProfileCurrentCasesDate
IconProfileGender
IconProfileLocation
IconProfileLanguage
         
        */}
        {/* Info Section */}
        <div className="w-full inline-flex flex-col justify-start items-start gap-[20px]">
          {/* Last Active */}
          <div className="w-full h-12 relative">
            <IconProfileLastActive />
            <div className="left-[54px] top-[21px] absolute justify-center text-neutral-800 text-base font-semibold font-['Manrope'] leading-snug">
              10 hours ago (Active User)
            </div>
            <div className="left-[54px] top-[3px] absolute justify-start text-slate-400 text-xs font-medium font-['Manrope'] leading-tight">
              Last active
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-slate-200 w-full" />

          {/* Current Cases */}
          <div className="w-full h-12 relative">
            <IconProfileCurrentCasesDate />
            <div className="left-[54px] top-[21px] absolute justify-center text-neutral-800 text-base font-semibold font-['Manrope'] leading-snug">
              3 Cases in Queue
            </div>
            <div className="left-[54px] top-[3px] absolute justify-start text-slate-400 text-xs font-medium font-['Manrope'] leading-tight">
              Current Cases
            </div>
          </div>
          <div className="self-stretch h-0  outline-1 outline-offset-[-0.50px] outline-slate-200 w-full" />

          {/* Gender */}
          <div className="w-full h-12 relative">
            <IconProfileGender />
            <div className="left-[54px] top-[21px] absolute justify-center text-neutral-800 text-base font-semibold font-['Manrope'] leading-snug">
              Male
            </div>
            <div className="left-[54px] top-[3px] absolute justify-start text-slate-400 text-xs font-medium font-['Manrope'] leading-tight">
              Gender
            </div>
          </div>
          <div className="self-stretch h-0  outline-1 outline-offset-[-0.50px] outline-slate-200 w-full" />

          {/* Location */}
          <div className="w-full h-12 relative">
            <IconProfileLocation />
            <div className="left-[54px] top-[22px] absolute justify-center text-neutral-800 text-sm font-semibold font-['Manrope']">
              Abu Dhabi, UAE
            </div>
            <div className="left-[54px] top-[3px] absolute justify-start text-slate-400 text-xs font-medium font-['Manrope'] leading-tight">
              Location
            </div>
          </div>
          <div className="self-stretch h-0  outline-1 outline-offset-[-0.50px] outline-slate-200 w-full" />

          {/* Language */}
          <div className="w-full h-12 relative">
            <IconProfileLanguage />
            <div className="left-[54px] top-[21px] absolute justify-center text-neutral-800 text-base font-semibold font-['Manrope'] leading-snug">
              English, French
            </div>
            <div className="left-[54px] top-[3px] absolute justify-start text-slate-400 text-xs font-medium font-['Manrope'] leading-tight">
              Language
            </div>
          </div>
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

