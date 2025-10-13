/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import profile from "@/assets/image-profile.png";
import coverImage from "@/assets/cover.png";
import { IconBlock } from "@/assets/icons";
import { useNavigate, useParams } from "react-router";
import { useGetSubAccountByIdQuery } from "@/hooks/useSubAccounts";
import { SubAccountService } from "@/services/subAccountService";
import { useQueryClient } from "@tanstack/react-query";

const ProfileHeader = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data, isLoading } = useGetSubAccountByIdQuery(id!);

    const subAccount = data?.data;

    const [loading, setLoading] = useState(false);

    const handleToggleStatus = async () => {
        if (!id || !subAccount) return;

        try {
            setLoading(true);
            const newStatus = !subAccount.isActive;
            await SubAccountService.updateSubAccount(id, { isActive: newStatus });
            await queryClient.invalidateQueries({
                queryKey: ["sub-accounts", "details", id],
            });
        } catch (error: any) {
            console.error("❌ Failed to change status:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
            {/* Cover Image */}
            <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${coverImage})` }}
            ></div>

            {/* Content */}
            <div className="relative flex flex-wrap items-center gap-6 p-6 md:flex-row flex-col">
                {/* Avatar */}
                <div className="w-44 h-44 absolute left-[15px] top-[-155px] ">
                    <img className="w-44 h-44 rounded-full border-2 border-white" src={profile} />
                    <div className="w-3.5 h-3.5 left-[137.86px] top-[151.82px] absolute bg-green-500 rounded-full outline outline-1 outline-white" />
                </div>

                {/* User Info */}
                <div className="text-center md:text-left md:ml-4 mt-24 md:mt-0">
                    <h2 className="text-lg font-semibold">{subAccount?.fullName}</h2>
                    <p className="text-sm text-gray-500">{subAccount?.email}</p>
                </div>

                {/* Actions */}
                <div className="w-52 inline-flex justify-start items-start gap-1 ml-auto">
                    {/* Edit Button */}
                    <div className="flex-1 flex justify-start items-start">
                        <button
                            type="button"
                            onClick={() => navigate(`/lawyer/settings/editeuserform/${id}`)}
                            className="flex-1 px-4 py-2.5 bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        border border-gray-300 flex justify-center items-center gap-2 overflow-hidden cursor-pointer"
                        >
                            <div className="text-gray-700 text-base font-semibold">Edit</div>
                        </button>
                    </div>

                    {/* Block / Unblock Button */}
                    <div className="flex-1 flex justify-start items-start">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleToggleStatus}
                            className={`flex-1 px-4 py-2.5 rounded-2xl shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        flex justify-center items-center gap-2 overflow-hidden cursor-pointer border
                        ${subAccount?.isActive
                                    ? "border-[#FDA29B] text-[#F04438] bg-white"
                                    : "border-green-300 text-green-600 bg-white"
                                }`}
                        >
                            {subAccount?.isActive && 
                            <IconBlock />
                            }
                            <div className="text-base font-semibold">
                                {loading ? "Processing..." : subAccount?.isActive ? "Block" : "Unblock"}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;

