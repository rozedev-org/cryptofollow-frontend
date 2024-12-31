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
} from "../../../components/ui/dialog";
import { MenuItem } from "../../../components/ui/menu";
import { useState } from "react";
import { useInvestments } from "../hook/useInvestment";
import { InvestmentIdentity } from "../types/crypto.types";
import { toast } from "sonner";
import { config } from "@/config";

interface InvestmentDialogDeleteProps {
  title: string;
  investId: number;
  invest: InvestmentIdentity;
}
export const InvestmentDialogDelete = (props: InvestmentDialogDeleteProps) => {
  const { fetchInvestments } = useInvestments();
  const [open, setOpen] = useState(false);
  const { title, invest, investId } = props;

  const handleDelete = async (id: number) => {
    const { bff } = config;
    try {
      await fetch(`${bff.url}/investments/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

        credentials: "include",
      });
      toast.success("Inversion eliminada con exito");
      setOpen(false);
      fetchInvestments();
    } catch (error) {
      toast.error("Error al eliminar la inversion");
      console.log(error);
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
          <MenuItem value="detail">{title}</MenuItem>
        </DialogTrigger>
        <DialogContent p={"30px"}>
          <DialogHeader alignSelf={"center"}>
            <DialogTitle pb={5}>Eliminacion</DialogTitle>
          </DialogHeader>
          <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
            <VStack>
              <Text textAlign="center">{`¿Estas seguro de eliminar la inversion de ${invest.currency.name}?`}</Text>
              <HStack justifyContent={"space-evenly"} mt={2}>
                <Button
                  onClick={() => handleDelete(investId)}
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
