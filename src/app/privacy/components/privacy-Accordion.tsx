import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Heading, Icon, Box } from "@chakra-ui/react";
import { PRIVACY_OPTIONS } from "@/constants/privacyAccordion.constant";
export const PrivacyAccordion = () => {
  return (
    <Box
      maxHeight="80vh"
      overflowY="auto"
      width="100%"
      textAlign={"center"}
      p={4}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading size="md" mb={4}>
        Políticas de Privacidad
      </Heading>
      <AccordionRoot multiple variant={"enclosed"} defaultValue={["info"]}>
        {PRIVACY_OPTIONS.map((item, i) => (
          <Box key={i}>
            <AccordionItem
              value={item.title}
              _hover={{ background: "gray.200" }}
              borderRadius="md"
            >
              <AccordionItemTrigger p={4}>
                <Icon fontSize="lg" color="fg.subtle" mr={2}>
                  {item.icon}
                </Icon>
                {item.title}
              </AccordionItemTrigger>
              <AccordionItemContent p={4}>
                {/* <Text whiteSpace={"pre-wrap"} textAlign={"justify"}> */}
                {item.content}
                {/* </Text> */}
              </AccordionItemContent>
            </AccordionItem>
          </Box>
        ))}
      </AccordionRoot>
    </Box>
  );
};
