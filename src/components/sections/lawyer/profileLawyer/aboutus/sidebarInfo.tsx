import React from "react";

type SidebarInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
};

const SidebarInfo: React.FC<SidebarInfoProps> = ({ icon, label, value }) => {
  return (
    <div className="w-full flex items-start gap-3">
      <div className="flex-shrink-0">{icon}</div>

      <div className="sidebar-info__text">
        <span className="sidebar-info__label">
          {label}
        </span>
        <span className="sidebar-info__value">
          {value}
        </span>
      </div>
    </div>
  );
};

export default SidebarInfo;
