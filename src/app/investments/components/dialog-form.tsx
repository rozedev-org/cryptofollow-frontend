import { useCurrencies } from "@/app/currency/hook/useCurrencies";
import { useHandleData } from "@/app/states/useHandleData";
import { useUserSession } from "@/app/states/useUserId";
import { PaginationParams } from "@/common/interfaces/response.interface";
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
import { BiPlus } from "react-icons/bi";
import { useCreateInvestment } from "../hook/useInvestment";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";

export const InvestmentDialogForm = () => {
  const { id } = useUserSession();
  const [open, setOpen] = useState(false);
  const { creating } = useHandleData();
  const { currency, fetchCurrencies } = useCurrencies();
  const { investmentForm, onSubmit } = useCreateInvestment(id, setOpen);
  const queryPamas: PaginationParams = {
    page: 1,
    take: 1,
    getAll: true,
  };
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
            fetchCurrencies(queryPamas);
            setOpen(true);
          }}
        >
          <BiPlus />
          Agregar Inversión
        </Button>
      </DialogTrigger>
      <DialogContent p={"30px"}>
        <DialogHeader>
          <DialogTitle pb={5}>Agregar Nueva Inversión </DialogTitle>
        </DialogHeader>
        <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
          <form onSubmit={onSubmit}>
            <Field
              label="Precio de Compra"
              helperText="Precio de compra de la moneda. Los decimales se separan por '.' "
              invalid={!!investmentForm.formState.errors.buyPrice}
              errorText={investmentForm.formState.errors.buyPrice?.message}
            >
              <NumberInputRoot name="buyPrice" w={"100%"}>
                <NumberInputField
                  onChange={(e) => {
                    let newValue = e.target.value;
                    newValue = newValue.replace(",", ".");
                    newValue = newValue.replace(/[^0-9.]/g, "");
                    const numericValue = parseFloat(newValue);
                    if (isNaN(numericValue)) {
                      investmentForm.setError("buyPrice", {
                        type: "manual",
                        message: "El valor ingresado no es un número válido",
                      });
                    } else {
                      investmentForm.setValue("buyPrice", numericValue);
                    }
                  }}
                  p={2}
                />
              </NumberInputRoot>
            </Field>
            <Field
              label="Seleccionar la mondeda"
              mt={4}
              invalid={!!investmentForm.formState.errors.currencyId}
              errorText={investmentForm.formState.errors.currencyId?.message}
            >
              <NativeSelectRoot>
                <NativeSelectField
                  p={2}
                  placeholder="Seleccionar moneda"
                  {...investmentForm.register("currencyId", {
                    required: "Este campo es requerido",
                  })}
                  onChange={(e) => {
                    investmentForm.setValue(
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
              invalid={!!investmentForm.formState.errors.currencyInvestment}
              errorText={
                investmentForm.formState.errors.currencyInvestment?.message
              }
            >
              <NumberInputRoot name="currencyInvestment" w={"100%"}>
                <NumberInputField
                  onChange={(e) => {
                    let newValue = e.target.value;
                    newValue = newValue.replace(",", ".");
                    newValue = newValue.replace(/[^0-9.]/g, "");
                    const numericValue = parseFloat(newValue);
                    if (isNaN(numericValue)) {
                      investmentForm.setError("buyPrice", {
                        type: "manual",
                        message: "El valor ingresado no es un número válido",
                      });
                    } else {
                      investmentForm.setValue(
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
