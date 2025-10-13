import { IconAddPlus, IconSearch } from "@/assets/icons"
import { useNavigate } from "react-router";


const MyAccountHeader = () => {
    const navigate = useNavigate();
    return (<div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center gap-2 px-3.5 py-2.5 bg-[#FFFFFF] 
                                 rounded-xl shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] w-80">
            <IconSearch />
            <input type="search" name="" id="" placeholder="Search users"
                className="h-full text-[#667085)] text-base font-normal font-['Manrope'] focus:border-0 flex-1 focus:outline-0" />
        </div>

        <button type="button" className="btn cursor-pointer flex justify-center items-center gap-3 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
        rounded-[20px] px-6 py-4  bg-[#824B50]"
            onClick={() => navigate("/lawyer/settings/createuserform")}>
            <IconAddPlus />
            <span className="justify-center text-[#FFFFFF] text-lg font-semibold font-['Manrope'] ">Add new user</span>
        </button>
    </div>
    )
}

export default MyAccountHeader;