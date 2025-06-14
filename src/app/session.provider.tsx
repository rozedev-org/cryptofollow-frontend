/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { appRoutes } from "@/appRoutes";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useUserSession } from "./states/useUserId";
import { useFilterStore } from "./states/useFilterData";

export const UserSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { validateSession, isExpired } = useUserSession();
  const { clearFilter } = useFilterStore();
  const router = useRouter();
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  const handleValidateSession = async () => {
    const result = await validateSession();
    if (!result && pathname !== appRoutes.home.login.url()) {
      router.push(appRoutes.home.login.url());
    }
  };
  useEffect(() => {
    handleValidateSession();
    if (previousPath.current !== null && previousPath.current !== pathname) {
      clearFilter();
    }
    previousPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (isExpired) {
      router.push(appRoutes.home.login.url());
    }
  }, [isExpired]);

  return children;
};
