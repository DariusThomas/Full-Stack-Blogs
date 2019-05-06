import * as stripeLoader from "stripe"

const stripe = new stripeLoader(process.env.STRIPE_SK);

export const charge = (token:string, amt:number) =>{
    return stripe.charges.create({
        amount:amt*100,
        currency:"usd",
        source: token,
        description: "Statement Description"
    })
}
