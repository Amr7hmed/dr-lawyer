import ProfileFormEdit from "./forms/editProfile";
import ProfileFormAddress from "./forms/address";
import ProfileNotifications from "./forms/profileNotifications";
import LanguageForm from "./forms/LanguageForm";
import HelpSupportForm from "./forms/HelpSupportForm"
import PaymentMethods from "./forms/PaymentMethods";
import MySpendings from "./forms/MySpendings";
import ReportIssue from "./forms/ReportIssue";

type ProfileFormProps = {
  status: string;
};

const ProfileForm = ({ status }: ProfileFormProps) => {
  const renderForm = () => {
    switch (status) {
      case "editProfile":
        return <ProfileFormEdit />;
      case "address":
        return <ProfileFormAddress />;
      case "notification":
        return <ProfileNotifications />;
      case "language":
        return <LanguageForm />;
      case "helpSupport":
        return <HelpSupportForm />;
      case "myPaymentMethod":
        return <PaymentMethods />
      case "mySpendings":
        return <MySpendings />
      case "aboutUs":
        return <ReportIssue />


      default:
        return <ProfileFormEdit />; // fallback
    }
  };

  return (
    <main
      className="flex-1 bg-white shadow rounded-2xl md:w-2/3 h-min 
        inline-flex flex-col items-start gap-[35.014px]  pl-6 pr-[25px] pt-[27px] pb-[49.168px]"
    >
      {renderForm()}
    </main>
  );
};

export default ProfileForm;
