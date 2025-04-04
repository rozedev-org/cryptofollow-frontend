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
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { useState } from "react";
import { useCurrencies } from "@/app/currency/hook/useCurrencies";
import { useHandleData } from "@/app/states/useHandleData";
import { PaginationParams } from "@/common/interfaces/response.interface";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { InvestmentIdentity } from "../types/investment.types";
import { useUpdateInvestment } from "../hook/useInvestment";
import { useUserSession } from "@/app/states/useUserId";

interface InvestmentDialogUpdateProps {
  invest: InvestmentIdentity;
}

export const InvestmentDialogUpdate = (props: InvestmentDialogUpdateProps) => {
  const [open, setOpen] = useState(false);
  const { currency, fetchCurrencies } = useCurrencies();
  const { invest } = props;
  const { id } = useUserSession();
  const { creating } = useHandleData();
  const { onSubmit, updateInvestmentForm } = useUpdateInvestment(
    invest,
    setOpen,
    id
  );
  const queryPamas: PaginationParams = {
    page: 1,
    take: 1,
  };
  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => {
        fetchCurrencies(queryPamas);
        setOpen(e.open);
      }}
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
          <DialogTitle pb={5}>Inversion en : </DialogTitle>
        </DialogHeader>
        <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
          <form onSubmit={onSubmit}>
            <Field
              label="Precio de Compra"
              helperText="Precio de compra de la moneda. Los decimales se separan por '.' "
              invalid={!!updateInvestmentForm.formState.errors.buyPrice}
              errorText={
                updateInvestmentForm.formState.errors.buyPrice?.message
              }
            >
              <NumberInputRoot name="buyPrice" w={"100%"}>
                <NumberInputField
                  onChange={(e) => {
                    let newValue = e.target.value;
                    newValue = newValue.replace(",", ".");
                    newValue = newValue.replace(/[^0-9.]/g, "");
                    const numericValue = parseFloat(newValue);
                    if (isNaN(numericValue)) {
                      updateInvestmentForm.setError("buyPrice", {
                        type: "manual",
                        message: "El valor ingresado no es un número válido",
                      });
                    } else {
                      updateInvestmentForm.setValue("buyPrice", numericValue);
                    }
                  }}
                  p={2}
                  defaultValue={invest.buyPrice}
                />
              </NumberInputRoot>
            </Field>
            <Field
              label="Seleccionar la mondeda"
              mt={4}
              invalid={!!updateInvestmentForm.formState.errors.currencyId}
              errorText={
                updateInvestmentForm.formState.errors.currencyId?.message
              }
            >
              <NativeSelectRoot>
                <NativeSelectField
                  value={invest.currencyId}
                  p={2}
                  placeholder="Seleccionar moneda"
                  {...updateInvestmentForm.register("currencyId", {
                    required: "Este campo es requerido",
                  })}
                  onChange={(e) => {
                    updateInvestmentForm.setValue(
                      "currencyId",
                      parseInt(e.target.value)
                    );
                  }}
                >
                  {currency.data.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
            <Field
              label="Inversion de moneda"
              mt={4}
              helperText="Cantidad de moneda a invertir. Los decimales se separan por '.'"
              invalid={
                !!updateInvestmentForm.formState.errors.currencyInvestment
              }
              errorText={
                updateInvestmentForm.formState.errors.currencyInvestment
                  ?.message
              }
            >
              <NumberInputRoot name="currencyInvestment" w={"100%"}>
                <NumberInputField
                  defaultValue={invest.currencyInvestment}
                  onChange={(e) => {
                    let newValue = e.target.value;
                    newValue = newValue.replace(",", ".");
                    newValue = newValue.replace(/[^0-9.]/g, "");
                    const numericValue = parseFloat(newValue);
                    if (isNaN(numericValue)) {
                      updateInvestmentForm.setError("buyPrice", {
                        type: "manual",
                        message: "El valor ingresado no es un número válido",
                      });
                    } else {
                      updateInvestmentForm.setValue(
                        "currencyInvestment",
                        numericValue
                      );
                    }
                  }}
                  p={2}
                />
              </NumberInputRoot>
            </Field>
            <Button
              loading={creating}
              variant={"outline"}
              type="submit"
              p={2}
              mt={6}
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
