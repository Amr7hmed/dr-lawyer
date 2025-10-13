/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    IconEditePen, IconClose
} from "@/assets/icons";

export default function ProfileEdit() {

    return (
        <div className="w-full h-full [756px] relative bg-white rounded-2xl overflow-hidden">
            <div className="w-full h-24  bg-red-900 px-[30px] py-[24px] flex items-center justify-between" >
                <div className=" justify-start text-slate-100 text-2xl font-bold font-['Inter'] leading-loose tracking-tight">Edit Profile</div>
                <button type="button" className="w-44 h-14 l bg-white rounded-[32px] 
                shadow-[15px_0px_30px_0px_rgba(70,195,255,0.04)] flex items-center justify-center cursor-pointer hover:bg-[#f1f1f5]">
                    <div className="w-11  text-center justify-center text-neutral-800 text-base font-bold font-['Manrope'] leading-normal">Save</div>
                </button>
            </div>
            <div className="w-full h-24  px-[30px] py-[24px] " >
                <div className="w-full inline-flex justify-between items-start gap-6">
                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                        <div className="self-stretch justify-center text-neutral-800 text-xl font-bold font-['Manrope']">General</div>
                        <div className="self-stretch inline-flex justify-start items-start gap-5">
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2.5">
                                <ProfileEditItem label="Full Name" value="Mark Henry" />
                                <ProfileEditItem label="Date of birth" value="12 July, 1999" />
                                <ProfileEditItem label="Email Address" value="mark_henry12@gmail.com" />
                                <ProfileEditItem label="Experience" value="2019 - 2024 (6 Years)" />
                                <ProfileEditItem label="Gender" value="Male" />
                            </div>
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
                                <ProfileEditItem label="Rate per hour" value="AED 230" />

                                <div className="w-full h-60  bg-white rounded-xl 
                                    shadow-[18.586957931518555px_18.586957931518555px_37.17391586303711px_0px_rgba(211,209,216,0.25)] 
                                    border border-slate-300 p-[14px] pb-[35px] flex flex-col  items-start justify-between" >
                                    <div className="flex flex-col  items-start gap-2">
                                        <div className=" justify-start text-slate-400 text-xs font-medium font-['Manrope'] leading-tight">About me</div>
                                        <div className="w-full  justify-center text-neutral-800 text-base font-medium font-['Manrope'] leading-normal">Hi, I am Mark, and I have been working as a lawyer for the past 10 years and provide high quality services.</div>
                                    </div>
                                    <button type="button" className="cursor-pointer ml-auto">
                                        <IconEditePen />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="inline-flex flex-col justify-start items-start gap-3 w-120">

                        <div className="w-120 h-14  flex items-center justify-between" >
                            <div className="justify-center text-neutral-800 text-xl font-bold font-['Manrope']">Language</div>
                            <div className=" h-7 px-[10px] py-[5px] bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-2.5">
                                <div className="justify-center text-slate-600 text-xs font-semibold font-['Manrope']">Add more</div>
                            </div>
                        </div>

                        <div className="w-120 h-14 bg-white rounded-xl p-[14px]
                            shadow-[18.586957931518555px_18.586957931518555px_37.17391586303711px_0px_rgba(211,209,216,0.25)] 
                            border border-slate-300 flex items-center justify-between" >
                            <div className="justify-center text-slate-900 text-base font-semibold font-['Manrope'] leading-snug">English</div>
                            <IconClose />
                        </div>
                        
                        <div className="w-120 h-14 bg-white rounded-xl p-[14px]
                            shadow-[18.586957931518555px_18.586957931518555px_37.17391586303711px_0px_rgba(211,209,216,0.25)] 
                            border border-slate-300 flex items-center justify-between" >
                            <div className="justify-center text-slate-900 text-base font-semibold font-['Manrope'] leading-snug">French</div>
                            <IconClose />
                        </div>
                        

                        <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-slate-300 my-[35px]"/>

                        <div className="w-120 h-14  flex items-center justify-between" >
                            <div className="justify-center text-neutral-800 text-xl font-bold font-['Manrope']">Certification</div>
                            <div className=" h-7 px-[10px] py-[5px] bg-slate-100 rounded-2xl flex flex-col justify-center items-center gap-2.5">
                                <div className="justify-center text-slate-600 text-xs font-semibold font-['Manrope']">Add more</div>
                            </div>
                        </div>

                        <ProfileEditItemTwo label="August 2023" value="Rising Star – Super Lawyers®"/>

                        <ProfileEditItemTwo label="August 2023" value="Legal Ethics Conduct Certificate"/>
                    </div>

                </div>
            </div>
        </div>
    );
}


const ProfileEditItem = ({ label
    , value }: any) => {
    return (<div className="w-full h-20  bg-white rounded-xl 
                                    shadow-[18.586957931518555px_18.586957931518555px_37.17391586303711px_0px_rgba(211,209,216,0.25)] border border-slate-300 p-[14px]" >

        <div className=" justify-start text-slate-400 text-xs font-medium font-['Manrope'] leading-tight">{label}</div>

        <div className="w-full inline-flex justify-between items-end gap-3">
            <div className="justify-center text-slate-900 text-base font-semibold font-['Manrope'] leading-snug ">{value}</div>
            <button type="button" className="cursor-pointer">
                <IconEditePen />
            </button>

        </div>

    </div>
    )
}


const ProfileEditItemTwo = ({ label
    , value }: any) => {
    return (<div className="w-full h-20  bg-white rounded-xl 
                                    shadow-[18.586957931518555px_18.586957931518555px_37.17391586303711px_0px_rgba(211,209,216,0.25)] border border-slate-300 p-[14px]" >

            <div className="justify-center text-slate-900 text-base font-semibold font-['Manrope'] leading-snug ">{label}</div>

        <div className="w-full inline-flex justify-between items-end gap-3">
        <div className=" justify-start text-slate-400 text-xs font-medium font-['Manrope'] leading-tight">{value}</div>
            <button type="button" className="cursor-pointer">
                <IconEditePen />
            </button>

        </div>

    </div>
    )
}