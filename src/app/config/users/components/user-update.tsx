"use client";
import { useHandleData } from "@/app/states/useHandleData";
import { LoadItem } from "@/components/layout/loading";
import { Input, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import { UserEntity } from "../types/users.types";
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
import { config } from "@/config";
import { Field } from "@/components/ui/field";

interface UserDialogUpdateProps {
  user: UserEntity;
}

export const UserDialogUpdate = (props: UserDialogUpdateProps) => {
  const [open, setOpen] = useState(false);
  const { user } = props;
  const { creating, setIsCreating, handleRefreshSignal } = useHandleData();
  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => {
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
          <DialogTitle pb={5}>
            <Text>
              Usuario : {user.firstName} {user.lastName}
            </Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
          <Formik
            initialValues={{
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
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
                const response = await fetch(`${bff.url}/users/${user.id}`, {
                  credentials: "include",
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });

                if (!response.ok) {
                  throw new Error("Error al actualizar el usuario");
                }

                toast.success(`Se ha actualizado un usuario`);
                console.log(response);
                handleRefreshSignal(true);
                setOpen(false);
                setIsCreating(false);
              } catch (error) {
                toast.error("Ha ocurrido un error al actualizar el usuario");
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
                <Field label="Email">
                  <Input
                    value={values.email}
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
                    value={values.firstName}
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
                    value={values.lastName}
                    maxLength={30}
                    p={2}
                    placeholder="Escriba su primer apellido"
                    name="lastName"
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
