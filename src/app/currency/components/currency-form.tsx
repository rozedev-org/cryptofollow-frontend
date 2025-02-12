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
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { Field } from "@/components/ui/field";
import { toast } from "sonner";
import { config } from "@/config";
import { LoadItem } from "@/components/layout/loading";
import { useHandleData } from "@/app/states/useHandleData";
import { useBinanceCurrencies } from "../hook/useCurrencies";
import { Input } from "@chakra-ui/react";

export const CurrencyDialogForm = () => {
  const [open, setOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [search, setSearch] = useState("");
  const { currency, fetchBinanceCurrencies } = useBinanceCurrencies();
  const { creating, setIsCreating, handleRefreshSignal } = useHandleData();
  useEffect(() => {
    setSelectedPrice("");
    if (open) {
      fetchBinanceCurrencies();
    }
  }, [open]);

  const handlePriceState = (symbol: string) => {
    const selectedCurrency = currency.find((item) => item.symbol === symbol);
    if (selectedCurrency) {
      setSelectedPrice(selectedCurrency.price);
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
          <Formik
            initialValues={{
              name: "",
              pair: "",
              price: 0,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setIsCreating(true);
              try {
                const defaultValue = {
                  ...values,
                  price: selectedPrice,
                  pair: "USDT",
                };
                const { bff } = config;
                const response = await fetch(`${bff.url}/currency`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(defaultValue),
                  credentials: "include",
                });
                console.log(response);
                handleRefreshSignal(true);
                setOpen(false);
                setIsCreating(false);
                toast.success(`Se ha creado una Moneda`);
              } catch (error) {
                toast.error("Ha ocurrido un error al crear la Moneda");
                console.log(error);
                setOpen(true);
                setIsCreating(false);
              }
              setSubmitting(false);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Field label="Buscar moneda:">
                  <Input
                    p={2}
                    list="cryptoList"
                    id="name"
                    placeholder="Ejemplo: BTC / DOGE"
                    autoComplete="off"
                    onChange={(e) => {
                      handlePriceState(e.target.value);
                      handleChange(e);
                      setSearch(e.target.value);
                    }}
                    onBlur={handleBlur}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly
                  />
                </Field>

                {creating && <LoadItem />}

                <Button
                  variant={"outline"}
                  type="submit"
                  disabled={isSubmitting}
                  mt={6}
                  p={2}
                >
                  Enviar
                </Button>
              </form>
            )}
          </Formik>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
