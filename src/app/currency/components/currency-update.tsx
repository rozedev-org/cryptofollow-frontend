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
import { MenuItem } from "@/components/ui/menu";
import { config } from "@/config";
import { LoadItem } from "@/components/layout/loading";
import { CurrencyIdentity } from "@/app/investments/types/investment.types";
import { useHandleData } from "@/app/states/useHandleData";

interface CurrencyDialogUpdateProps {
  currency: CurrencyIdentity;
}

export const CurrencyDialogUpdate = (props: CurrencyDialogUpdateProps) => {
  const [open, setOpen] = useState(false);
  const { currency } = props;
  const { creating, setIsCreating, handleRefreshSignal } = useHandleData();
  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <MenuItem value="detail">Editar</MenuItem>
      </DialogTrigger>
      <DialogContent p={"30px"}>
        <DialogHeader>
          <DialogTitle pb={5}>Moneda : {currency.name}</DialogTitle>
        </DialogHeader>
        <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
          <Formik
            initialValues={{
              name: currency.name,
              pair: currency.pair,
              price: currency.price,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setIsCreating(true);
              try {
                const { bff } = config;
                const response = await fetch(
                  `${bff.url}/currency/${currency.id}`,
                  {
                    credentials: "include",
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  }
                );
                console.log(response);
                handleRefreshSignal(true);
                setOpen(false);
                setIsCreating(false);
                toast.success(`Se ha actualizado una Moneda`);
              } catch (error) {
                console.log(error);
                setOpen(true);
                setIsCreating(false);
                toast.error("Ha ocurrido un error al actualizar la Moneda");
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
                <Field label="Nombre de la Moneda">
                  <Input
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </Field>
                <Field label="Precio" mt={4}>
                  <Input
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                </Field>
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
