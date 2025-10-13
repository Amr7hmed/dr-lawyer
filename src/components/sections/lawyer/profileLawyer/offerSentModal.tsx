import { useState } from "react";
import {
    IconRequestsColor,
    IconVerifiedBadge, IconBoldDiscount
} from "@/assets/icons";
import drlawyerLogo from "@/assets/dr-lawyer-logo-wahet.png";

export default function OfferSentModal({ onClose }: { onClose: () => void }) {
    const [duration, setDuration] = useState(false);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="relative bg-[#5c0d11] rounded-3xl w-full max-w-3xl px-[80px] py-8 text-white shadow-2xl">
                {/* Logo */}
                <div className="w-60 h-60 relative mb-6 mx-auto">
                    <div className="w-60 h-60 left-0 top-0 relative bg-gradient-to-b from-white/5 to-white/0 rounded-full flex justify-center items-center" />
                    <div className="w-40 h-40  bg-gradient-to-b from-white/20 to-white/0 rounded-full 
                    flex justify-center items-center left-[50%] top-[50%] absolute "  style={{
                            transform: "translate(-50%, -50%)"
                        }}>
                        <img src={drlawyerLogo} alt="Dr Lawyer Logo" className="w-28 h-28" />
                    </div>
                    
                {/* Premium badge */}
                <div className="flex justify-center absolute bottom-0 left-[50%]">
                    <span className="bg-white px-3 py-1 rounded-full text-sm  text-[#642329]" style={{
                            transform: "translate(-50%, 0%)"
                        }}>
                        Premium
                    </span>
                </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mt-4">
                    Start Your Membership Now
                </h2>
                {duration === true ? <Membership /> :
                    <Features />
                }

                {/* Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                    {duration === false &&
                        <button className="bg-white text-[#5c0d11] font-semibold rounded-full py-3 cursor-pointer" onClick={() => {
                            setDuration(true)
                        }}>
                            Start 30 Days free Trial
                        </button>
                    }
                    <button
                        onClick={onClose}
                        className="text-gray-300 hover:text-white text-sm"
                    >
                        No Thanks
                    </button>
                </div>
            </div>
        </div>
    );
}
const Features = () => {
    return (
        <>

            {/* Features */}
            <div className="bg-[#7a1b20] rounded-xl p-4 mt-6 space-y-4">
                <div className="flex items-center gap-3">
                    <IconRequestsColor />
                    <div>
                        <p className="font-semibold">Access to Client Requests</p>
                        <p className="text-sm text-gray-200">
                            More clients more potentials
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <IconVerifiedBadge />
                    <div>
                        <p className="font-semibold">Get Verified Badge</p>
                        <p className="text-sm text-gray-200">
                            Gain more trust with badge
                        </p>
                    </div>
                </div>
            </div>

            {/* Trial info */}
            <div className="flex justify-between text-sm text-gray-200 mt-6">
                <span>✔ 30 Days free trial</span>
                <span>✔ Cancel anytime</span>
            </div>

            {/* Cancel info */}
            <p className="text-xs text-center text-gray-300 mt-2">
                Cancel your plan anytime in the appstore
            </p>
        </>
    )
}
const Membership = () => {
    return (
        <div className="w-full h-80 relative mt-[30px]">
            <div className="w-full h-80  bg-white rounded-3xl p-[14px] flex flex-col gap-4" >
                <div className="w-full p-[10px]  bg-white rounded-[10px] border border-slate-300 flex flex-col gap-4" >
                    <div className="flex justify-between items-center">
                        <div className="  text-neutral-800 text-base font-semibold font-['Manrope'] leading-snug">Monthly</div>
                        <div className="w-4 h-4  rounded-full border border-red-900 flex justify-center items-center" >
                            <div className="w-2.5 h-2.5  bg-red-900 rounded-full" />
                        </div>
                    </div>

                    <div className="text-slate-600 text-base font-medium font-['Manrope'] leading-snug">AED 39.99/mo</div>
                </div>
                <div className="w-full p-[10px]  bg-white rounded-[10px] border border-slate-300 flex flex-col gap-4" >
                    <div className="flex justify-between items-center">
                        <div className="  text-neutral-800 text-base font-semibold font-['Manrope'] leading-snug">Yearly</div>
                        <div className="w-4 h-4  rounded-full border border-slate-300 flex justify-center items-center" >
                        </div>
                    </div>

                    <div className="text-slate-600 text-base font-medium font-['Manrope'] leading-snug">AED 460.99/month</div>


                    <div className="w-full h-7 flex items-center gap-2  bg-rose-100 rounded-md p-[8pxs] ">
                        <IconBoldDiscount />
                        <div className=" text-center justify-center text-red-900 text-xs font-semibold font-['Manrope']">Save an extra 20% in yearly plan</div>
                    </div>
                </div>


                <button className="bg-[#5c0d11] text-white font-semibold rounded-full py-3 cursor-pointer" >
                    Start 30 Days free Trial
                </button>

            </div>
        </div>)
}