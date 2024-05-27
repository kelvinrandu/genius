import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

import { hasSubscription ,createCustomerIfNull,createCheckoutLink} from "@/lib/stripe";
const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    console.log('user-->',user?.emailAddresses[0].emailAddress)
    
    const sub = await hasSubscription();
    const customer = await createCustomerIfNull(String(user?.emailAddresses[0]?.emailAddress));
    const checkoutLink = await createCheckoutLink(String(customer));
    console.log('subs',sub,customer,checkoutLink)
    // if (!userId || !user) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // const userSubscription = await prismadb.userSubscription.findUnique({
    //   where: {
    //     userId
    //   }
    // })

    // if (userSubscription && userSubscription.stripeCustomerId) {
    //   const subscriptions = await stripe.subscriptions.list({
    //     customer: String(userSubscription.stripeCustomerId)
    // })
    // return subscriptions.data.length > 0
    //   // const stripeSession = await stripe.billingPortal.sessions.create({
    //   //   customer: userSubscription.stripeCustomerId,
    //   //   return_url: settingsUrl,
    //   // })

    // //   return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    // }

    // const stripeSession = await stripe.checkout.sessions.create({
    //   success_url: settingsUrl,
    //   cancel_url: settingsUrl,
    //   payment_method_types: ["card"],
    //   mode: "subscription",
    //   billing_address_collection: "auto",
    //   customer_email: user.emailAddresses[0].emailAddress,
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "USD",
    //         product_data: {
    //           name: "Genius Pro",
    //           description: "Unlimited AI Generations"
    //         },
    //         unit_amount: 2000,
    //         recurring: {
    //           interval: "month"
    //         }
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   metadata: {
    //     userId,
    //   },
    // })

    return new NextResponse(JSON.stringify({ sub: sub,link:checkoutLink}))

    // return new NextResponse(JSON.stringify({ url: 'url' }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
