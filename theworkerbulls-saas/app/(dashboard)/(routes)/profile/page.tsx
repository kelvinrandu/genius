"use client";
import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { Spinner } from '@chakra-ui/react'
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import NextLink from 'next/link'
import { auth, useUser } from "@clerk/nextjs";
// import Link from "next/link";

import {
  // Heading,
  Avatar,
  Link,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';


const ProfilePage = () => {
  const [sub, SetSub] = useState()
  const [customer, SetCustomer] = useState()
  const [link, SetLInk] = useState('')
  const [expiry, SetExpiry] = useState('')
  const [loaded, SetDisabled] = useState(true)
  
  // const router = useRouter();
  const { user } = useUser();
 
  useEffect(() => {
    const fetchData = async () => {
      const hasSub = await fetch(`/api/subscription`)
      const _hasSub = await hasSub.json()
      SetLInk(_hasSub?.link)
      SetSub(_hasSub?.sub)
      SetExpiry(_hasSub?.exp)
      SetDisabled(false)
      console.log('in useeffect', _hasSub?.link, _hasSub?.sub)
      // console.log('has sub',hasSub)
    }

    // call the function

    fetchData()


  }, [])
  console.log('user frontend ', user)
  if (loaded) {
    return <Spinner />;
}
  return (
    <div>
    
      <Heading
        title="Profile"
        description="View subscription."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>



          <Box
            maxW={'270px'}
            w={'full'}
            bg={'white'}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Image
              h={'120px'}
              w={'full'}
              src={
                'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
              }
              objectFit={'cover'}
            />
            <Flex justify={'center'} mt={-12}>
              <Avatar
                size={'xl'}
                src={
                  user?.imageUrl
                }
                //@ts-ignore
                alt={'Author'}
                css={{
                  border: '2px solid white',
                }}
              />
            </Flex>

            <Box p={6}>
              <Stack spacing={0} align={'center'} mb={5}>
                <Text fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                  {user?.fullName}
                </Text>
                <Text color={'gray.500'}> {user?.primaryEmailAddress?.emailAddress}</Text>
              </Stack>

              <Stack direction={'row'} justify={'center'} spacing={6}>
                <Stack spacing={0} align={'center'}>
                  <Text fontWeight={600}>status</Text>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    {sub ? 'Subscribed' : 'not subscribed'}
                  </Text>
                </Stack>
                <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>  Plan</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                {sub ? 'Premium' : 'Free Plan'}
                  </Text>
                  
              
                </Stack>
              </Stack>
          
              {sub ? (<>   <Stack spacing={0} align={'center'} mb={5}>
                <Text fontSize={'sm'} fontWeight={600} fontFamily={'body'}>
                  Subscription ends in 
                </Text>
                <Text fontSize={'sm'} fontWeight={500}  color={'gray.500'} fontFamily={'body'}>
                  {expiry? new Date (expiry)?.toDateString():' April 30 2024'} {}
                </Text>
             
              </Stack></>) : (<></>)}

              <Center>
                {sub?(                <Link
                  //@ts-ignore
                  // as={'link'}
                  as={NextLink}
                  // w={'full'}
                  mt={8}
                  paddingX={4}

                  href={link? String(link):'#'}
                  paddingY={2}
                  //@ts-ignore
                  _disabled={true}
                  bg={'black'}
                  color={'white'}
                  // href={'#'}
                  // href={'https://buy.stripe.com/test_dR68yDaCI16ieGI9AA'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}>
                 Manage
                </Link>):(                <Link
                  //@ts-ignore
                  // as={'link'}
                  as={NextLink}
                  // w={'full'}
                  mt={8}
                  paddingX={4}


                  paddingY={2}
                  //@ts-ignore
                  _disabled={true}
                  bg={'black'}
                  color={'white'}
                  href={link? String(link):'#'}
                  // href={'https://buy.stripe.com/test_dR68yDaCI16ieGI9AA'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}>{link ?null:<Spinner />}
                  Subscribe
                </Link>)}

              </Center>

            </Box>
          </Box>

        </div>

      </div>
    </div>
  );
}

export default ProfilePage;

