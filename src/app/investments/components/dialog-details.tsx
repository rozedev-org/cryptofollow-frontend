"use client";

import { CryptoData } from "@/app/investments/page";
import { Badge, Text, VStack } from "@chakra-ui/react";
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

interface InvestmentDialogDetailProps {
  title: string;
  currencyId: number;
}
export const InvestmentDialogDetail = (props: InvestmentDialogDetailProps) => {
  const { title } = props;

  return (
    <DialogRoot placement={"center"}>
      <VStack alignItems="start">
        <DialogTrigger asChild>
          <MenuItem value="detail">{title}</MenuItem>
        </DialogTrigger>
        <DialogContent p={"30px"}>
          <DialogHeader>
            <DialogTitle pb={5}>Inversion en : {"data.currency"}</DialogTitle>
          </DialogHeader>
          <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
            <DataListRoot orientation="horizontal">
              <DataListItem
                label="Ganancias"
                value={
                  2 >= 1 ? (
                    <Badge colorPalette="green">{3}%</Badge>
                  ) : (
                    <Badge colorPalette="red">{4}%</Badge>
                  )
                }
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Precio (USDT)"
                value={<Text ml={"auto"}>{6} $</Text>}
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Ganancias (USDT)"
                value={<Text ml={"auto"}>{5} $</Text>}
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Inversion (USDT)"
                value={<Text ml={"auto"}>{6} $</Text>}
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Total (USDT)"
                value={<Text ml={"auto"}>{6} $</Text>}
              />
            </DataListRoot>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </VStack>
    </DialogRoot>
  );
};
