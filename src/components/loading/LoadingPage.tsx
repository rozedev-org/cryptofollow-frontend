'use client'
import React from 'react'
import { Box, Spinner, Center, Flex } from '@chakra-ui/react'
import { useColorModeValue } from '../ui/color-mode'
export const LoadingPage = () => {
  return (
    <Box mt={{ base: 40 }}>
      <Center>
        <Spinner
          w={{ base: 20, md: 40 }}
          h={{ base: 20, md: 40 }}
          //revisar
          // thickness='6px'
          // speed='0.65s'
          // emptyColor='gray.400'
          color={useColorModeValue('#1e272e', 'white')}
        />
      </Center>
    </Box>
  )
}

export const LoadingComponent = () => {
  return (
    <Box mt={{ base: 10 }} w={'100%'}>
      <Center>
        <Spinner
          w={{ base: 10, md: 20 }}
          h={{ base: 10, md: 20 }}
          //revisar
          // thickness='6px'
          // speed='0.65s'
          // emptyColor='gray.400'
          color={useColorModeValue('#1e272e', 'white')}
        />
      </Center>
    </Box>
  )
}

export const LoadingData = () => {
  return (
    <Box>
      <Center>
        <Spinner
          //Revisar
          // thickness='6px'
          // speed='0.65s'
          // emptyColor='gray.400'
          color={useColorModeValue('#1e272e', 'white')}
        />
      </Center>
    </Box>
  )
}

export const LoadingTable = () => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      h={'-webkit-fill-available'}
    >
      <Center>
        <Spinner
          w={{ base: 10, md: 40 }}
          h={{ base: 10, md: 40 }}
          //revisar
          // thickness='6px'
          // speed='0.65s'
          // emptyColor='gray.400'
          color={useColorModeValue(' hsl(227, 45%, 43%)', 'white')}
        />
      </Center>
    </Flex>
  )
}
