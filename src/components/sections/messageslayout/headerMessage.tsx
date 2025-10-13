/* eslint-disable @typescript-eslint/no-explicit-any */
import { Phone, MoreVertical } from "lucide-react";
import {
    IconTotalPriceMessage,
    IconTimeMessage,
    IconDateMessage,
} from "@/assets/icons/index";

const MessageHeader = ({ chat, showOffer }: any) => {


    const ListData = [
        {
            id: 1,
            Icon: <IconTotalPriceMessage />,
            title: "Total Price :",
            value: " $34.00",
        },
        {
            id: 1,
            Icon: <IconTimeMessage />,
            title: "Time :",
            value: "03 AM - 05 AM ",
        },
        {
            id: 1,
            Icon: <IconDateMessage />,
            title: "Date :",
            value: "Tue - 5 Nov, 2022",
        },
    ]
    return (
        <>
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
                <div className="flex items-center gap-3">
                    <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="h-10 w-10 rounded-full"
                    />
                    <div>
                        <p className="font-semibold text-neutral-800">{chat.name}</p>
                        <p className="text-xs text-slate-500">Last seen: 2 mins ago</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-10 h-10 bg-slate-100 rounded-[20px] flex justify-center items-center" >
                        <Phone className="h-5 w-5 cursor-pointer" fill="#485470" />
                    </div>
                    <div className="w-10 h-10 bg-slate-100 rounded-[20px] flex justify-center items-center" >
                        <MoreVertical className="h-5 w-5 cursor-pointer rotate-90" fill="#485470" />
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col justify-center bg-[#F5F9FF] p-4">
                <div className="flex flex-col gap-3 w-full  rounded-tl-xl rounded-br-xl rounded-bl-xl bg-white px-3.5 
                py-4 shadow-[0px_0px_4px_0px_rgba(211,218,234,0.40)]">
                    <div className="flex items-center justify-between gap-[20px] w-full ">
                        <div className="flex flex-1 flex-col items-start justify-start gap-1">
                            <div className="justify-start font-['Manrope'] text-base leading-tight font-bold text-neutral-800">
                                Need suggestions for my project
                            </div>
                            <div className="w-80 justify-center font-['Manrope'] text-sm leading-snug font-normal text-slate-600">
                                Hi! I am Henry and I need some info about “How you get involved in
                                this case & what are the best way to handle this case!
                                <br />
                                Thanks
                            </div>
                        </div>
                        <div className="h-24 w-0 origin-top-left outline-1 outline-offset-[-0.50px] outline-slate-300"></div>

                        <div className="flex flex-1 flex-col items-start justify-start gap-[15px]">
                            {ListData.map((Item: any) => (
                                <div className="relative flex w-full items-center justify-between gap-3"
                                    key={Item?.id}>
                                    <div className="flex items-center gap-1.5">
                                        {Item?.Icon}
                                        <div className="justify-center font-['Manrope'] text-sm font-medium text-slate-400">
                                            {Item?.title}
                                        </div>
                                    </div>
                                    <div className="justify-center text-right font-['Manrope'] text-sm font-semibold text-slate-600">
                                        {Item?.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {showOffer &&
                        <div className="self-stretch h-8 px-16 py-2 bg-slate-300 rounded-[20px] inline-flex justify-center items-center gap-2.5">
                            <div className="text-center justify-center text-white text-xs font-semibold font-['Manrope']">View Offer</div>
                        </div>
                    }
                </div>
                <div className="mx-auto mt-5 h-[1px] w-full bg-[#E2E8F0]"></div>
            </div>

        </>
    );
};

export default MessageHeader;
