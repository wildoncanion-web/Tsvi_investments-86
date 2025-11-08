import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20',
})

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const amountInput = typeof body.amount === 'string' ? body.amount : String(body.amount || '')
    const reference = typeof body.reference === 'string' ? body.reference : undefined

    // Convert dollars to cents, basic validation
    const dollars = parseFloat(amountInput)
    const amountInCents = Number.isFinite(dollars) && dollars > 0 ? Math.round(dollars * 100) : 0

    if (!amountInCents) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Invoice Payment',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/pay?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pay?status=cancelled`,
      metadata: reference ? { reference } : undefined,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}






