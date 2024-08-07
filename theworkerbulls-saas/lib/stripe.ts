
import Stripe from "stripe"

import { currentUser ,auth} from '@clerk/nextjs/server';

import prismadb from "@/lib/prismadb";

import { PrismaClient } from "@prisma/client";
// import { randomUUID } from 'crypto';
const prisma = new PrismaClient();
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export async function expiry() {
  const { userId } = auth();
  const subscription = await prisma.userSubscription.findUnique({
    //@ts-ignore
    where: { userId: userId },
  });
 console.log('user sub',subscription)
//   if (subscription?.stripeSubscriptionId) {

   
// console.log('subscription valid')

    // const subscriptions = await stripe.subscriptions.retrieve({
    //   customer: String(subscription?.stripeCustomerId)
    // })
//     // console.log('subscribers', subscriptions)
//     // return subscriptions.data.length > 0;
//     return true
//   }else{return false}
return subscription?.stripeCurrentPeriodEnd
  
}
export async function hasSubscription() {
  const { userId } = auth();
  const subscription = await prisma.userSubscription.findUnique({
    //@ts-ignore
    where: { userId: userId },
  });
  const sub =await stripe.subscriptions.list()
  // const result = sub?.data?.find( ({ customer }) => customer === subscription?.stripeCustomerId )
  const result = sub?.data?.find( ({ customer }) => customer === subscription?.stripeCustomerId)
//  console.log('user sub',subscription)
//  if(subscription?.stripeSubscriptionId || result ){
  if(subscription?.stripeSubscriptionId || result){
  return true
 }else{
  return false
 }

  
}
export async function getOnlineSubscription() {
  const { userId } = auth();
   const sub =await stripe.subscriptions.list()
   const _user = await prismadb.userSubscription.findUnique({
    //@ts-ignore
    where: { userId: user },
  });
   const result = sub?.data?.find( ({ customer }) => customer === _user?.stripeCustomerId )

  return result
}
export async function createCheckoutLink(customer: string,user:string) {
  const { userId } = auth();
  const sub =await stripe.subscriptions.list()
  const _user = await prismadb.userSubscription.findUnique({
    //@ts-ignore
    where: { userId: user },
  });
  const result = sub?.data?.find( ({ customer }) => customer === _user?.stripeCustomerId )
  

  

  if(result){
  //   const sub =await stripe.subscriptions.retrieve(
  //     _user?.stripeSubscriptionId as string
 
  //  )
    console.log('update sub')
    const update_subscription= await stripe.billingPortal.sessions.create({
      customer: customer as string,
    })
    console.log('billing',update_subscription,update_subscription?.url)
    return update_subscription.url
    // return '/dashboard'
  
  }else{
    console.log('enter checkout')
      const checkout = await stripe.checkout.sessions.create({
    success_url: "https://breakupadvisor.com/sub?session_id={CHECKOUT_SESSION_ID}?",
    cancel_url: "https://breakupadvisor.com/profile",
    customer: customer,
    payment_method_types: ["card"],
    line_items: [
      {
        price: 'price_1PL7AaRot8TS07y6khfZgni2',
        quantity: 1,
      },
    ],
    mode: "subscription"
  })
  const checkout1 = await stripe.checkout.sessions.create({
    success_url: "https://breakupadvisor.com/sub?session_id={CHECKOUT_SESSION_ID}?",
    cancel_url: "https://breakupadvisor.com/profile",
    customer: customer,
    payment_method_types: ["card"],
    line_items: [
      {
        price: 'price_1PaLCeRot8TS07y6f0iaNFKd',
        quantity: 1,
      },
    ],
    mode: "subscription"
  })
  console.log('checkout url',checkout)

  const urls =[checkout?.url,checkout1?.url]
  return urls
  }
  

}
export async function createCustomerIfNull(email:String) {
  console.log('enter customer register',email)
  const { userId } = auth();
  // const {  user } = useUser();

  if (userId) {
    // console.log('user found')

    const _user = await prismadb.userSubscription.findUnique({
      //@ts-ignore
      where: { userId: userId },
    });
    // console.log('_user results->',_user)


    if (!_user) {
      // console.log('no user ')
      const customer = await stripe.customers.create({
        email: String(email)
      })
      const subscriptions = await stripe.customers.list()
      // console.log('customer',customer,email)


      await prismadb.userSubscription.create({
        data: {
          userId: userId,
          stripeCustomerId: customer.id,
          stripeSubscriptionId:null,
          stripePriceId:null,
          stripeCurrentPeriodEnd:null,



        },
      })
    }
    const user2 = await prismadb.userSubscription.findFirst({ where: { userId: userId } });
    return user2?.stripeCustomerId;
  }

}