
import { currentUser ,auth} from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";


const settingsUrl = absoluteUrl("/settings");

export async function GET(req:any) {
  console.log('request',req)
  const url= new URL(req.url)
  const search_params= new URLSearchParams(url.searchParams)
 const session_id= search_params.get('session_id')
 console.log('session_id',session_id)
  try {
    const { userId } = auth();
    const user = await prismadb.userSubscription.findUnique({
      //@ts-ignore
      where: { userId: userId },
    });

  
    const subscription = await stripe.subscriptions.list(
    
  )
  console.log('subscription1 -->',subscription)
    await prismadb.userSubscription.update({
      where: {
        
        userId: userId as string,
      },
      data: { 
        // stripePriceId: subscription?.items.data[0].id as string,
        stripeSubscriptionId: session_id as string,
        // stripeCurrentPeriodEnd: new Date(
        //   subscription?.current_period_end * 1000
        // ),
      },
    })
    console.log('subscriptions',subscription)

    return new NextResponse(JSON.stringify({ state: session_id}))

    // return new NextResponse(JSON.stringify({ url: 'url' }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
