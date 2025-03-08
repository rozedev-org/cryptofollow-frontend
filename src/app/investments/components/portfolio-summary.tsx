import { useResponsiveInfo } from "@/common/hook/useResponsiveInfo";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stat,
  VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
export const PortfolioSummary = () => {
  const { isMobile, isTablet } = useResponsiveInfo();

  const gridTemplateColumns = isMobile
    ? "repeat(1,minmax(0,1fr))"
    : isTablet
    ? "repeat(2,minmax(0,1fr))"
    : "repeat(4,minmax(0,1fr))";
  return (
    <VStack
      w={"100%"}
      boxShadow={"0px 4px 32px 0px rgba(0, 0, 0, 0.07)"}
      p={"20px"}
      bg={"white"}
      borderRadius={"xl"}
      gap={"16px"}
    >
      <HStack alignItems={"center"} justifyContent={"start"} w={"100%"}>
        <Heading fontWeight={500} fontSize={"1.125rem"} lineHeight={"1.75rem"}>
          Resumen de Portafolio
        </Heading>
        <Image
          asChild
          borderRadius="full"
          fit="cover"
          ml={"auto"}
          alt="Imagen ilustrativa del portafolio"
        >
          <NextImage
            width={60}
            height={60}
            src="/portfolio-img.jpeg"
            alt="Imagen ilustrativa del portafolio"
          />
        </Image>
      </HStack>

      <Grid w={"100%"} gridTemplateColumns={gridTemplateColumns} gap={"1rem"}>
        <GridItem>
          <PortfolioSummaryInfo title="Total Invertido" value={"$16,167.45"} />
        </GridItem>
        <GridItem>
          <PortfolioSummaryInfo title="Valor Actual" value={"$196,747.21"} />
        </GridItem>
        <GridItem>
          <PortfolioSummaryStats
            title="Ganancia/pérdida"
            value={"$180,579.76"}
          />
        </GridItem>
        <GridItem>
          <PortfolioSummaryStats title="ROI" value={"-1116.93%"} />
        </GridItem>
      </Grid>
    </VStack>
  );
};

interface PortfolioSummaryInfoProps {
  title: string;
  value: string;
}
export const PortfolioSummaryInfo = ({
  title,
  value,
}: PortfolioSummaryInfoProps) => {
  return (
    <Box borderRadius={"0.75rem"} backgroundColor={"#f9fbfc"} padding={"16px"}>
      <Stat.Root>
        <Stat.Label>{title}</Stat.Label>
        <Stat.ValueText
          mt={"0.25rem"}
          fontSize={"1.25rem"}
          fontWeight={600}
          lineHeight={"1.75rem"}
        >
          {value}
        </Stat.ValueText>
      </Stat.Root>
    </Box>
  );
};

interface PortfolioSummaryStatProps {
  title: string;
  value: string;
}
export const PortfolioSummaryStats = ({
  title,
  value,
}: PortfolioSummaryStatProps) => {
  const isNegativeValue = value.includes("-");

  const colorText = isNegativeValue ? "rgb(239, 68, 68)" : "rgb(16, 185, 129)";

  const trendIcon = isNegativeValue ? <BiTrendingDown /> : <BiTrendingUp />;

  return (
    <Box borderRadius={"0.75rem"} backgroundColor={"#f9fbfc"} padding={"16px"}>
      <Stat.Root>
        <Stat.Label>{title}</Stat.Label>
        <HStack color={colorText} alignItems={"center"} mt={"0.25rem"}>
          {trendIcon}

          <Stat.ValueText
            fontSize={"1.25rem"}
            fontWeight={600}
            lineHeight={"1.75rem"}
          >
            {value}
          </Stat.ValueText>
        </HStack>
      </Stat.Root>
    </Box>
  );
};
