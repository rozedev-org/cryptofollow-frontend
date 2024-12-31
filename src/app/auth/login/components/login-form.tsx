"use client";

import { Field } from "@/components/ui/field";
import { useLoginForm } from "../../hooks/useLogin";
import { Flex, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

export const LoginForm = () => {
  const { handleChangeEmail, handleChangePassword, handleLogin } =
    useLoginForm();

  return (
    <form onSubmit={handleLogin}>
      <Stack minW={"360px"} minH={"574px"} pb={"228px"}>
        <Heading as="h2" size="lg" pt={"48px"} pb={"24px"}>
          Encantado de verte de nuevo
        </Heading>

        <Field label="Acceso" fontSize="11px" color="gray.600">
          <Input
            type="email"
            placeholder="Email"
            bg="gray.100"
            p={2}
            onChange={(e) => handleChangeEmail(e.target.value)}
          />
        </Field>

        <Field label="Contraseña" fontSize="11px" color="gray.600">
          <Input
            type="password"
            placeholder="Introducir Contraseña"
            bg="gray.100"
            p={2}
            onChange={(e) => handleChangePassword(e.target.value)}
          />
        </Field>

        <Flex justify="flex-end">
          <Link color="blue.500" fontSize="sm">
            ¿Has olvidado tu contraseña?
          </Link>
        </Flex>

        <Button
          type="submit"
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
          ¿No tienes una cuenta? <Link color="blue.500" onClick={()=>{console.log('registrar')}}>Regístrate ahora</Link>
        </Text>
      </Stack>
    </form>
  );
};
