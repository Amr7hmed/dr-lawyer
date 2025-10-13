import { useState } from "react";
import {
  IconTimeCircle,
  IconBoldWallet, 
  IconBoldLocation, 
  IconBoldProfile,
  IconBoldLanguage,
  IconBoldNotification,
  IconBoldAboutUs,
  IconPrivacyPolicyTerms,
  IconBoldHelpAndSupport,
  IconReferAFriend, IconMultipleAccounts
} from "@/assets/icons";
import { SettingsItem, SettingsItemButton, SettingsPageLanguage } from "./settingsitem";
import EditAvailabilityModal from "./editAvailabilityModal";

const SettingsList = () => {
  const [availability, setAvailability] = useState(true);
  const [editAvailabilityModal, setEditAvailabilityModal] = useState(false);

  return (<>
    <div className="bg-white rounded-xl p-6 flex gap-8 shadow-sm flex-wrap flex-1">
      {/* My Account */}
      <div className="min-w-[280px] w-[30%]">
        <h3 className="mb-4 font-bold text-[20px]">My Account</h3>

        <div className="px-3">
          {/* Toggle Item */}
          <div className="flex items-center justify-between mb-2 bg-white h-14 rounded-full 
           px-4 border border-[#D3DAEA] gap-2 transition-all duration-200 hover:bg-[#f1f1f5]">
            <span className="text-[15px]">Availability</span>
            <label className="relative inline-block w-10 h-5">
              <input
                type="checkbox"
                checked={availability}
                onChange={() => setAvailability(!availability)}
                className="opacity-0 w-0 h-0 peer"
              />
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] rounded-full transition peer-checked:bg-[#3e0e0e] before:content-[''] before:absolute before:h-[14px] before:w-[14px] before:left-[3px] before:bottom-[3px] before:bg-white before:rounded-full before:transition peer-checked:before:translate-x-5"></span>
            </label>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            By turning off you will not receive any appointment.
          </p>

          <SettingsItemButton ImgIcon={IconTimeCircle} text="Edit Availability Time" felx={"flex-1"} Action={() => {
            setEditAvailabilityModal(true)
          }} />
          <SettingsItem ImgIcon={IconBoldLocation} text="Edit Address" felx={"flex-1"}
            to="/settings/profile" />
          <SettingsItem ImgIcon={IconBoldWallet} text="Withdraw Earning" felx={"flex-1"}
            to="/settings/profile" />
          <SettingsItem ImgIcon={IconMultipleAccounts} text="My Accounts" felx={"flex-1"}
            to="/lawyer/settings/myaccountsettings" />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-[#e4e4e4] max-md:hidden" />

      {/* General */}
      <div className="min-w-[280px] flex-1">
        <h3 className="mb-4 font-bold text-[20px]">General</h3>

        <div className="px-3 space-y-3">
          <div className="flex gap-2 max-md:flex-col">


            <SettingsItem ImgIcon={IconBoldProfile} text="Edit Profile" felx={"flex-1"}
              to="/lawyer/settings/edit" />
            <SettingsItem ImgIcon={IconPrivacyPolicyTerms} text="Privacy Policy & Terms" felx={"flex-1"} to="/lawyer/settings/contactsupport" />
          </div>



          <div className="flex gap-2 max-md:flex-col">
            <SettingsPageLanguage />
            <SettingsItem ImgIcon={IconBoldHelpAndSupport} text="Help and Support" felx={"flex-1"}
              to="/lawyer/settings/helpandsupport" />
          </div>

          <div className="flex gap-2 max-md:flex-col">
            <SettingsItem ImgIcon={IconBoldNotification} text="Notification" felx={"flex-1"}
              to="/lawyer/settings/notification" />
            <SettingsItem ImgIcon={IconReferAFriend} text="Refer a Friend" felx={"flex-1"}
              to="/lawyer/settings/profile" />
          </div>

          <div className="flex gap-2 max-md:flex-col">
            <SettingsItem ImgIcon={IconBoldAboutUs} text="About Us" felx={"basis-1/2"}
              to="/lawyer/settings/aboutus" />
          </div>
        </div>
      </div>
    </div>
    {/* Modal */}
    {editAvailabilityModal && (
      <EditAvailabilityModal onClose={() => setEditAvailabilityModal(false)} />
    )}
  </>
  );
};

export default SettingsList;


