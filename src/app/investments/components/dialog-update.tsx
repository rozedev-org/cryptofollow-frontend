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
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";

import { useCurrencies } from "@/app/currency/hook/useCurrencies";
import { useHandleData } from "@/app/states/useHandleData";
import { useUserSession } from "@/app/states/useUserId";
import { LoadItem } from "@/components/layout/loading";
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
  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => {
        fetchCurrencies();
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
                <Field label="Precio de Compra">
                  <Input
                    name="buyPrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.buyPrice}
                  />
                </Field>
                <Field label="Seleccionar la mondeda" mt={4}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Selecciona mano"
                      name="currencyId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {currency.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
                <Field label="Inversion de moneda" mt={4}>
                  <Input
                    name="currencyInvestment"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.currencyInvestment}
                  />
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
