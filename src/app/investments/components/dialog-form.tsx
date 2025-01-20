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
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { config } from "@/config";
import { LoadItem } from "@/components/layout/loading";
import { useUserSession } from "@/app/states/useUserId";
import { useHandleData } from "@/app/states/useHandleData";
import { useCurrencies } from "@/app/currency/hook/useCurrencies";

export const InvestmentDialogForm = () => {
  const { id } = useUserSession();
  const [open, setOpen] = useState(false);
  const { creating, setIsCreating, handleRefreshSignal } = useHandleData();
  const { currency, fetchCurrencies } = useCurrencies();
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
          <Formik
            initialValues={{
              buyPrice: 0,
              currencyInvestment: 0,
              currencyId: 0,
              userId: 0,
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
                const defaultValue = { ...values, userId: id };
                const { bff } = config;
                const response = await fetch(`${bff.url}/investments`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(defaultValue),
                  credentials: "include",
                });
                toast.success(`Se ha creado una inversion`);
                console.log(response);
                handleRefreshSignal(true);
                setOpen(false);
                setIsCreating(false);
              } catch (error) {
                toast.error("Ha ocurrido un error al crear la inversion");
                console.log(error);
                setOpen(true);
                setIsCreating(false);
              }
              setSubmitting(false);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Field label="Precio de Compra">
                  <Input
                    name="buyPrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
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
