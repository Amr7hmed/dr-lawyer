import {
  IconUploadFile,
  IconVector,
  IconDownload,
  IconFile, IconProfileMen
} from "@/assets/icons";

export default function CaseDetails() {

  return (
    <div className="w-full flex gap-2">

      <div className="flex-1 h-full relative bg-white rounded-2xl overflow-hidden py-[40px] px-[27px]">
        <div className="w-full justify-center text-neutral-800 text-xl font-extrabold font-['Manrope'] mb-4">Need lawyer for Accidental issue, want to handle it quickly.</div>


        <div className="w-full inline-flex justify-between items-center mb-4">
          <div className="flex justify-start items-center gap-[5px]">
            <IconProfileMen />
            <div className="justify-center text-slate-600 text-xs font-medium font-['Manrope']">Stuard Binni</div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="px-2.5 py-1 bg-sky-500/10 rounded-2xl flex justify-center items-center gap-2.5">
              <div className="justify-center text-sky-500 text-xs font-medium font-['Manrope']">In Progress</div>
            </div>
          </div>
        </div>

        <div className="w-full h-0  outline-1 outline-offset-[-0.50px] outline-slate-300 mb-4 "></div>

        <div className="w-full justify-center text-neutral-800 text-lg font-bold font-['Manrope'] ">Case Description</div>
        <div className="w-full justify-center text-neutral-800 text-base font-medium font-['Manrope'] mb-3">I was involved in a car accident yesterday and need legal assistance to handle the situation quickly. I have complete dashcam video footage of the incident, along with photos and a police report. The other party was at fault, and I’m looking for guidance on how to proceed with claims, possible compensation, and any immediate legal steps I should take.<br /><br />I'm hoping to connect with a lawyer experienced in personal injury and traffic accident cases who can help me assess the case and move forward without delay.</div>


        <div className=" h-min px-4 py-3.5 w-full bg-slate-100 rounded-2xl inline-flex flex-col justify-start items-start gap-2.5 mb-4">
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">Start Date</div>
              <div className="text-right justify-center text-neutral-800 text-sm font-semibold font-['Manrope']">May 5, 2025</div>
            </div>
            <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">Deadline</div>
              <div className="text-right justify-center text-neutral-800 text-sm font-semibold font-['Manrope']">May 30, 2025</div>
            </div>
            <div className="self-stretch h-0  outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">Client Location</div>
              <div className="text-right justify-center text-neutral-800 text-sm font-semibold font-['Manrope']">Abu Dhabi, UAE</div>
            </div>
            <div className="self-stretch h-0  outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">Total</div>
              <div className="text-right justify-center text-neutral-800 text-sm font-semibold font-['Manrope']">AED 2400</div>
            </div>
          </div>
        </div>

        <div className="justify-center text-neutral-800 text-base font-bold font-['Manrope']">Attachments</div>
        <br />


        <div className=" h-28 w-full bg-slate-100 rounded-[10px] p-[10px]">
          <div className="w-full inline-flex flex-col justify-start items-center gap-2">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <IconVector />
                <div className="justify-center text-blue-600 text-sm font-semibold font-['Manrope']">Video file.mp4</div>
              </div>
              <IconDownload />
            </div>
            <div className="self-stretch h-0  outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <IconVector />
                <div className="justify-center text-blue-600 text-sm font-semibold font-['Manrope']">Video file.mp4</div>
              </div>
              <IconDownload />
            </div>
          </div>
        </div>

        <br />

        <div className="justify-center text-neutral-800 text-base font-bold font-['Manrope'] mb-2">Send message</div>
        <textarea
          className="w-full h-28 bg-white rounded-2xl border border-slate-300 resize-none mb-3"
        />
        <div className="flex justify-center items-center">

          <button type="button" className="w-72 h-14 relative bg-red-900 rounded-[32px] shadow-[15px_0px_30px_0px_rgba(70,195,255,0.08)]  
                outline-1 outline-offset-[-0.50px] mx-auto inline-flex justify-center items-center gap-[5px] cursor-pointer">
            <div className="justify-start text-white text-base font-bold font-['Manrope'] leading-normal">Contact Client</div>
          </button>
        </div>

      </div>
      {/* Timeline */}
      <div className="w-120 h-[90vh] relative bg-white rounded-2xl overflow-auto p-2.5 pt-5 flex flex-col gap-6">
        <div className="justify-center text-neutral-800 text-xl font-bold font-['Manrope'] ">Timeline</div>

        <div className="w-full justify-center text-neutral-800 text-base font-bold font-['Manrope'] ">Agreement</div>

        <div className="w-full p-[14px] bg-slate-100 rounded-[10px] flex items-center justify-between ">
          <div className="flex items-center gap-1.5">
            <IconFile />
            <div className="justify-center text-neutral-800 text-base font-semibold font-['Manrope']">View Contract</div>
          </div>
          <div className="w-32 h-7 relative bg-neutral-800 rounded-2xl">
            <div className="w-1.5 h-1.5 left-[119px] top-[1px] absolute bg-red-400 rounded-full  outline-1 outline-slate-100" />
            <div className="w-20 left-[20px] top-[7px] absolute inline-flex justify-start items-center gap-[5px]">
              <div className="justify-center text-white text-xs font-medium font-['Manrope']">Sign Contract</div>
            </div>
          </div>
        </div>


        <div className="w-full px-4 py-3.5 bg-slate-100 rounded-2xl inline-flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">Client</div>
              <div className="w-12 h-5 text-right justify-center text-neutral-800 text-sm font-semibold font-['Manrope']">Signed</div>
            </div>
            <div className="self-stretch h-0  outline-1 outline-offset-[-0.50px] outline-slate-300"></div>
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="justify-center text-neutral-800 text-sm font-medium font-['Manrope']">You</div>
              <div className="text-right justify-center text-neutral-800 text-sm font-semibold font-['Manrope']">Waiting for sign</div>
            </div>
          </div>
        </div>

        <div className="w-full h-0  outline-1 outline-offset-[-0.50px] outline-slate-300"></div>

        <div className="flex flex-col gap-2 w-full">
          <div className="self-stretch justify-center text-neutral-800 text-base font-bold font-['Manrope']">Deliver Case Update</div>

          <label className="w-full h-14 px-32 py-4 bg-slate-100 rounded-2xl  outline-1 outline-offset-[-0.5px]
           outline-slate-300 inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => console.log(e.target.files)}
            />
            <div className="inline-flex justify-center items-center gap-2">
              <IconUploadFile />
              <span className="justify-center text-slate-600 text-sm font-semibold font-['Manrope']">
                Attach File
              </span>
            </div>
          </label>

        </div>
      </div>
    </div>
  );
}
