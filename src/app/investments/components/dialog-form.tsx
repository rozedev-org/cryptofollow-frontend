import { useCurrencies } from "@/app/currency/hook/useCurrencies";
import { useHandleData } from "@/app/states/useHandleData";
import { useUserSession } from "@/app/states/useUserId";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { LoadItem } from "@/components/layout/loading";
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
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { config } from "@/config";
import { Formik } from "formik";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { toast } from "sonner";

export const InvestmentDialogForm = () => {
  const { id } = useUserSession();
  const [open, setOpen] = useState(false);
  const { creating, setIsCreating, handleRefreshSignal } = useHandleData();
  const { currency, fetchCurrencies } = useCurrencies();
  const { data } = currency;
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

                if (!response.ok) {
                  throw new Error("Ha ocurrido un error al crear la inversion");
                }

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
                <Field
                  label="Precio de Compra"
                  helperText="Precio de compra de la moneda. Los decimales se separan por '.' "
                >
                  <NumberInputRoot name="buyPrice" w={"100%"}>
                    <NumberInputField onChange={handleChange} p={2} />
                  </NumberInputRoot>
                </Field>
                <Field label="Seleccionar la moneda" mt={4}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      p={2}
                      placeholder="Selecciona mano"
                      name="currencyId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {data.map((item, index) => (
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
                    <NumberInputField onChange={handleChange} p={2} />
                  </NumberInputRoot>
                </Field>
                {/* {errors.email && touched.email && errors.email} */}
                {/* {errors.password && touched.password && errors.password} */}
                {creating && <LoadItem />}
                <Button
                  p={2}
                  variant={"outline"}
                  type="submit"
                  disabled={isSubmitting}
                  mt={6}
                >
                  Guardar
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
