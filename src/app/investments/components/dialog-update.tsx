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
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";

import { useCurrencies } from "@/app/currency/hook/useCurrencies";
import { useHandleData } from "@/app/states/useHandleData";
import { useUserSession } from "@/app/states/useUserId";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { LoadItem } from "@/components/layout/loading";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { config } from "@/config";
import { InvestmentIdentity } from "../types/investment.types";

interface InvestmentDialogUpdateProps {
  invest: InvestmentIdentity;
}

export const InvestmentDialogUpdate = (props: InvestmentDialogUpdateProps) => {
  const [open, setOpen] = useState(false);
  const { id } = useUserSession();
  const { currency, fetchCurrencies } = useCurrencies();
  const { invest } = props;
  const { creating, setIsCreating, handleRefreshSignal } = useHandleData();
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
          <Formik
            initialValues={{
              buyPrice: invest.buyPrice,
              currencyInvestment: invest.currencyInvestment,
              currencyId: invest.currencyId,
              userId: 1,
            }}
            // validate={(values) => {
            //   const errors = {
            //     buyPrice: "",
            //     currencyInvestment: "",
            //     currencyId: "",
            //     userId: "",
            //   };
            //   if ((values.userId = 0)) {
            //     errors.userId = "Required";
            //   }
            //   return errors;
            // }}
            onSubmit={async (values, { setSubmitting }) => {
              setIsCreating(true);
              try {
                const { bff } = config;
                const defaultValue = { ...values, userId: id };
                const response = await fetch(
                  `${bff.url}/investments/${invest.id}`,
                  {
                    credentials: "include",
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(defaultValue),
                  }
                );

                if (!response.ok) {
                  throw new Error("Error al actualizar la inversion");
                }

                toast.success(`Se ha actualizado una inversion`);
                console.log(response);
                handleRefreshSignal(true);
                setOpen(false);
                setIsCreating(false);
              } catch (error) {
                toast.error("Ha ocurrido un error al actualizar la inversion");
                console.log(error);
                setOpen(true);
                setIsCreating(false);
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  label="Precio de Compra"
                  helperText="Precio de compra de la moneda. Los decimales se separan por '.' "
                >
                  <NumberInputRoot name="buyPrice" w={"100%"}>
                    <NumberInputField
                      onChange={handleChange}
                      p={2}
                      defaultValue={values.buyPrice}
                    />
                  </NumberInputRoot>
                </Field>
                <Field label="Seleccionar la mondeda" mt={4}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Selecciona mano"
                      name="currencyId"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                >
                  <NumberInputRoot name="currencyInvestment" w={"100%"}>
                    <NumberInputField
                      onChange={handleChange}
                      p={2}
                      defaultValue={values.currencyInvestment}
                    />
                  </NumberInputRoot>
                </Field>
                {/* {errors.email && touched.email && errors.email} */}
                {/* {errors.password && touched.password && errors.password} */}
                {creating && <LoadItem />}
                <Button
                  variant={"outline"}
                  type="submit"
                  disabled={isSubmitting}
                  mt={6}
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
