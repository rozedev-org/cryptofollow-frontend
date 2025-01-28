import { Button, HStack, VStack, Text } from "@chakra-ui/react";
import {
  DialogTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogActionTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { config } from "@/config";
import { LoadItem } from "@/components/layout/loading";
import { CurrencyIdentity } from "@/app/investments/types/investment.types";
import { useHandleData } from "@/app/states/useHandleData";

interface CurrencyDialogDeleteProps {
  currency: CurrencyIdentity;
}
export const CurrencyDialogDelete = (props: CurrencyDialogDeleteProps) => {
  const [open, setOpen] = useState(false);
  const { currency } = props;
  const { creating, setIsCreating, handleRefreshSignal } = useHandleData();

  const handleDelete = async (id: number) => {
    setIsCreating(true);
    const { bff } = config;
    try {
      await fetch(`${bff.url}/currency/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

        credentials: "include",
      });
      toast.success("Moneda eliminada con exito");
      handleRefreshSignal(true);
      setOpen(false);
      setIsCreating(false);
    } catch (error) {
      toast.error("Error al eliminar la Moneda");
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
              <Text textAlign="center">{`¿Estas seguro de eliminar la Moneda : ${currency.name}?`}</Text>
              <HStack justifyContent={"space-evenly"} mt={2}>
                {creating && <LoadItem />}
                <Button
                  onClick={() => handleDelete(currency.id)}
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
