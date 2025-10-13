import type React from "react";
import LanguageSelect from "./languageSelect";

const ProfileStep2 = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4">
      <LanguageSelect />
      {children}
    </div>
  );
};

export default ProfileStep2;
