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
import { Field } from "@/components/ui/field";
import { LoadItem } from "@/components/layout/loading";
import { Input } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { useCreateUser } from "../hook/useUsers";

export const UserDialogForm = () => {
  const [open, setOpen] = useState(false);
  const { creating } = useHandleData();
  const { onSubmit, userForm } = useCreateUser(setOpen);
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
          <form onSubmit={onSubmit}>
            <Field
              label="Email"
              invalid={!!userForm.formState.errors.email}
              errorText={userForm.formState.errors.email?.message}
            >
              <Input
                type="email"
                maxLength={254}
                p={2}
                placeholder="Escriba su correo electronico"
                name="email"
                onChange={(e) => {
                  userForm.setValue("email", e.target.value);
                }}
              />
            </Field>
            <Field label="Primer Nombre" mt={4}>
              <Input
                maxLength={30}
                p={2}
                placeholder="Escriba su primer nombre"
                name="firstName"
                onChange={(e) => {
                  userForm.setValue("firstName", e.target.value);
                }}
              />
            </Field>
            <Field label="Primer Apellido" mt={4}>
              <Input
                maxLength={30}
                p={2}
                placeholder="Escriba su primer apellido"
                name="lastName"
                onChange={(e) => {
                  userForm.setValue("lastName", e.target.value);
                }}
              />
            </Field>
            <Field label="Contraseña" mt={4}>
              <Input
                maxLength={64}
                type="password"
                p={2}
                placeholder="Escriba su contraseña"
                name="password"
                onChange={(e) => {
                  userForm.setValue("password", e.target.value);
                }}
              />
            </Field>
            <Field label="Rol" mt={4}>
              <NativeSelectRoot>
                <NativeSelectField
                  placeholder="Selecciona el rol"
                  p={2}
                  name="role"
                  onChange={(e) => {
                    userForm.setValue("role", e.target.value);
                  }}
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
              disabled={creating}
              mt={6}
            >
              Enviar
            </Button>
          </form>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
