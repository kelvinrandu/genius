'use client'
// @ts-nocheck
import React from "react";
import {
  IconButton,
  Icon,
  AvatarBadge,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Link,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Badge,
} from "@chakra-ui/react";
import {

  Drawer,
  DrawerContent,
  useDisclosure,

} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { currentUser ,auth} from '@clerk/nextjs/server';
import {  useUser ,SignOutButton} from "@clerk/nextjs";
// import { useUser } from "@auth0/nextjs-auth0";
// import { GET_UNREAD_ORDERS_FOR_ME_QUERY } from "../../graphql/queries";
// import { useQuery } from "@apollo/react-hooks";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav: React.FC<MobileProps> = ({onOpen}) => {
  const { user } = useUser();
//   const { user, error, isLoading } = useUser();
//   const user_Id = user ? user.sub : [];
//   const { data, loading } = useQuery(GET_UNREAD_ORDERS_FOR_ME_QUERY, {
//     variables: { user_id: user_Id },
//   });

 
//   const allOrders = data ? data.orders : [];

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error.message}</div>;
// const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      // {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Breakupadvisor
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {user  ? (
                  <Avatar
                    size={"sm"}
                    src={user?.imageUrl}
                    
                    // alt={user.name}
                    // children={
                    //   <AvatarBadge boxSize="1.25em" bg="green.500">
                       
                    //   </AvatarBadge>
                    // }
                  />
                ) : (
                  <Avatar size={"sm"} />
                )}

                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {/* {user ? (
                    <Text fontSize="sm">{user?.name}</Text>
                  ) : (
                    <Text fontSize="sm">annonymous</Text>
                  )} */}

                  <Text fontSize="xs" color="gray.600">
                  {user?.fullName}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {/* {user ? (
                <>
               

               <Link
                    style={{ textDecoration: "none" }}
                    href="/api/auth/logout"
                  >
                    <MenuItem>Sign out</MenuItem>
                  </Link>
                </>
              ) : (
                <Link style={{ textDecoration: "none" }} href="/api/auth/login">
                  <MenuItem>Sign in</MenuItem>
                </Link>
              )} */}
                   {/* <Link style={{ textDecoration: "none" }} href="#"> */}
                   <SignOutButton >
                  <MenuItem>Sign out</MenuItem>
                  </SignOutButton>
                {/* </Link> */}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;