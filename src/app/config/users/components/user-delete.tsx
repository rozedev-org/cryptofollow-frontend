import { useState } from "react";
import { UserEntity } from "../types/users.types";
import { useHandleData } from "@/app/states/useHandleData";
import { config } from "@/config";
import { toast } from "sonner";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HStack, VStack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { LoadItem } from "@/components/layout/loading";

interface UserDialogDeleteProps {
  user: UserEntity;
}
export const UserDialogDelete = (props: UserDialogDeleteProps) => {
  const [open, setOpen] = useState(false);
  const { user } = props;
  const { creating, setIsCreating, handleRefreshSignal } = useHandleData();

  const handleDelete = async (id: number) => {
    setIsCreating(true);
    const { bff } = config;
    try {
      await fetch(`${bff.url}/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

        credentials: "include",
      });
      handleRefreshSignal(true);
      setOpen(false);
      setIsCreating(false);
      toast.success("Usuario eliminado con exito");
    } catch (error) {
      toast.error("Error al eliminar el Usuario");
      console.log(error);
      setIsCreating(false);
    }
  };
  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={"xs"}
    >
      <VStack alignItems="start">
        <DialogTrigger asChild>
          <Button
            justifyContent={"flex-start"}
            w={"100%"}
            p={1}
            variant={"subtle"}
            size={"xs"}
          >
            Eliminar
          </Button>
        </DialogTrigger>
        <DialogContent p={"30px"}>
          <DialogHeader alignSelf={"center"}>
            <DialogTitle pb={5}>Eliminacion</DialogTitle>
          </DialogHeader>
          <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
            <VStack>
              <Text textAlign="center">{`¿Estas seguro de eliminar el Usuario?`}</Text>
              <HStack justifyContent={"space-evenly"} mt={2}>
                {creating && <LoadItem />}
                <Button
                  onClick={() => handleDelete(user.id)}
                  p={2}
                  colorPalette="red"
                >
                  Confirmar
                </Button>
                <DialogActionTrigger asChild>
                  <Button variant="outline" p={2}>
                    Cancelar
                  </Button>
                </DialogActionTrigger>
              </HStack>
            </VStack>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </VStack>
    </DialogRoot>
  );
};
