import { BasePage } from "@/components/layout/base-page/base-page";
import { ProfileCard } from "./components/profileCard";

export default function ProfilePage() {
  return (
    <BasePage alignItems={"center"} justifyContent={"center"}>
      <ProfileCard />
    </BasePage>
  );
}
