"use client";
import { useEffect, useState } from "react";
import {
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FaChartLine } from "react-icons/fa";
import { Card, Text } from "@chakra-ui/react";
import { CurrencyListCard } from "./currencyCard";
import { useBinanceCurrencies } from "@/app/currency/hook/useCurrencies";

export const CurrencyListMobileDialog = () => {
  const { currency, fetchBinanceCurrencies } = useBinanceCurrencies();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBinanceCurrencies();
  }, []);
  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <Button
          ml={"auto"}
          p={2}
          borderRadius={"md"}
          variant="outline"
          onClick={() => {
            setOpen(true);
          }}
        >
          <FaChartLine />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Card.Root
          height={"100vh"}
          display={"flex"}
          alignItems={"center"}
          pt={5}
        >
          <DialogCloseTrigger />
          <Card.Header
            color={"#1A1B2F"}
            fontSize={"18px"}
            fontWeight={500}
            pb={"23px"}
          >
            <Text>Mercado</Text>
          </Card.Header>
          <Card.Body overflowY={"scroll"} w={"80%"}>
            {currency.map((item, i) => {
              return (
                <CurrencyListCard
                  key={`${item.symbol}-${i}	`}
                  price={item.price}
                  symbol={item.symbol}
                />
              );
            })}
          </Card.Body>
        </Card.Root>
      </DialogContent>
    </DialogRoot>
  );
};
