import { useState } from "react";



export default function ProfileLawyerNotificationSettings() {
    const [availability, setAvailability] = useState(true);

    return (
        <div className="w-full h-full relative bg-white rounded-2xl overflow-hidden p-[30px] flex flex-col gap-5">
            <div className="w-56   justify-center text-neutral-800 text-xl font-bold font-['Manrope']">Allow Notifications</div>
            <div className="w-full  inline-flex flex-col justify-start items-start gap-4">
                <div className="w-full h-14 bg-white rounded-[10px] border border-slate-300 p-[16px] flex items-center justify-between" >
                    <div className="justify-center text-slate-600 text-base font-semibold font-['Manrope']">All Notifications</div>

                    <label className="relative inline-block w-10 h-5">
                        <input
                            type="checkbox"
                            checked={availability}
                            onChange={() => setAvailability(!availability)}
                            className="opacity-0 w-0 h-0 peer"
                        />
                        <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] rounded-full transition peer-checked:bg-[#3e0e0e] before:content-[''] before:absolute before:h-[14px] before:w-[14px] before:left-[3px] before:bottom-[3px] before:bg-white before:rounded-full before:transition peer-checked:before:translate-x-5"></span>
                    </label>
                </div>
                <div className="self-stretch justify-center text-slate-400 text-xs font-normal font-['Manrope']">Incognito mode make you invisible in events</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2.5 w-full">


                    <div className="w-full h-14 bg-white rounded-[10px] border border-slate-300 p-[16px] flex items-center justify-between" >
                        <div className="justify-center text-slate-600 text-base font-semibold font-['Manrope']">New Request</div>

                        <label className="relative inline-block w-10 h-5">
                            <input
                                type="checkbox"
                                checked={availability}
                                onChange={() => setAvailability(!availability)}
                                className="opacity-0 w-0 h-0 peer"
                            />
                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] rounded-full transition peer-checked:bg-[#3e0e0e] before:content-[''] before:absolute before:h-[14px] before:w-[14px] before:left-[3px] before:bottom-[3px] before:bg-white before:rounded-full before:transition peer-checked:before:translate-x-5"></span>
                        </label>
                    </div>

                    <div className="w-full h-14 bg-white rounded-[10px] border border-slate-300 p-[16px] flex items-center justify-between" >
                        <div className="justify-center text-slate-600 text-base font-semibold font-['Manrope']">Message</div>

                        <label className="relative inline-block w-10 h-5">
                            <input
                                type="checkbox"
                                checked={availability}
                                onChange={() => setAvailability(!availability)}
                                className="opacity-0 w-0 h-0 peer"
                            />
                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] rounded-full transition peer-checked:bg-[#3e0e0e] before:content-[''] before:absolute before:h-[14px] before:w-[14px] before:left-[3px] before:bottom-[3px] before:bg-white before:rounded-full before:transition peer-checked:before:translate-x-5"></span>
                        </label>
                    </div>

                    <div className="w-full h-14 bg-white rounded-[10px] border border-slate-300 p-[16px] flex items-center justify-between" >
                        <div className="justify-center text-slate-600 text-base font-semibold font-['Manrope']">Request Accepted</div>

                        <label className="relative inline-block w-10 h-5">
                            <input
                                type="checkbox"
                                checked={availability}
                                onChange={() => setAvailability(!availability)}
                                className="opacity-0 w-0 h-0 peer"
                            />
                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] rounded-full transition peer-checked:bg-[#3e0e0e] before:content-[''] before:absolute before:h-[14px] before:w-[14px] before:left-[3px] before:bottom-[3px] before:bg-white before:rounded-full before:transition peer-checked:before:translate-x-5"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}


