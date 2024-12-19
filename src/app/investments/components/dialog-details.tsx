import { Badge, Text, VStack } from "@chakra-ui/react";
import {
  DialogTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../../components/ui/dialog";
import { DataListItem, DataListRoot } from "../../../components/ui/data-list";
import { MenuItem } from "../../../components/ui/menu";
import { useInvestment } from "../hook/useInvestment";
import { Tooltip } from "@/components/ui/tooltip";

interface InvestmentDialogDetailProps {
  title: string;
  investId: number;
}
export const InvestmentDialogDetail = (props: InvestmentDialogDetailProps) => {
  const { title, investId } = props;
  const { fetchInvest, invest } = useInvestment(investId);

  return (
    <DialogRoot placement={"center"}>
      <VStack alignItems="start">
        <DialogTrigger asChild>
          <MenuItem value="detail" onClick={fetchInvest}>
            {title}
          </MenuItem>
        </DialogTrigger>
        <DialogContent p={"30px"}>
          <DialogHeader>
            <DialogTitle pb={5}>
              Inversion en : {invest.currency.name}
            </DialogTitle>
          </DialogHeader>
          <DialogBody pb="8" borderBottom={"solid thin #e4e4e7"}>
            <DataListRoot orientation="horizontal">
              <DataListItem
                label="Ganancias"
                value={
                  invest.percentageVariation >= 1 ? (
                    <Tooltip
                      showArrow
                      content={`${invest.percentageVariation}%`}
                    >
                      <Badge colorPalette="green">
                        {invest.percentageVariation.toFixed(2)}%
                      </Badge>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      showArrow
                      content={`${invest.percentageVariation}%`}
                    >
                      <Badge colorPalette="red">
                        {invest.percentageVariation.toFixed(2)}%
                      </Badge>
                    </Tooltip>
                  )
                }
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Precio (USDT)"
                value={
                  <Tooltip
                    openDelay={1}
                    closeDelay={1}
                    showArrow
                    content={`${invest.currency.price} $`}
                  >
                    <Text ml={"auto"}>{invest.buyPrice} $</Text>
                  </Tooltip>
                }
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Ganancias (USDT)"
                value={
                  <Tooltip
                    openDelay={1}
                    closeDelay={1}
                    showArrow
                    content={`${invest.pairVariation} $`}
                  >
                    <Text ml={"auto"}>{invest.pairVariation.toFixed(2)} $</Text>
                  </Tooltip>
                }
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Inversion (USDT)"
                value={
                  <Tooltip
                    openDelay={1}
                    closeDelay={1}
                    showArrow
                    content={`${invest.pairInvestment} $`}
                  >
                    <Text ml={"auto"}>
                      {invest.pairInvestment.toFixed(2)} $
                    </Text>
                  </Tooltip>
                }
              />
              <DataListItem
                borderBottom={"solid thin #e4e4e7"}
                label="Total (USDT)"
                value={
                  <Tooltip
                    openDelay={1}
                    closeDelay={1}
                    showArrow
                    content={`${invest.pairAmount} $`}
                  >
                    <Text ml={"auto"}>{invest.pairAmount.toFixed(2)} $</Text>
                  </Tooltip>
                }
              />
            </DataListRoot>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </VStack>
    </DialogRoot>
  );
};
