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
import { FaRegPlusSquare } from "react-icons/fa";
import { Field } from "@/components/ui/field";
import { LoadItem } from "@/components/layout/loading";
import { useHandleData } from "@/app/states/useHandleData";
import { useBinanceCurrencies, useCreateCurrency } from "../hook/useCurrencies";
import { Input } from "@chakra-ui/react";

export const CurrencyDialogForm = () => {
  const [open, setOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [search, setSearch] = useState("");
  const { currency, fetchBinanceCurrencies } = useBinanceCurrencies();
  const { currencyForm, onSubmit } = useCreateCurrency(setOpen);
  const { creating } = useHandleData();
  useEffect(() => {
    if (open) {
      setSelectedPrice(0);
      fetchBinanceCurrencies();
    }
  }, [open]);

  const handlePriceState = (symbol: string) => {
    const selectedCurrency = currency.find((item) => item.symbol === symbol);
    if (selectedCurrency) {
      const price = Number(selectedCurrency.price);
      setSelectedPrice(price);
      currencyForm.setValue("price", price);
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
          variant="plain"
          onClick={() => {
            setOpen(true);
          }}
        >
          <FaRegPlusSquare />
        </Button>
      </DialogTrigger>
      <DialogContent p={"30px"}>
        <DialogHeader>
          <DialogTitle pb={5}>Creacion de Moneda</DialogTitle>
        </DialogHeader>
        <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
          <form onSubmit={onSubmit}>
            <Field label="Buscar moneda:">
              <Input
                p={2}
                list="cryptoList"
                id="name"
                placeholder="Ejemplo: BTC / DOGE"
                autoComplete="off"
                onChange={(e) => {
                  handlePriceState(e.target.value);
                  setSearch(e.target.value);
                  currencyForm.setValue("name", e.target.value);
                  currencyForm.setValue("pair", "USDT");
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
                placeholder="Precio"
                name="price"
                p={2}
                value={selectedPrice}
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
