'use client'
import React, { ReactNode, useState } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,

} from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";
import MobileNav from "./MobileNav";
type Iprops = {
  children: ReactNode;
};

  const App: React.FC<Iprops> = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default App;