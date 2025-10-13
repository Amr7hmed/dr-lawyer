import { useRef, useState } from "react";
import SidebarItem from "./sidebarItem";
import {
  IconLocation,
  IconMySpendings,
  IconWallet,
  IconProfile,
  IconSubtract,
  IconNotification,
  IconPrivacyPolicy,
  IconHelpAndSupport,
  IconAboutUs,
  IconLogOut,
  IconProfileUpload,
  IconCamera,
} from "@/assets/icons/index";
import { useTranslation } from "react-i18next";

type SidebarProps = {
  setStatus: (status: string) => void;
  status: string;
};

const Sidebar = ({ setStatus, status }: SidebarProps) => {
  const { t } = useTranslation("profileStatus");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const MyAccountList = [
    { name: t("editAddress"), Icon: <IconLocation color={`${status == "address" ? "#642329" : "#D3DAEA"}`} size={16} />, status: "address" },
    { name: t("mySpendings"), Icon: <IconMySpendings color={`${status == "mySpendings" ? "#642329" : "#D3DAEA"}`} size={16} />, status: "mySpendings" },
    { name: t("myPaymentMethod"), Icon: <IconWallet color={`${status == "myPaymentMethod" ? "#642329" : "#D3DAEA"}`} size={16} />, status: "myPaymentMethod" },
  ];

  const MyGeneralList = [
    { name: t("editProfile"), Icon: <IconProfile color={`${status == "editProfile" ? "#642329" : "#D3DAEA"}`} size={16} />, status: "editProfile" },
    { name: t("language"), Icon: <IconSubtract color={`${status == "language" ? "#642329" : "#D3DAEA"}`} size={16} />, status: "language" },
    { name: t("notification"), Icon: <IconNotification color={`${status == "notification" ? "#642329" : "#D3DAEA"}`} size={16} />, status: "notification" },
    { name: t("privacyPolicyTerms"), Icon: <IconPrivacyPolicy color={`${status == "privacyPolicyTerms" ? "#642329" : "#D3DAEA"}`} size={16} />, status: "privacyPolicyTerms" },
    { name: t("helpSupport"), Icon: <IconHelpAndSupport color={`${status == "helpSupport" ? "#642329" : "#D3DAEA"}`} size={16} />, status: "helpSupport" },
    { name: t("aboutUs"), Icon: <IconAboutUs color={`${status == "aboutUs" ? "#642329" : "#D3DAEA"}`} size={16} />, status: "aboutUs" },
    { name: t("logOut"), Icon: <IconLogOut />, status: "logOut" },
  ];

  return (
    <aside className="w-full md:w-1/3 bg-white shadow rounded-2xl p-6 flex flex-col gap-6 items-center">
      {/* User Info */}
      <div className="flex w-[156px] flex-col items-center gap-[5px]">
        <div className="w-[156px] h-[156px] shrink-0 bg-[#818CA2] rounded-[156px] border-[5px] border-solid border-white 
        flex flex-col items-center justify-center relative ">
          {!profileImage ? (
            <IconProfileUpload width={"43px"} height="45px" />
          ) : (
            <img src={profileImage} alt="profile" className="w-full h-full object-cover rounded-full" />
          )}
          <div
            onClick={handleCameraClick}
            className="cursor-pointer w-[38.642px] h-[38.642px] shrink-0 border bg-[#818CA2] 
            rounded-full border-solid border-[#F2F2F2] flex flex-col items-center 
            justify-center absolute bottom-0 right-0"
          >
            <IconCamera width={"17px"} height="15px" />
          </div>
          <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
        </div>

        <h2 className="self-stretch text-[#212121] text-center font-[Manrope] text-xl font-bold leading-[normal]">
          Mark Henry
        </h2>
        <p className="flex w-[171px] h-[18px] flex-col justify-center text-[#485470] text-center font-[Manrope] text-sm font-medium leading-[normal]">
          markhenry12@gmail.com
        </p>
      </div>

      {/* My Account */}
      <nav className="flex flex-col gap-4 w-full">
        <div className="flex flex-col items-start gap-[13px] self-stretch">
          <p className="self-stretch text-[color:var(--Text,#212121)] [font-family:Manrope] text-[17px] font-bold leading-[normal]">
            {t("myAccount")}
          </p>
          {MyAccountList.map((item) => (
            <SidebarItem
              label={item.name}
              key={item.status}
              Icon={item.Icon}
              active={status === item.status}
              onClick={() => setStatus(item.status)}
            />
          ))}
        </div>
        <div>
          <div className="flex flex-col items-start gap-[13px] self-stretch">
            <p className="self-stretch text-[color:var(--Text,#212121)] [font-family:Manrope] text-[17px] font-bold leading-[normal]">
              {t("general")}
            </p>
            {MyGeneralList.map((item) => (
              <SidebarItem
                label={item.name}
                key={item.status}
                Icon={item.Icon}
                active={status === item.status}
                danger={item.status == "logOut"}
                onClick={() => setStatus(item.status)}
              />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
