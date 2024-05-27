import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/lib/db";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    // const user = await currentUser();

    if (!userId ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await db?.userSubscription.findUnique({
      where: {
        userId
      }
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: String(userSubscription.stripeCustomerId)
    })
    return subscriptions.data.length > 0
      // const stripeSession = await stripe.billingPortal.sessions.create({
      //   customer: userSubscription.stripeCustomerId,
      //   return_url: settingsUrl,
      // })

    //   return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

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

    return new NextResponse(JSON.stringify({ state: false}))

    // return new NextResponse(JSON.stringify({ url: 'url' }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
