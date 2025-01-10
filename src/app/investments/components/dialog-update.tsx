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
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { toast } from "sonner";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { MenuItem } from "@/components/ui/menu";
import { InvestmentIdentity } from "../types/crypto.types";
import { config } from "@/config";
import { useNewData } from "@/app/states/useNewData";
import { LoadItem } from "@/components/layout/loading";

interface InvestmentDialogUpdateProps {
  title: string;
  invest: InvestmentIdentity;
}

export const InvestmentDialogUpdate = (props: InvestmentDialogUpdateProps) => {
  const [open, setOpen] = useState(false);
  const user = [{ value: "1", label: "Usuario 1" }];
  const currency = [{ value: "1", label: "BONK" }];
  const { title, invest } = props;
  const { creating, setIsCreating } = useNewData();
  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <MenuItem value="detail">{title}</MenuItem>
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

                const response = await fetch(
                  `${bff.url}/investments/${invest.id}`,
                  {
                    credentials: "include",
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  }
                );
                toast.success(`Se ha actualizado una inversion`);
                console.log(response);
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
                <Field label="Seleccionar la mondeda (Está en duro)" mt={4}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Selecciona mano"
                      items={currency}
                      name="currencyId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.currencyId}
                    />
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
                <Field label="Usuario (Está en duro)" mt={4}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Selecciona mano"
                      items={user}
                      name="userId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.userId}
                    />
                  </NativeSelectRoot>
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
