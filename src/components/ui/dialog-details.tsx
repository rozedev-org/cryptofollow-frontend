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
} from "./dialog";
import { DataListItem, DataListRoot } from "./data-list";

interface DialogComponentProps {
  title: string;
  data: CryptoData;
}
export const DialogComponent = (props: DialogComponentProps) => {
  const { title, data } = props;
  console.log(data);
  return (
    <VStack alignItems="start">
      <DialogRoot placement={"center"}>
        <DialogTrigger asChild>
          <Text>{title}</Text>
        </DialogTrigger>
        <DialogContent p={"30px"}>
          <DialogHeader>
            <DialogTitle pb={5}>Inversion en : {data.currency}</DialogTitle>
          </DialogHeader>
          <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
            <DataListRoot orientation="horizontal">
              <DataListItem
                label="Ganancias"
                value={
                  data.gain24h >= 1 ? (
                    <Badge colorPalette="green">{data.gain24h}%</Badge>
                  ) : (
                    <Badge colorPalette="red">{data.gain24h}%</Badge>
                  )
                }
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Precio (USDT)"
                value={<Text ml={"auto"}>{data.priceUSDT} $</Text>}
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Ganancias (USDT)"
                value={<Text ml={"auto"}>{data.gainUSDT} $</Text>}
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Inversion (USDT)"
                value={<Text ml={"auto"}>{data.investmentUSDT} $</Text>}
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Total (USDT)"
                value={<Text ml={"auto"}>{data.totalUSDT} $</Text>}
              />
            </DataListRoot>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </VStack>
  );
};
