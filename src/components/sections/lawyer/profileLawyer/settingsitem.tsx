/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import { IconRawRahet } from "@/assets/icons";
import { useState } from "react";
import LanguageModal from "./LanguageModal";
import {
  IconBoldLanguage
} from "@/assets/icons";

interface SidebarLinkProps {
  ImgIcon?: React.FC;
  text: string;
  felx: string;
  to: string; // 👈 أضفت prop للمسار
}
interface SidebarButtonProps {
  ImgIcon?: React.FC;
  text: string;
  felx: string;
  Action: any; // 👈 أضفت prop للمسار
}

export const SettingsItem: React.FC<SidebarLinkProps> = ({ ImgIcon, text, felx, to }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)} // 👈 هنا التنقل
      className={`${felx} flex items-center justify-between h-14 rounded-full 
        px-4 border border-[#D3DAEA] mb-2 bg-white cursor-pointer gap-2 transition-all duration-200 hover:bg-[#f1f1f5]`}
    >
      <div className="flex items-center gap-2">
        {ImgIcon && <ImgIcon />}
        <span className="font-medium text-base text-[#212121]">{text}</span>
      </div>
      <IconRawRahet />
    </div>
  );
};



export const SettingsItemButton: React.FC<SidebarButtonProps> = ({ ImgIcon, text, felx, Action }) => {

  return (
    <div
      onClick={() => Action()} // 👈 هنا التنقل
      className={`${felx} flex items-center justify-between h-14 rounded-full 
        px-4 border border-[#D3DAEA] mb-2 bg-white cursor-pointer gap-2 transition-all duration-200 hover:bg-[#f1f1f5]`}
    >
      <div className="flex items-center gap-2">
        {ImgIcon && <ImgIcon />}
        <span className="font-medium text-base text-[#212121]">{text}</span>
      </div>
      <IconRawRahet />
    </div>
  );
};


export const SettingsPageLanguage = () => {
  const [langModalOpen, setLangModalOpen] = useState(false);

  return (
    <>
      <div onClick={() => setLangModalOpen(true)}
        className={`flex-1 flex items-center justify-between h-14 rounded-full 
        px-4 border border-[#D3DAEA] mb-2 bg-white cursor-pointer gap-2 transition-all duration-200 hover:bg-[#f1f1f5]`}
      >
        <div className="flex items-center gap-2">
          <IconBoldLanguage />
          <span className="font-medium text-base text-[#212121]">Language</span>
        </div>
        <IconRawRahet />
      </div>
      <LanguageModal isOpen={langModalOpen} onClose={() => setLangModalOpen(false)} />
    </>
  );
};
