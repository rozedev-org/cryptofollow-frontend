import {
  HStack,
  Stack,
  Image,
  VStack,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Input,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
export default function LoginPage() {
  return (
    <HStack>
      <Image src="/pic.svg" alt="213" maxW="1024px" minH="984px" />
      <VStack display={"flex"} minW={"456px"} minH={"1024px"} p={"48px"}>
        <HStack mr={"auto"}>
          <Image src={"/logo.png"} alt="App Logo" width={"38"} height={"37"} />
          <Heading
            color={"#1A1B2F"}
            fontSize={"21px"}
            fontWeight={"700"}
            lineHeight={"normal"}
          >
            CryptoFollow
          </Heading>
        </HStack>
        <Stack minW={"360px"} minH={"574px"} pb={"228px"}>
          <Heading as="h2" size="lg" pt={"48px"} pb={"24px"}>
            Encantado de verte de nuevo
          </Heading>

          <Text fontSize="11px" color="gray.600">
            Acceso
          </Text>
          <Input placeholder=" Email" bg="gray.100" />
          <Text fontSize="11px" color="gray.600">
            Contraseña
          </Text>
          <Input placeholder=" Introducir Contraseña" bg="gray.100" />
          <Flex justify="flex-end">
            <Link color="blue.500" fontSize="sm">
              ¿Has olvidado tu contraseña?
            </Link>
          </Flex>

          <Button
            color={"white"}
            my={"32px"}
            colorScheme="purple"
            w="full"
            bg="#d6b9c2"
            _hover={{ bg: "#b5929f" }}
            borderRadius="md"
            py={6}
          >
            Iniciar sesión
          </Button>

          <Button
            mt={"32px"}
            mb={"24px"}
            bg="#333333"
            _hover={{ bg: "#4d4d4d" }}
            color="white"
            variant="outline"
            w="full"
            borderRadius="md"
            py={6}
          >
            <FaGoogle /> O inicia sesión con Google
          </Button>

          <Text pt={"24px"} fontSize="12px" color="gray.600">
            ¿No tienes una cuenta?{" "}
            <Link color="blue.500">Regístrate ahora</Link>
          </Text>
        </Stack>
      </VStack>
    </HStack>
  );
}
