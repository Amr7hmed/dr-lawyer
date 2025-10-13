import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SignupEmail from "./signupEmail";
import SignupPhone from "./signupPhone";

const SignupStep1 = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [tab, setTab] = useState("Phone");
  const { t } = useTranslation("signup");

  useEffect(() => {
    const timeout = setTimeout(() => setHasMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-accent mb-8 h-10 w-full rounded-4xl">
          <TabsTrigger
            value="Phone"
            className="text-muted cursor-pointer rounded-4xl data-[state=active]:pointer-events-none data-[state=active]:bg-white! data-[state=active]:text-black"
          >
            {t("step1.phone")}
          </TabsTrigger>
          <TabsTrigger
            value="Email"
            className="text-muted cursor-pointer rounded-4xl data-[state=active]:pointer-events-none data-[state=active]:bg-white! data-[state=active]:text-black"
          >
            {t("step1.email")}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        {tab === "Phone" && (
          <motion.div
            key="phoneTab"
            initial={!hasMounted ? false : { x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SignupPhone />
          </motion.div>
        )}

        {tab === "Email" && (
          <motion.div
            key="emailTab"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SignupEmail />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignupStep1;
