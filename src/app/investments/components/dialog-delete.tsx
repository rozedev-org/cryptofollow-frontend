import { HStack, VStack } from "@chakra-ui/react";
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
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useInvestments } from "../hook/useInvestment";

interface InvestmentDialogDeleteProps {
  title: string;
  investId: number;
}
export const InvestmentDialogDelete = (props: InvestmentDialogDeleteProps) => {
  const { fetchInvestments } = useInvestments();
  const [open, setOpen] = useState(false);
  const { title, investId } = props;

  const handleDelete = async (id: number) => {
    await axios.delete(
      `http://localhost:8000/api/cryptofollow-service/v1/investments/${id}`,
      {}
    );
    setOpen(false);
    fetchInvestments();
  };
  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <VStack alignItems="start">
        <DialogTrigger asChild>
          <MenuItem value="detail">{title}</MenuItem>
        </DialogTrigger>
        <DialogContent p={"30px"}>
          <DialogHeader>
            <DialogTitle pb={5}>Eliminacion</DialogTitle>
          </DialogHeader>
          <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
            <HStack>
              <Button onClick={() => handleDelete(investId)}>Eliminar</Button>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogActionTrigger>
            </HStack>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </VStack>
    </DialogRoot>
  );
};
