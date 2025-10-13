/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import profile from "@/assets/image-profile.png";
import coverImage from "@/assets/cover.png";
import { useNavigate } from "react-router";
//import WalletModal from "./walletmodal";
//import ManageSubscription from "./managesubscription";

const ProfileHeader = () => {
    const [isWalletOpen, setIsWalletOpen] = useState(false);
    const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
            {/* Cover Image + Logout Button */}
            <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${coverImage})` }}
            >
                <button className="absolute top-4 right-4 flex items-center gap-2 text-sm font-medium border border-red-700 text-red-700 bg-white px-4 py-1.5 rounded-full hover:bg-red-700 hover:text-white transition">

                    Log Out
                </button>
            </div>

            {/* Content */}
            <div className="relative flex flex-wrap items-center gap-6 p-6 md:flex-row flex-col">
                {/* Avatar */}
                <div className="w-44 h-44 absolute left-[15px] top-[-155px] ">
                    <img className="w-44 h-44 rounded-full border-2 border-white" src={profile} />
                    <div className="w-3.5 h-3.5 left-[137.86px] top-[151.82px] absolute bg-green-500 rounded-full outline outline-1 outline-white" />
                </div>
                {/* User Info */}
                <div className="text-center md:text-left md:ml-4 mt-24 md:mt-0">
                    <h2 className="text-lg font-semibold">Mark Henry</h2>
                    <p className="text-sm text-gray-500">markhenry12@gmail.com</p>
                </div>

                <div className="flex flex-wrap gap-2 ml-auto justify-center w-full md:w-auto">
                    <button
                        className="border border-[#7D1D26] text-[#7D1D26] px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition"
                        onClick={() => setIsWalletOpen(true)}
                    >
                        Manage Subscription
                    </button>
                    <button className="border border-[#7D1D26] text-[#7D1D26] px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition">
                        AED 3400
                    </button>
                    <button className="bg-[#7D1D26] text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#3e0e0e] transition cursor-pointer"
                        onClick={() => navigate("/lawyer/settings/aboutus")}
                    >
                        Preview
                    </button>
                </div>
            </div>

            {/* Modals */}
            {/*isWalletOpen && <WalletModal onClose={() => setIsWalletOpen(false)} />*/}
            {/*isSubscriptionOpen && (
        <ManageSubscription onClose={() => setIsSubscriptionOpen(false)} />
      )*/}
        </div>
    );
};

export default ProfileHeader;
