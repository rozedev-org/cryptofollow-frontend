import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { LoadItem } from "@/components/layout/loading";
import { useHandleData } from "@/app/states/useHandleData";
import { CurrencyIdentity } from "../types/currency.types";
import { useBinanceCurrencies, useUpdateCurrency } from "../hook/useCurrencies";

interface CurrencyDialogUpdateProps {
  currency: CurrencyIdentity;
}

export const CurrencyDialogUpdate = (props: CurrencyDialogUpdateProps) => {
  const [open, setOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(props.currency.price);
  const [search, setSearch] = useState("");
  const { currency, fetchBinanceCurrencies } = useBinanceCurrencies();
  const { updateCurrencyForm, onSubmit } = useUpdateCurrency(
    props.currency,
    setOpen
  );
  const { creating } = useHandleData();
  useEffect(() => {
    if (open) {
      fetchBinanceCurrencies();
    }
  }, [open]);

  const handlePriceState = (symbol: string) => {
    const selectedCurrency = currency.find((item) => item.symbol === symbol);
    if (selectedCurrency) {
      const price = Number(selectedCurrency.price);
      setSelectedPrice(price);
      updateCurrencyForm.setValue("price", price);
    }
  };
  const filteredCurrency = currency
    .filter((item) => item.symbol.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <Button
          justifyContent={"flex-start"}
          w={"100%"}
          p={1}
          variant={"subtle"}
          size={"xs"}
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent p={"30px"}>
        <DialogHeader>
          <DialogTitle pb={5}>Moneda : {props.currency.name}</DialogTitle>
        </DialogHeader>
        <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
          <form onSubmit={onSubmit}>
            <Field label="Buscar moneda:">
              <Input
                defaultValue={props.currency.name}
                p={2}
                list="cryptoList"
                id="name"
                placeholder="Ejemplo: BTC / DOGE"
                autoComplete="off"
                onChange={(e) => {
                  handlePriceState(e.target.value);
                  setSearch(e.target.value);
                  updateCurrencyForm.setValue("name", e.target.value);
                  updateCurrencyForm.setValue("pair", "USDT");
                }}
              />
            </Field>
            <datalist id="cryptoList">
              {filteredCurrency.map((item, i) => (
                <option value={item.symbol} key={i}>
                  {item.symbol}
                </option>
              ))}
            </datalist>
            <Field label="Precio de Moneda">
              <Input
                value={selectedPrice}
                placeholder="Precio"
                name="price"
                p={2}
                readOnly
              />
            </Field>

            {creating && <LoadItem />}
            <Button
              variant={"outline"}
              type="submit"
              disabled={creating}
              mt={6}
              p={2}
            >
              Enviar
            </Button>
          </form>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
