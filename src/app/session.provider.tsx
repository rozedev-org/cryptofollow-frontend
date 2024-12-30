/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { appRoutes } from "@/appRoutes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserSession } from "./states/useUserId";

export const UserSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { validateSession, isExpired } = useUserSession();

  const router = useRouter();

  const handleValidateSession = async () => {
    const result = await validateSession();
    if (!result) {
      router.push(appRoutes.home.login.url());
    }
  };
  useEffect(() => {
    handleValidateSession();
  }, []);

  useEffect(() => {
    if (isExpired) {
      router.push(appRoutes.home.login.url());
    }
  }, [isExpired]);

  return children;
};
