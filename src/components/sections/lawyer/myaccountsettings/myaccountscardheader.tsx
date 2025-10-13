/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import { useNavigate } from "react-router";

interface MyAccountsCardProps {
    activeTab: string;
    setActiveTab: any;
}

const MyAccountscardHeader = (props: MyAccountsCardProps) => {
    const { activeTab, setActiveTab } = props;
    const { id, status } = useParams();
    const navigate = useNavigate();
    const ListButtons = [
        {
            id: 1,
            name: "Current cases",
            activeStatus: "cases"
        },
        {
            id: 2,
            name: "Applied Offers",
            activeStatus: "offers"
        },
    ]

    const ListTabs = [
        { id: 1, name: "Active (2)", activeStatus: "ACTIVE" },
        { id: 2, name: "Pending approve", activeStatus: "PENDING" },
        { id: 3, name: "Completed", activeStatus: "COMPLETED" },
        { id: 4, name: "Cancelled", activeStatus: "CANCELED" },
    ];
    return (<>
        <div className="w-full flex  gap-[8px] items-center">
            {ListButtons.map((item) => (
                <button type="button"
                    className={`px-[20px] py-[8px] cursor-pointer rounded-[20px] font-bold
                    ${item?.activeStatus == status ? "bg-[#E9D6D8] text-[#824B50] " : " text-[#667085]"}`}
                    key={item.id}
                    onClick={() => navigate(`/lawyer/settings/myaccountsettings/${id}/${item.activeStatus}`)}>
                    {item.name}
                </button>
            ))}
        </div>
        
        {status == "cases" &&
        <div className="inline-flex justify-start items-center w-full">
            {ListTabs.map((tab) => (
                <div
                key={tab.id}
                className={`px-3 py-2.5 flex justify-center items-center cursor-pointer
                    ${tab.activeStatus === activeTab
                        ? "text-red-900 font-medium"
                        : "text-slate-400"
                        }`}
                        onClick={() => setActiveTab(tab.activeStatus)}
                        >
                    <div className="text-center text-sm font-['Manrope']">{tab.name}</div>
                </div>
            ))}
        </div>
        }
    </>
    )
}

export default MyAccountscardHeader

// Primary/50