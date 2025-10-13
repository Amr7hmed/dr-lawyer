const MySpendings = () => {
    const overview = [
        { label: "Total Spent", value: "$2560" },
        { label: "Active Cases", value: "$230 (2)" },
        { label: "Cancelled", value: "$160 (1)" },
    ];

    const payments = [
        {
            id: 1,
            name: "Mark Henry (Need Lawyer for acc…)",
            date: "25 Jul, 2024",
            amount: "- $130",
            status: "Paid",
        },
        {
            id: 2,
            name: "Joel Zongmo (Need Lawyer for acc…)",
            date: "25 Jul, 2024",
            amount: "- $130",
            status: "Cancelled",
        },
        {
            id: 3,
            name: "Joel Zongmo (Need Lawyer for acc…)",
            date: "25 Jul, 2024",
            amount: "- $100",
            status: "Paid",
        },
    ];

    return (
        <div className="flex w-full flex-col gap-6">
            <h3 className="flex h-[30px] flex-col justify-center self-stretch text-[color:#212121] [font-family:Manrope] text-[22px] font-bold leading-[normal]">
                My Spendings
            </h3>
            <div className="flex flex-col gap-3 w-full">
                <p className="w-[152.385px] text-[color:#212121] [font-family:Manrope] text-base font-bold leading-[normal]">
                    Overview
                </p>
                <div className="flex flex-col rounded-xl bg-[#F9FAFB] border border-[#E5EAF1]">
                    {overview.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center px-4 py-3 border-b last:border-none border-[#E5EAF1]"
                        >
                            <span className="text-[color:#212121] [font-family:Manrope] text-[15px] font-medium leading-[normal]">
                                {item.label}
                            </span>
                            <span className="text-[color:#212121] text-right [font-family:Manrope] text-[15px] font-bold leading-[normal]">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-[#E5EAF1] w-full mt-[13px]" />
            </div>
            {/* Payment History */}
            <div className="flex flex-col gap-3">
                <h4 className="w-full text-[color:#212121] [font-family:Manrope] text-[17px] font-bold leading-[normal]">
                    Payment History
                </h4>

                {payments.map((p) => (
                    <div
                        key={p.id}
                        className="flex justify-between items-start p-4 border border-[#D3DAEA] rounded-xl bg-white hover:bg-[#F9F9FC]"
                    >
                        <div className="flex flex-col gap-1">
                            <span
                                className={`font-medium 
                                    w-fit mb-2 flex min-w-[87.673px] h-[21px] justify-center items-center gap-2.5 shrink-0  px-[10px] py-[5px] rounded-xl
                                    ${p.status === "Paid"
                                        ? "[background:#12B88D]"
                                        : "[background:#B1BACD]"
                                    }`}
                            >
                                <span className="text-white [font-family:Manrope] text-[10px] font-semibold leading-[normal]">
                                    {p.status}

                                </span>
                            </span>
                            <span className=" text-[color:var(--Text,#212121)] [font-family:Manrope] text-[15px] font-bold leading-[normal]">
                                {p.name}
                            </span>
                            <span className=" text-[color:#485470] [font-family:Manrope] text-sm font-medium leading-[131.023%]">{p.date}</span>
                        </div>
                        <span className=" text-[color:var(--Text,#212121)] text-right [font-family:Manrope] text-[15px] font-bold leading-[normal]">
                            {p.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MySpendings;
