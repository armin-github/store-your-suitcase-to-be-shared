import {NextResponse} from "next/server";
import prisma from "@/lib/db";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


export const POST = async (req: Request) => {
    const stripeSignature = req.headers.get('stripe-signature')
    const body = await req.text()
    let stripeEvent
    try{
        stripeEvent = stripe.webhooks.constructEvent(body, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET)
        //stripe throws an Error if there was sth. wrong creating the event above
    }catch (e){
        console.log('Stripe webhook verification error', e)
        return NextResponse.json({}, {status: 400})
    }


    //Stripe recommends to use the event returned to fulfill the order.
    switch (stripeEvent.type) {
        case 'checkout.session.completed':
            await prisma.user.update({
                data: {hasLifetimeAccess: true},
                where: {email: stripeEvent.data.object.customer_email}
            })
            break
        default:
            console.log('Unhandled Stripe event type in webhook', stripeEvent.type)
    }


    return NextResponse.json({}, {status: 200})
}