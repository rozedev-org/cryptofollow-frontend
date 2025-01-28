import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import { userCard as user } from "@/constants/profileCard.constant";

export const ProfileCard = () => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <VStack align="start" alignItems={"center"}>
        <Avatar borderRadius="full" boxSize="100px" src={user.image} />
        <HStack>
          <VStack align="start" pb={5} pt={5} alignItems={"center"}>
            <Text fontWeight="bold" fontSize="xl">
              {user.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              @{user.username}
            </Text>
          </VStack>
        </HStack>
        <Text>{user.description}</Text>
        <HStack p={5}>
          <Text colorScheme="teal" borderRadius={"20px"} bg={"gray.200"} p={2}>
            #{user.tag[1]}
          </Text>
          <Text colorScheme="teal" borderRadius={"20px"} bg={"gray.200"} p={2}>
            #{user.tag[2]}
          </Text>
          <Text colorScheme="teal" borderRadius={"20px"} bg={"gray.200"} p={2}>
            #{user.tag[0]}
          </Text>
        </HStack>
        <HStack>
          <Button fontSize="sm" color="white" p={5} borderRadius={"20px"}>
            Mensaje
          </Button>
          <Button fontSize="sm" color="white" p={5} borderRadius={"20px"}>
            Seguir
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
