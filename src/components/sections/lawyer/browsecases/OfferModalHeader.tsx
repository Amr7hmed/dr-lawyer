/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconCloseModule, IconBackModule } from "@/assets/icons";
import { useTranslation } from "react-i18next";

interface OfferModalHeaderProps {
  onClose: () => void;
  showSignatureModal: any;
  setShowSignatureModal: any;
}

export default function OfferModalHeader({ onClose, showSignatureModal
  , setShowSignatureModal }: OfferModalHeaderProps) {
  const { t } = useTranslation("cases");

  return (
    <div className="w-full flex justify-between items-center flex-row-reverse">
      <button
        className="text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={onClose}
      >
        <IconCloseModule />
      </button>
      <div className="text-center justify-center text-neutral-800 text-xl font-bold font-['Manrope']">
        {showSignatureModal == false ?
          t("CreateOffer")
          :
          t("SignTheOffer")
        }
      </div>
      {showSignatureModal == true ?
      <button className="w-6 h-6 cursor-pointer" onClick={()=>{
        setShowSignatureModal(false)
      }}>
        <IconBackModule />
      </button>
      :<span></span>}
    </div>
  );
}
