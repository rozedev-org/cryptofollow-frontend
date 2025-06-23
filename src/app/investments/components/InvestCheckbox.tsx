"use client";
import { Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InvestmentIdentity } from "../types/investment.types";
import { useActionBarData } from "../states/useInvestActionBar";

interface InvestCheckboxProps {
  invest: InvestmentIdentity;
}

export const InvestCheckbox = ({ invest }: InvestCheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const { addTotalSum, reduceTotalSum, resetSignal, clearTotalSum } =
    useActionBarData();

  const handleChange = (e: any) => {
    const isChecked = !!e.checked;
    setChecked(isChecked);
    if (isChecked) {
      addTotalSum(invest.pairAmount);
    } else {
      reduceTotalSum(invest.pairAmount);
    }
  };
  useEffect(() => {
    setChecked(false);
  }, [resetSignal]);

  useEffect(() => {
    clearTotalSum();
  }, []);

  return (
    <Checkbox.Root onCheckedChange={handleChange} checked={checked}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
    </Checkbox.Root>
  );
};
