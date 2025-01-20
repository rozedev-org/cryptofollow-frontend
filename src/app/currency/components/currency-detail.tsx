import { Stack, VStack } from "@chakra-ui/react";
import {
  DialogTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../../components/ui/dialog";
import { DataListItem, DataListRoot } from "../../../components/ui/data-list";
import { MenuItem } from "../../../components/ui/menu";
import { NumericFormat } from "react-number-format";
import { CurrencyIdentity } from "@/app/investments/types/crypto.types";

interface CurrencyDialogDetailProps {
  currency: CurrencyIdentity;
}
export const CurrencyDialogDetail = (props: CurrencyDialogDetailProps) => {
  const { currency } = props;

  return (
    <DialogRoot placement={"center"}>
      <VStack alignItems="start">
        <DialogTrigger asChild>
          <MenuItem value="detail">Detalle</MenuItem>
        </DialogTrigger>
        <DialogContent p={"30px"}>
          <DialogHeader>
            <DialogTitle pb={5}>Moneda : {currency.name}</DialogTitle>
          </DialogHeader>
          <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
            <DataListRoot orientation="horizontal">
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Precio (USDT)"
                value={
                  currency.price <= 1 ? (
                    <Stack ml={"auto"}>
                      <NumericFormat
                        displayType="text"
                        value={currency.price}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={8}
                        fixedDecimalScale
                        suffix={` $`}
                      />
                    </Stack>
                  ) : (
                    <Stack ml={"auto"}>
                      <NumericFormat
                        displayType="text"
                        value={currency.price}
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale
                        suffix={` $`}
                      />
                    </Stack>
                  )
                }
              />
            </DataListRoot>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </VStack>
    </DialogRoot>
  );
};
