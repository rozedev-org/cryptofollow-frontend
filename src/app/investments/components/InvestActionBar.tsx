import { ActionBar, CloseButton, Portal, Text } from "@chakra-ui/react";
import { useActionBarData } from "../states/useInvestActionBar";
import { NumericFormat } from "react-number-format";

export const InvestActionBar = () => {
  const { totalSum, totalSelected, clearTotalSum, toggleResetSignal } =
    useActionBarData();

  if (totalSelected === 0) return null;

  return (
    <Portal>
      <ActionBar.Root open>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger p={2}>
              <NumericFormat
                displayType="text"
                value={totalSum}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                suffix={` $`}
              />
            </ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <ActionBar.SelectionTrigger p={2}>
              <Text>Seleccionados : {totalSelected}</Text>
            </ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <ActionBar.CloseTrigger asChild>
              <CloseButton
                size="sm"
                onClick={() => {
                  clearTotalSum();
                  toggleResetSignal();
                }}
              />
            </ActionBar.CloseTrigger>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Root>
    </Portal>
  );
};
