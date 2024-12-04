import { Menu } from "@/components/ui/menu";
import { Box, Stack, Table, Text } from "@chakra-ui/react";

export default function InvestmentsPage() {
  const data = [
    {
      currency: "DOGE",
      priceUSDT: 0.42269,
      gain24h: 14, //Esto deberia de calcularse
      gainUSDT: 7, //Esto deberia de calcularse
      gainCurrency: 2.95, //Esto deberia de calcularse
      investmentUSDT: 50,
      investmentCurrency: 21.13, //Esto deberia de calcularse
      totalUSDT: 57, //Esto deberia de calcularse
      totalCurrency: 24.08, //Esto deberia de calcularse
    },
    {
      currency: "USDT",
      priceUSDT: "0,00002280",
      gain24h: -10,
      gainUSDT: -14,
      gainCurrency: -14,
      investmentUSDT: "100",
      investmentCurrency: "100",
      amountCurrency: "200,964",
      totalUSDT: "114",
      totalCurrency: "114",
    },
    {
      currency: "ETH",
      priceUSDT: "0,00002280",
      gain24h: 2.6,
      gainUSDT: 2.6,
      gainCurrency: 2.6,
      investmentUSDT: "100",
      investmentCurrency: "100",
      amountCurrency: "2,100,511",
      totalUSDT: "114",
      totalCurrency: "114",
    },
    {
      currency: "BTC",
      priceUSDT: "0,00002280",
      gain24h: -2.6,
      gainUSDT: -2.6,
      gainCurrency: -2.6,
      investmentUSDT: "100",
      investmentCurrency: "100",
      amountCurrency: "2,100,511",
      totalUSDT: "114",
      totalCurrency: "114",
    },
  ];
  return (
    <Box overflowX="auto">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader></Table.ColumnHeader>
            <Table.ColumnHeader>Moneda</Table.ColumnHeader>
            <Table.ColumnHeader>Precio</Table.ColumnHeader>
            <Table.ColumnHeader>24 h</Table.ColumnHeader>
            <Table.ColumnHeader>+/-</Table.ColumnHeader>
            <Table.ColumnHeader>Inversión</Table.ColumnHeader>
            <Table.ColumnHeader>Importe</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Stack>
                  <Menu id={`${index}`} />
                </Stack>
              </Table.Cell>
              <Table.Cell>
                <Stack mr={"56px"} mt={"25px"} mb={"6px"}>
                  <Text fontWeight="bold">{item.currency}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.currency} / USDT
                  </Text>
                </Stack>
              </Table.Cell>
              <Table.Cell>
                <Text mr={"77px"}>{item.priceUSDT} USDT</Text>
              </Table.Cell>
              {item.gain24h > 0 ? (
                <Table.Cell color="green.500">
                  <Text mr={"50px"}>+{item.gain24h}%</Text>
                </Table.Cell>
              ) : (
                <Table.Cell color="red.500">
                  <Text mr={"50px"}>{item.gain24h}%</Text>
                </Table.Cell>
              )}
              <Table.Cell>
                <Stack mr={"41px"}>
                  <Text>{item.gainUSDT} USDT</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.gainCurrency} {item.currency}
                  </Text>
                </Stack>
              </Table.Cell>
              <Table.Cell>
                <Stack mr={"72px"}>
                  <Text>{item.investmentUSDT} USDT</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.investmentCurrency} DOGE
                  </Text>
                </Stack>
              </Table.Cell>
              <Table.Cell>
                <Text>{item.totalUSDT} USDT</Text>
                <Text fontSize="sm" color="gray.500">
                  {item.totalCurrency} {item.currency}
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
