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
import { FaRegPlusSquare } from "react-icons/fa";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { toast } from "sonner";
import { config } from "@/config";
import { LoadItem } from "@/components/layout/loading";
import { useHandleData } from "@/app/states/useHandleData";

export const CurrencyDialogForm = () => {
  const [open, setOpen] = useState(false);
  const { creating, setIsCreating, handleRefreshSignal } = useHandleData();
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
                const defaultValue = { ...values, pair: "USDT" };
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
                <Field label="Nombre de la Moneda">
                  <Input
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field label="Precio de la moneda" mt={4}>
                  <Input
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
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
