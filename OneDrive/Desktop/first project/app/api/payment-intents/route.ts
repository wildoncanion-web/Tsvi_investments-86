import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

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

    // Convert dollars to cents with validation
    const dollars = parseFloat(amountInput)
    
    // Security: Validate amount is a valid number
    if (!Number.isFinite(dollars) || isNaN(dollars)) {
      return NextResponse.json({ error: 'Invalid amount format' }, { status: 400 })
    }
    
    const amountInCents = Math.round(dollars * 100)
    
    // Security: Enforce minimum payment amount ($1.00)
    const MIN_AMOUNT_CENTS = 100 // $1.00
    if (amountInCents < MIN_AMOUNT_CENTS) {
      return NextResponse.json({ error: 'Amount must be at least $1.00' }, { status: 400 })
    }
    
    // Security: Enforce maximum payment amount ($100,000.00)
    const MAX_AMOUNT_CENTS = 10000000 // $100,000.00
    if (amountInCents > MAX_AMOUNT_CENTS) {
      return NextResponse.json({ error: 'Amount exceeds maximum limit' }, { status: 400 })
    }
    
    // Security: Prevent negative amounts
    if (amountInCents <= 0) {
      return NextResponse.json({ error: 'Amount must be greater than zero' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: reference ? { reference } : undefined,
      automatic_payment_methods: {
        enabled: true,
      },
      // Security: Enable 3D Secure for additional authentication
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },
      // Security: Set payment intent description for tracking
      description: reference ? `Payment for ${reference}` : 'Invoice payment',
    })

    return NextResponse.json({ client_secret: paymentIntent.client_secret })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}




