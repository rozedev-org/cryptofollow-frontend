import { BasePage } from "@/components/layout/base-page/base-page";
import { UserTable } from "./components/userTable";

export default function UsersPage() {
  return (
    <BasePage>
      <UserTable />
    </BasePage>
  );
}
