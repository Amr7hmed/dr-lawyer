const ReportIssue = () => {
    return (
        <div className="flex w-full flex-col gap-[20px]">
            <div className="flex w-full flex-col items-start gap-[2px] shrink-0">

            <h3 className="flex h-[30px] flex-col justify-center self-stretch text-[color:var(--Text,#212121)] [font-family:Manrope] text-[22px] font-bold leading-[normal]">
                Report a technical issue
            </h3>

            <p className="self-stretch text-[color:#485470] [font-family:Manrope] text-lg font-medium leading-[22px]">
                Please enter details below. We will contact you via email with a solution soon.
            </p>
            </div>

            {/* Textarea */}
            <div className="flex flex-col">
                <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full resize-none rounded-xl border border-[#E5EAF1] bg-white px-4 py-3 text-sm text-[#212121] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#742C2C]"
                />
            </div>

            {/* Upload box */}
            <div className="flex items-center justify-center  w-[full h-[70px] shrink-0 border-[#B1BACD] 
                [background:#F1F4FB] rounded-xl border-[1.5px] border-dashed">
                <span className=" text-[color:#485470] text-center [font-family:Manrope] text-base font-bold leading-[normal]">
                    Add a screenshot (optional)
                </span>
            </div>

            {/* Button */}
            <button className="flex w-[220.611px] h-[54px] 
            flex-col justify-center items-center gap-2.5 shrink-0 [background:#642329] px-[73px] py-4 rounded-[32px]">
                <span className="text-white [font-family:Manrope] text-base font-bold leading-[normal]">
                    Send
                </span>
            </button>
        </div>
    );
};

export default ReportIssue;
