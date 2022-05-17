import React from "react";
import { ChakraProvider } from '@chakra-ui/react'

function Wrapper({ children }) {
  return <React.StrictMode>
    <ChakraProvider>
      {children}
    </ChakraProvider>
  </React.StrictMode>
}

export default Wrapper