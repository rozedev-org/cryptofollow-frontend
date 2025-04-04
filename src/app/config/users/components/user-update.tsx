"use client";
import { useHandleData } from "@/app/states/useHandleData";
import { LoadItem } from "@/components/layout/loading";
import { Input, Text } from "@chakra-ui/react";
import { useState } from "react";
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
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { useUpdateUser } from "../hook/useUsers";

interface UserDialogUpdateProps {
  user: UserEntity;
}

export const UserDialogUpdate = (props: UserDialogUpdateProps) => {
  const [open, setOpen] = useState(false);
  const { user } = props;
  const { creating } = useHandleData();
  const { onSubmit, userUpdateForm } = useUpdateUser(user, setOpen);
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
          <form onSubmit={onSubmit}>
            <Field
              label="Email"
              invalid={!!userUpdateForm.formState.errors.email}
              errorText={userUpdateForm.formState.errors.email?.message}
            >
              <Input
                defaultValue={user.email}
                type="email"
                maxLength={254}
                p={2}
                placeholder="Escriba su correo electronico"
                name="email"
                onChange={(e) => {
                  userUpdateForm.setValue("email", e.target.value);
                }}
              />
            </Field>
            <Field label="Primer Nombre" mt={4}>
              <Input
                defaultValue={user.firstName}
                maxLength={30}
                p={2}
                placeholder="Escriba su primer nombre"
                name="firstName"
                onChange={(e) => {
                  userUpdateForm.setValue("firstName", e.target.value);
                }}
              />
            </Field>
            <Field label="Primer Apellido" mt={4}>
              <Input
                defaultValue={user.lastName}
                maxLength={30}
                p={2}
                placeholder="Escriba su primer apellido"
                name="lastName"
                onChange={(e) => {
                  userUpdateForm.setValue("lastName", e.target.value);
                }}
              />
            </Field>
            <Field label="Contraseña" mt={4}>
              <Input
                defaultValue={""}
                maxLength={64}
                type="password"
                p={2}
                placeholder="Escriba su contraseña"
                name="password"
                onChange={(e) => {
                  userUpdateForm.setValue("password", e.target.value);
                }}
              />
            </Field>
            <Field label="Rol" mt={4} disabled={true}>
              <NativeSelectRoot>
                <NativeSelectField
                  defaultValue={user.role}
                  placeholder="Selecciona el rol"
                  p={2}
                  name="role"
                  onChange={(e) => {
                    userUpdateForm.setValue("role", e.target.value);
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
