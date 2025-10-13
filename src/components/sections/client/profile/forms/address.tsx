import { useState } from "react";
import { IconEdit } from "@/assets/icons";

const ProfileFormAddress = () => {
    const ProfileForm = [
        { label: "Full Name", value: "Mark Henry", type: "text" },
        { label: "Date of Birth", value: "12 July, 1999", type: "date" },
        { label: "Email Address", value: "mark_henry12@gmail.com", type: "email" },
        { label: "Experience", value: "2019 - 2024 (6 Years)", type: "text" },
        { label: "Gender", value: "Male", type: "text" },
    ];

    const [editingField, setEditingField] = useState<string | null>(null);
    const [formData, setFormData] = useState(
        Object.fromEntries(ProfileForm.map((f) => [f.label, f.value]))
    );

    const handleChange = (label: string, value: string) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    return (
        <>
            <form className="w-full flex flex-col items-start gap-[35.014px]">
                <div className="w-full  flex flex-col items-start gap-3">
                    <h2 className="text-xl font-semibold w-full ">Edit Profile</h2>
                    <div className="flex  flex-col items-start gap-[15px] w-full ">
                        {ProfileForm.map((field) => (
                            <div key={field.label} className="border rounded-lg p-3 w-full ">
                                <label className="text-[#818CA2] [font-family:Manrope] text-[13px] font-medium leading-[150%]">
                                    {field.label}
                                </label>
                                <div className="flex justify-between items-center">
                                    {editingField === field.label ? (
                                        <input
                                            type={field.type}
                                            value={formData[field.label]}
                                            onChange={(e) => handleChange(field.label, e.target.value)}
                                            onBlur={() => setEditingField(null)} // لما يسيب الـ input يرجع span
                                            className="border-b border-gray-400 outline-none text-[17px] font-bold flex-1"
                                            autoFocus
                                        />
                                    ) : (
                                        <span className="text-[color:var(--Text,#212121)] [font-family:Manrope] text-[17px] font-bold leading-[normal]">
                                            {formData[field.label]}
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => setEditingField(field.label)}
                                        className="ml-2  cursor-pointer"
                                    >
                                        <IconEdit />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="w-[179px] h-[57.818px] shrink-0 [background:var(--Primary,#642329)] rounded-[32px] cursor-pointer"
                    type="submit"
                >
                    <span className="text-[color:var(--BG--White,#FFF)] text-center [font-family:Manrope] text-base font-bold leading-[25px]">
                        Save
                    </span>
                </button>
            </form>
        </>
    );
};

export default ProfileFormAddress;
