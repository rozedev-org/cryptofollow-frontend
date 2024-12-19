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
import axios from "axios";
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

export const DialogForm = () => {
  const [open, setOpen] = useState(false);
  const user = [{ value: "1", label: "Usuario 1" }];
  const currency = [{ value: "1", label: "BONK" }];

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
              try {
                const response = await axios.post(
                  "http://localhost:8000/api/cryptofollow-service/v1/investments",
                  values
                );
                toast.success(`Se ha creado una inversion`);
                console.log(response);
                setOpen(false);
              } catch (error) {
                toast.error("Ha ocurrido un error al crear la inversion");
                console.log(error);
                setOpen(true);
              }
              setSubmitting(false);
            }}
          >
            {({
              // values,
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
                    // value={values.buyPrice}
                  />
                </Field>
                <Field label="Seleccionar la mondeda (Está en duro)" mt={4}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Select option"
                      items={currency}
                      name="currencyId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // value={values.currencyId}
                    />
                  </NativeSelectRoot>
                </Field>
                <Field label="Inversion de moneda" mt={4}>
                  <Input
                    name="currencyInvestment"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // value={values.currencyInvestment}
                  />
                </Field>
                <Field label="Usuario (Está en duro)" mt={4}>
                  {/* este input debe de ser un select (supongo) */}
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Select option"
                      items={user}
                      name="userId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // value={values.userId}
                    />
                  </NativeSelectRoot>
                </Field>
                {/* {errors.email && touched.email && errors.email} */}
                {/* {errors.password && touched.password && errors.password} */}
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
