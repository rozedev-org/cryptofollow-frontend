"use client";
import { useHandleData } from "@/app/states/useHandleData";
import { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaRegPlusSquare } from "react-icons/fa";
import { Formik } from "formik";
import { config } from "@/config";
import { toast } from "sonner";
import { Field } from "@/components/ui/field";
import { LoadItem } from "@/components/layout/loading";
import { Input } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";

export const UserDialogForm = () => {
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
          <DialogTitle pb={5}>Crear nuevo usuario</DialogTitle>
        </DialogHeader>
        <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              role: "",
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
                const response = await fetch(`${bff.url}/users`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                  credentials: "include",
                });

                if (!response.ok) {
                  throw new Error("Ha ocurrido un error ");
                }
                toast.success(`Se ha creado el usuario`);
                console.log(response);
                handleRefreshSignal(true);
                setOpen(false);
                setIsCreating(false);
              } catch (error) {
                toast.error("Ha ocurrido un error al crear el usuario");
                console.log(error);
                setOpen(false);
                setIsCreating(false);
              }
              setSubmitting(false);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Field label="Email">
                  <Input
                    type="email"
                    maxLength={254}
                    p={2}
                    placeholder="Escriba su correo electronico"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field label="Primer Nombre" mt={4}>
                  <Input
                    maxLength={30}
                    p={2}
                    placeholder="Escriba su primer nombre"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field label="Primer Apellido" mt={4}>
                  <Input
                    maxLength={30}
                    p={2}
                    placeholder="Escriba su primer apellido"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field label="Contraseña" mt={4}>
                  <Input
                    maxLength={64}
                    type="password"
                    p={2}
                    placeholder="Escriba su contraseña"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field label="Rol" mt={4}>
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Selecciona el rol"
                      p={2}
                      name="role"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="ADMIN">Administrador</option>
                      <option value="USER">Usuario</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
                {creating && <LoadItem />}
                <Button
                  p={2}
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
