import ProfileHeader from "@/components/sections/lawyer/profileLawyer/profileheader";
import SettingsList from "@/components/sections/lawyer/profileLawyer/settingslist";
export default function ProfileLawyer() {

  return (
    <div className="w-full flex flex-col gap-3 h-[90vh]">
      <ProfileHeader/>
      <SettingsList/>
    </div>
  );
}
