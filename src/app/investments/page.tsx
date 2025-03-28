"use client";
import { BasePage } from "@/components/layout/base-page/base-page";
import { Investments } from "./components/InvestmentTable";

export default function InvestmentsPage() {
  return (
    <BasePage>
      <Investments />
    </BasePage>
  );
}
