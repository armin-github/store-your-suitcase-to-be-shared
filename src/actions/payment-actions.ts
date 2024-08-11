'use server'

import 'server-only'
import {redirect} from "next/navigation";
import {getUserSession} from "@/lib/server-utils";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession = async () => {
    const session = await getUserSession()
    if (!session.user) throw new Error('User not found')
    const checkoutSession = await stripe.checkout.sessions.create({
        customer_email: session.user.email,
        line_items: [
            {
               price: process.env.STRIPE_LUGGAGESTORAGE_PRICE_ID,
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/payment?success=true`,
        cancel_url: `${process.env.BASE_URL}/payment?canceled=true`,

    })
    //ultimately redirect user to Stripe
    redirect(checkoutSession.url)
}