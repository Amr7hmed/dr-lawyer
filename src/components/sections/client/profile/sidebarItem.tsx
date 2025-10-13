import { IconRightArrow } from "@/assets/icons/index";
import { type ReactNode } from "react";

type SidebarItemProps = {
  label: string;
  Icon?: ReactNode;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ label, Icon, active, danger, onClick }: SidebarItemProps) => {
  const colorActive = active == true ? "#642329" : "#D3DAEA";
  const colorText = danger == true ? "#FF5732" : active == true ? "#642329" : "#212121";
  return (
    <div
      onClick={onClick}
      className={`w-full px-[20px] py-[12px] flex items-center shrink-0 border border-[color:var(--Stroke,${colorActive})] [background:var(--BG--White,#FFF)]
       rounded-[28px] border-solid cursor-pointer`}
    >
      <div className="flex items-center gap-3 flex-1">
        {Icon && (
          <>
            {Icon}
          </>
        )}
        <span className={` [font-family:Manrope] text-base font-medium leading-[150%]`} style={{
          color:colorText
        }}>{label}</span>
      </div>
      <IconRightArrow color={colorActive} size={16} />

    </div>
  );
};

export default SidebarItem;
