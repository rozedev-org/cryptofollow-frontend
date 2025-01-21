import { useCurrencies } from "@/app/currency/hook/useCurrencies";
import { useHandleData } from "@/app/states/useHandleData";
import { useUserSession } from "@/app/states/useUserId";
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
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { useCreateInvestment } from "../hook/useInvestment";

export const InvestmentDialogForm = () => {
  const { id } = useUserSession();
  const [open, setOpen] = useState(false);
  const { creating } = useHandleData();
  const { currency, fetchCurrencies } = useCurrencies();
  const { investmentForm, onSubmit } = useCreateInvestment(id);

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
            fetchCurrencies();
            setOpen(true);
          }}
        >
          <FaRegPlusSquare />
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
              invalid={!!investmentForm.formState.errors.buyPrice}
              errorText={investmentForm.formState.errors.buyPrice?.message}
            >
              <Input
                p={2}
                type="text"
                {...investmentForm.register("buyPrice", {
                  required: "Este campo es requerido",
                  onChange: (e) => {
                    let newValue = e.target.value;
                    // Reemplazar comas por puntos
                    newValue = newValue.replace(",", ".");
                    // Eliminar caracteres no numéricos, excepto el punto
                    newValue = newValue.replace(/[^0-9.]/g, "");
                    //  Convertir a número flotante
                    const numericValue = parseFloat(newValue);
                    if (isNaN(numericValue)) {
                      investmentForm.setError("buyPrice", {
                        type: "manual",
                        message: "El valor ingresado no es un número válido",
                      });
                    } else {
                      investmentForm.setValue("buyPrice", numericValue);
                    }
                  },
                })}
              />
            </Field>

            <Field
              label="Seleccionar la mondeda"
              mt={4}
              invalid={!!investmentForm.formState.errors.currencyId}
              errorText={investmentForm.formState.errors.currencyId?.message}
            >
              <NativeSelectRoot>
                <NativeSelectField
                  placeholder="Seleccionar moneda"
                  {...investmentForm.register("currencyId", {
                    required: "Este campo es requerido",
                  })}
                  // onChange={(e) => {
                  //   investmentForm.setValue(
                  //     "currencyId",
                  //     parseInt(e.target.value)
                  //   );
                  // }}
                >
                  {currency.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>

            <Field
              label="Cantidad de Inversion"
              mt={4}
              invalid={!!investmentForm.formState.errors.currencyInvestment}
              errorText={
                investmentForm.formState.errors.currencyInvestment?.message
              }
            >
              <Input
                p={2}
                {...investmentForm.register("currencyInvestment", {
                  required: "Este campo es requerido",
                })}
              />
            </Field>

            <Button loading={creating} variant={"outline"} type="submit" mt={6}>
              Enviar
            </Button>
          </form>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
