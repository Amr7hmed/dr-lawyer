import Container from "@/components/ui/container";
import Sidebar from "@/components/sections/client/profile/sidebar";
import ProfileForm from "@/components/sections/client/profile/profileForm";
import { useState } from "react";

export default function ProfileClient() {
  const [status, setStatus] = useState("editProfile");

  return (
    <Container className="flex flex-col md:flex-row gap-6 my-6">
      <Sidebar setStatus={setStatus} status={status} />
      <ProfileForm status={status} />
    </Container>
  );
}
