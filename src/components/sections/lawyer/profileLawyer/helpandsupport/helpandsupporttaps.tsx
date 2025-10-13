
type Props = {}

const HelpAndSupportTaps = (props: Props) => {
  return (
    <div className="self-stretch inline-flex justify-start items-center gap-1.5">
            <div className="w-36 px-3.5 py-1 bg-slate-600 rounded-[75px] outline outline-1 outline-offset-[-1px] outline-slate-600 flex justify-center items-center gap-2.5">
                <div className="w-20 h-9 text-center justify-center text-white text-xl font-semibold font-['Manrope'] leading-snug">General</div>
            </div>
            <div className="w-36 px-3.5 py-1 bg-white rounded-[75px] outline outline-1 outline-offset-[-1px] outline-slate-300 flex justify-center items-center gap-2.5">
                <div className="w-20 h-9 text-center justify-center text-slate-600 text-xl font-semibold font-['Manrope'] leading-snug">Account</div>
            </div>
            <div className="w-36 px-3.5 py-1 bg-white rounded-[75px] outline outline-1 outline-offset-[-1px] outline-slate-300 flex justify-center items-center gap-2.5">
                <div className="w-16 h-9 text-center justify-center text-slate-600 text-xl font-semibold font-['Manrope'] leading-snug">Service</div>
            </div>
            <div className="w-60 px-3.5 py-1 bg-white rounded-[75px] outline outline-1 outline-offset-[-1px] outline-slate-300 flex justify-center items-center gap-2.5">
                <div className="w-40 h-9 text-center justify-center text-slate-600 text-xl font-semibold font-['Manrope'] leading-snug">Payment method</div>
            </div>
        </div>
  )
}