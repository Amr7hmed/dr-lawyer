import { IconArowsRight } from "@/assets/icons";
import { useNavigate } from "react-router";
interface MyAccountsCardProps {
    Image: string;
    Title: string;
    RoleUser: string;
    CurrentCases: string;
    OffersSent: string;
    ToLink: string;
}

const MyAccountsCard = (props: MyAccountsCardProps) => {
    const { Image, Title, RoleUser, CurrentCases, OffersSent, ToLink } = props;
  const navigate = useNavigate();
    return (
        <div className="self-stretch p-2 bg-White rounded-[20px] inline-flex justify-start items-center gap-2 bg-white cursor-pointer"
                onClick={() => navigate(ToLink)} >
            <div className="flex-1 flex justify-start items-center gap-1">
                <img className="w-12 h-12 rounded-full border border-White" src={Image} />
                <div className="inline-flex flex-col justify-center items-start">
                    <div className="justify-center text-Gray-900 text-sm font-bold font-['Manrope']">{Title}</div>
                    <div className="justify-center text-[#667085] text-xs font-normal font-['Manrope']">{RoleUser}</div>
                </div>
            </div>
            <div className="flex justify-start items-center gap-2">
                <div className="inline-flex flex-col justify-start items-start">
                    <div className="justify-center text-[#667085] text-xs font-normal font-['Manrope']">Current cases</div>
                    <div className="justify-center text-[#101828] text-xs font-bold font-['Manrope']">{CurrentCases}</div>
                </div>
                <div className="inline-flex flex-col justify-start items-start">
                    <div className="justify-center text-[#667085] text-xs font-normal font-['Manrope']">offers Sent</div>
                    <div className="justify-center text-[#101828] text-xs font-bold font-['Manrope']">{OffersSent}</div>
                </div>
            </div>

                <IconArowsRight />
        </div>
    )
}

export default MyAccountsCard;