import { useState } from "react";
import { IconTrash } from "@/assets/icons";
import IconVisa from "@/assets/icon-visa.png";
import IconMasterCard from "@/assets/icon-MasterCard.png";
import IconPaypal from "@/assets/icon-Paypal.png";

const PaymentMethods = () => {
  const [methods, setMethods] = useState([
    {
      id: 1,
      type: "MasterCard",
      number: "**** **** **** 7541",
      icon: IconMasterCard,
    },
    {
      id: 2,
      type: "Visa Card",
      number: "**** **** **** 9852",
      icon: IconVisa,
    },
    {
      id: 3,
      type: "Paypal",
      number: "******** sds2@yahoo.com",
      icon: IconPaypal,
    },
  ]);

  const handleDelete = (id: number) => {
    setMethods((prev) => prev.filter((method) => method.id !== id));
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="flex h-[30px] flex-col justify-center self-stretch text-[color:var(--Text,#212121)] [font-family:Manrope] text-[22px] font-bold leading-[normal]">
        My Payment Method
      </h3>

      <div className="flex flex-col gap-[15px]">
        {methods.map((method) => (
          <div
            key={method.id}
            className="w-full shrink-0 border [background:#FFF] rounded-xl border-solid border-[#C8D1E5] flex justify-between items-center px-[25px] py-[15px]"
          >
            <div className="flex items-center gap-[20px]">
              <img
                className="w-[34px] h-6 shrink-0"
                src={method.icon}
                alt={method.type}
              />
              <div className="flex flex-col">
                <span className="text-[#485470] [font-family:Manrope] text-base font-semibold leading-[23px]">
                  {method.type}
                </span>
                <span className="text-[#485470] [font-family:Manrope] text-base font-semibold leading-[23px]">
                  {method.number}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => handleDelete(method.id)}
            >
              <IconTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Add new method */}
      <div className="flex w-full flex-col items-start gap-1.5">
        <p className="self-stretch text-[color:#212121] [font-family:Manrope] text-base font-bold leading-[normal]">
          Add new Payment Method
        </p>
        <div className="w-full flex h-14 flex-col justify-center items-center gap-2.5 shrink-0 border [background:#F8F9FB] px-[124px] py-[18px] rounded-[14px] border-dashed border-[#D3DAEA]">
          <button className="text-[color:#485470] [font-family:Manrope] text-sm font-semibold leading-[normal] cursor-pointer">
            Add now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
