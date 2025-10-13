/* eslint-disable @typescript-eslint/no-explicit-any */

export default function MyCasesTabs({ activeTab,
    setActiveTab }: any) {

    const tabs = [
        { id: "ACTIVE", label: "Active (5)" },
        { id: "PENDING", label: "Pending approve" },
        { id: "COMPLETED", label: "Completed" },
        { id: "CANCELED", label: "Cancelled" },
    ];

    return (
        <div className="w-full h-14 bg-white rounded-xl flex justify-between items-center">
            {tabs.map((tab, index) => (
                <div key={tab.id} className="flex-1 flex">
                    <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-2.5 flex-1 text-center text-sm font-medium font-['Manrope']
              transition-colors duration-200 cursor-pointer
              ${activeTab === tab.id ? "text-red-900" : "text-slate-400"}`}
                    >
                        {tab.label}
                    </button>

                    {index < tabs.length - 1 && (
                        <div className="w-0.5 h-14 bg-slate-300 rounded-[5px]" />
                    )}
                </div>
            ))}
        </div>
    );
}
