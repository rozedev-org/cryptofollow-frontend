/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { appRoutes } from "@/appRoutes";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUserSession } from "./states/useUserId";

export const UserSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { validateSession, isExpired } = useUserSession();

  const router = useRouter();
  const pathname = usePathname();
  const handleValidateSession = async () => {
    const result = await validateSession();
    if (!result && pathname !== appRoutes.home.login.url()) {
      router.push(appRoutes.home.login.url());
    }
  };
  useEffect(() => {
    handleValidateSession();
  }, [pathname]);

  useEffect(() => {
    if (isExpired) {
      router.push(appRoutes.home.login.url());
    }
  }, [isExpired]);

  return children;
};
