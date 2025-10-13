import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CircleDollarSign,
  MessageCircleMore,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type RequestCardProps = {
  request: {
    profileImage: string;
    fullName: string;
    duration: string;
    description: string;
    budget: number;
    rate: number;
    reviews: number;
  };
};

const RequestCard = ({ request }: RequestCardProps) => {
  const { t } = useTranslation("caseRequests");
  const {
    profileImage,
    fullName,
    duration,
    description,
    budget,
    rate,
    reviews,
  } = request;

  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      setShowSeeMore(element.scrollHeight > element.clientHeight);
    }
  }, [description]);

  return (
    <div className="border-border w-full rounded-xl border bg-white p-4 shadow-sm">
      {/* Mobile Actions */}
      <div className="ms-auto mb-4 flex w-full items-center justify-end gap-2 sm:hidden">
        <Button variant="ghost" size="icon">
          <MessageCircleMore className="fill-icon h-6.5! w-6.5! text-white" />
        </Button>
        <Button variant="outline" className="rounded-full">
          {t("card.remove")}
        </Button>
        <Button className="rounded-full px-6">{t("card.view")}</Button>
      </div>

      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative h-fit">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileImage || ""} alt="User Avatar" />
            <AvatarFallback className="bg-icon">
              {fullName?.[0]?.toUpperCase() ?? "M"}
            </AvatarFallback>
          </Avatar>
          <span className="absolute right-1 bottom-2 block h-3 w-3 rounded-full border-2 border-white bg-green-500" />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="mb-4 flex flex-col-reverse justify-between sm:flex-row">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-[#212121]">{fullName}</h4>
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#00a6ff]">
                  <span className="text-xs text-[#ffffff]">✓</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-black text-black" />
                <span className="text-muted font-medium">{rate}</span>
                <span className="text-muted">({reviews})</span>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="secondary" className="rounded-full" size="icon">
                <MessageCircleMore className="fill-icon h-6.5! w-6.5! text-white" />
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:text-primary rounded-full"
              >
                {t("card.remove")}
              </Button>
              <Button className="rounded-full px-8">{t("card.view")}</Button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-2">
            <p
              ref={textRef}
              className={cn(
                "text-foreground text-sm leading-relaxed font-medium",
                !isExpanded ? "line-clamp-2" : "",
              )}
            >
              {description}
            </p>
            {showSeeMore && (
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {isExpanded ? t("card.seeLess") : t("card.seeMore")}
              </button>
            )}
          </div>

          {/* Budget and Duration */}
          <div className="text-muted flex items-center gap-4 text-sm font-semibold">
            <div className="flex items-center gap-1">
              <CircleDollarSign className="text-icon h-4.5 w-4.5" />
              <span>${budget}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="text-icon h-4.5 w-4.5" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
