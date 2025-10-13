



export default function ProfileLawyerContactSupport() {

    return (
        <div className="w-full h-[753px] relative bg-white rounded-2xl overflow-hidden p-[30px] flex flex-col gap-5 pt-[40px]">
            <div className="w-full h-20  inline-flex flex-col justify-start items-start">
                <div className="self-stretch flex-1 justify-center text-neutral-800 text-2xl font-bold font-['Manrope']">Report a technical issue</div>
                <div className="self-stretch justify-start text-slate-600 text-lg font-medium font-['Manrope'] leading-snug">Please enter details below. We will contact you via email with a solution soon.</div>
            </div>
            <textarea className="w-full h-56  bg-white rounded-xl border border-slate-300
             text-slate-600 text-lg font-medium font-['Manrope'] p-[14px] resize-none" placeholder="Type your message" >

            </textarea>

            <div className="w-full h-16  bg-slate-100 rounded-xl border-[1.50px] border-slate-300 flex items-center justify-center" >
                <div className="w-full  text-center justify-center text-slate-600 text-base font-bold font-['Manrope']">Add a screenshot (optional)</div>
            </div>
            <div className="flex items-center justify-center w-full mt-6">
            <div className="w-80 h-14 px-20 py-4  bg-red-900 rounded-[32px] shadow-[15px_0px_30px_0px_rgba(70,195,255,0.08)]
             outline outline-1 outline-offset-[-0.50px] inline-flex flex-col justify-center items-center gap-2.5">

                    <button type="button" className="justify-start text-white text-base font-bold font-['Manrope']">Send</button>
                </div>
            </div>
        </div>
    );
}



