import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, MapPin } from "lucide-react";

interface LawyerCardProps {
  name: string;
  location: string;
  rate: string;
  ratings: string;
  experience: string;
  avatar?: string;
}

export default function LawyerCard({
  name,
  location,
  rate,
  ratings,
  experience,
  avatar,
}: LawyerCardProps) {
  const { t } = useTranslation("clientHome");

  return (
    <div className="border-card-border rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <Avatar className="h-14 w-14">
          <AvatarImage src={avatar} alt={`${name} Avatar`} />
          <AvatarFallback className="bg-icon">
            {name?.[0] ?? "L"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h3 className="text-foreground flex items-center gap-1 text-lg font-semibold">
            {name}
            <BadgeCheck className="mt-0.5 h-5 w-5 fill-blue-500 text-white" />
          </h3>
          <div className="text-muted-foreground flex items-center text-sm">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 pt-2 text-center">
        <div className="space-y-1">
          <div className="text-muted text-sm font-bold">{rate}</div>
          <div className="text-muted-foreground text-xs">{t("rate")}</div>
        </div>
        <div className="border-border-light space-y-1 border-r border-l px-2">
          <div className="text-muted text-sm font-bold">{ratings}</div>
          <div className="text-muted-foreground text-xs">{t("ratings")}</div>
        </div>
        <div className="space-y-1">
          <div className="text-muted text-sm font-bold">
            {experience} {t("years")}
          </div>
          <div className="text-muted-foreground text-xs">{t("experience")}</div>
        </div>
      </div>
    </div>
  );
}
