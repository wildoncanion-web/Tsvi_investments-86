"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Header } from "@/components/header"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  amount: string
  reference: string
  onSuccess: () => void
}

function PaymentForm({ amount, reference, onSuccess }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (amount && Number(amount) > 0) {
      setIsLoading(true)
      setPaymentError("")
      fetch('/api/payment-intents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, reference }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          if (data.client_secret) {
            setClientSecret(data.client_secret)
            setPaymentError("")
          } else if (data.error) {
            setPaymentError(data.error)
          }
        })
        .catch((error) => {
          setPaymentError("Unable to initialize payment. Please refresh the page and try again.")
          console.error("Payment intent error:", error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [amount, reference])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setPaymentError("")
    
    if (!stripe || !elements || !clientSecret) {
      setPaymentError("Payment system is not ready. Please wait a moment and try again.")
      return
    }

    setIsProcessing(true)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setPaymentError("Card information is missing. Please enter your card details.")
      setIsProcessing(false)
      return
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (error) {
        let errorMessage = "Payment failed. "
        
        // User-friendly error messages based on Stripe error codes
        switch (error.code) {
          case 'card_declined':
            errorMessage += "Your card was declined. Please try a different payment method."
            break
          case 'insufficient_funds':
            errorMessage += "Your card has insufficient funds. Please use a different card."
            break
          case 'expired_card':
            errorMessage += "Your card has expired. Please use a different card."
            break
          case 'incorrect_cvc':
            errorMessage += "The card's security code is incorrect. Please check and try again."
            break
          case 'incorrect_number':
            errorMessage += "The card number is incorrect. Please check and try again."
            break
          case 'invalid_expiry_month':
          case 'invalid_expiry_year':
            errorMessage += "The card's expiration date is invalid. Please check and try again."
            break
          case 'generic_decline':
            errorMessage += "Your card was declined. Please contact your bank or try a different card."
            break
          default:
            errorMessage += error.message || "Please check your card details and try again."
        }
        
        setPaymentError(errorMessage)
        setIsProcessing(false)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess()
      }
    } catch (error) {
      setPaymentError("An unexpected error occurred. Please try again or contact support.")
      setIsProcessing(false)
      console.error('Payment error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading payment form...</p>
      </div>
    )
  }

  if (!clientSecret && paymentError) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold">{paymentError}</p>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Please refresh the page or contact us at{" "}
          <a href="mailto:florina@apostolfirm.com" className="text-primary underline">
            florina@apostolfirm.com
          </a>
        </p>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Unable to load payment form. Please refresh the page.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border-2 border-muted rounded-lg p-4">
        <Label className="text-sm font-medium text-foreground mb-2 block">
          Card Information
        </Label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      {paymentError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 font-medium">{paymentError}</p>
        </div>
      )}
      
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full h-12 text-lg font-semibold"
      >
        {isProcessing ? 'Processing...' : `Pay US$${amount || '0.00'}`}
      </Button>
    </form>
  )
}

export default function PayPage() {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [reference, setReference] = useState("")
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [serviceName, setServiceName] = useState("")

  // Read URL parameters and populate form
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const amount = params.get("amount")
      const ref = params.get("reference")
      const service = params.get("service")

      if (amount) {
        setPaymentAmount(amount)
      }
      if (ref) {
        setReference(ref)
      }
      if (service) {
        setServiceName(service)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="font-sans text-4xl font-bold text-center text-foreground mb-4">Invoice Payment</h1>

          {/* Subtitle */}
          <div className="text-center mb-8">
            <p className="font-sans text-xl font-semibold text-foreground mb-1">Payment Detail</p>
            <p className="font-sans text-lg font-medium text-foreground">Apostol law Firm LLC</p>
            {serviceName && (
              <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg inline-block">
                <p className="text-sm text-foreground/70 mb-1">Service:</p>
                <p className="font-sans text-lg font-semibold text-primary">{serviceName}</p>
              </div>
            )}
          </div>

          {/* Success Message */}
          {paymentSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">Payment successful! Thank you for your payment.</p>
            </div>
          )}

          {/* Payment Form */}
          <div className="space-y-6">
            {/* Payment Amount */}
            <div>
              <Label htmlFor="amount" className="text-lg font-semibold text-foreground mb-2 block">
                Payment Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full h-14 text-lg border-2 border-muted rounded-lg px-4"
              />
            </div>

            {/* Reference */}
            <div>
              <Label htmlFor="reference" className="text-lg font-semibold text-foreground mb-2 block">
                Reference
              </Label>
              <Input
                id="reference"
                type="text"
                placeholder="Invoice number or reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full h-14 text-lg border-2 border-muted rounded-lg px-4"
              />
            </div>

            {/* Payment Method */}
            <div className="pt-4">
              <h2 className="font-sans text-2xl font-bold text-primary mb-4">Payment Method</h2>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                {/* Card Option */}
                <Collapsible open={paymentMethod === "card"} onOpenChange={(open) => open && setPaymentMethod("card")}>
                  <CollapsibleTrigger asChild>
                    <div className="border-2 border-muted rounded-lg p-6 cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value="card" id="card" className="mt-1" />
                        <Label htmlFor="card" className="cursor-pointer flex-1">
                          <p className="font-sans text-xl font-semibold text-foreground mb-1">Card</p>
                          <p className="text-base text-foreground/70">Debit and Credit accepted.</p>
                        </Label>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="border-2 border-primary/20 rounded-lg p-6 bg-primary/5">
                      <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Card Information</h3>
                      
                      <h4 className="font-sans text-lg font-semibold text-foreground mt-6 mb-4">Billing Address</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="md:col-span-2">
                          <Label htmlFor="address" className="text-sm font-medium text-foreground mb-1 block">
                            Address
                          </Label>
                          <Input
                            id="address"
                            placeholder="Address"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address2" className="text-sm font-medium text-foreground mb-1 block">
                            Address 2 (optional)
                          </Label>
                          <Input
                            id="address2"
                            placeholder="Address 2 (optional)"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city" className="text-sm font-medium text-foreground mb-1 block">
                            City
                          </Label>
                          <Input
                            id="city"
                            placeholder="City"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state" className="text-sm font-medium text-foreground mb-1 block">
                            State
                          </Label>
                          <Input
                            id="state"
                            placeholder="State"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode" className="text-sm font-medium text-foreground mb-1 block">
                            Postal Code
                          </Label>
                          <Input
                            id="postalCode"
                            placeholder="Postal Code"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country" className="text-sm font-medium text-foreground mb-1 block">
                            Country
                          </Label>
                          <Input
                            id="country"
                            placeholder="Country"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="email" className="text-sm font-medium text-foreground mb-1 block">
                            Receipt Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Receipt Email Address"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="mt-6 pt-4 border-t border-muted">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-sans text-lg font-semibold text-foreground">Payment</span>
                          <span className="font-sans text-lg font-bold text-foreground">
                            US${paymentAmount || "0.00"}
                          </span>
                        </div>
                        
                        {paymentAmount && Number(paymentAmount) > 0 ? (
                          <Elements stripe={stripePromise}>
                            <PaymentForm 
                              amount={paymentAmount} 
                              reference={reference}
                              onSuccess={() => setPaymentSuccess(true)}
                            />
                          </Elements>
                        ) : (
                          <Button disabled className="w-full h-12 text-lg font-semibold">
                            Enter amount to pay
                          </Button>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* eCheck Option */}
                <Collapsible open={paymentMethod === "echeck"} onOpenChange={(open) => open && setPaymentMethod("echeck")}>
                  <CollapsibleTrigger asChild>
                    <div className="border-2 border-muted rounded-lg p-6 cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value="echeck" id="echeck" className="mt-1" />
                        <Label htmlFor="echeck" className="cursor-pointer flex-1">
                          <p className="font-sans text-xl font-semibold text-foreground mb-1">eCheck</p>
                          <p className="text-base text-foreground/70">Use your bank account.</p>
                        </Label>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="border-2 border-primary/20 rounded-lg p-6 bg-primary/5">
                      <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Bank Account Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="accountHolder" className="text-sm font-medium text-foreground mb-1 block">
                            Account Holder Name
                          </Label>
                          <Input
                            id="accountHolder"
                            placeholder="Account Holder Name"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="routingNumber" className="text-sm font-medium text-foreground mb-1 block">
                            Routing Number
                          </Label>
                          <Input
                            id="routingNumber"
                            placeholder="Routing Number"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountNumber" className="text-sm font-medium text-foreground mb-1 block">
                            Account Number
                          </Label>
                          <Input
                            id="accountNumber"
                            placeholder="Account Number"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="checkEmail" className="text-sm font-medium text-foreground mb-1 block">
                            Receipt Email Address
                          </Label>
                          <Input
                            id="checkEmail"
                            type="email"
                            placeholder="Receipt Email Address"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="mt-6 pt-4 border-t border-muted">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-sans text-lg font-semibold text-foreground">Payment</span>
                          <span className="font-sans text-lg font-bold text-foreground">
                            US${paymentAmount || "0.00"}
                          </span>
                        </div>
                        <Button disabled className="w-full h-12 text-lg font-semibold">
                          eCheck not implemented yet
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Pay Later Option */}
                <Collapsible open={paymentMethod === "paylater"} onOpenChange={(open) => open && setPaymentMethod("paylater")}>
                  <CollapsibleTrigger asChild>
                    <div className="border-2 border-muted rounded-lg p-6 cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value="paylater" id="paylater" className="mt-1" />
                        <Label htmlFor="paylater" className="cursor-pointer flex-1">
                          <p className="font-sans text-xl font-semibold text-foreground mb-1">Pay Later</p>
                          <p className="text-base text-foreground/70">
                            Pay over time on amounts $150+ with <span className="font-semibold">affirm</span>.{" "}
                            <Link href="#" className="text-primary hover:underline">
                              Learn more
                            </Link>
                          </p>
                        </Label>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="border-2 border-primary/20 rounded-lg p-6 bg-primary/5">
                      <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Pay Later Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="payLaterEmail" className="text-sm font-medium text-foreground mb-1 block">
                            Email Address
                          </Label>
                          <Input
                            id="payLaterEmail"
                            type="email"
                            placeholder="Email Address"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phoneNumber" className="text-sm font-medium text-foreground mb-1 block">
                            Phone Number
                          </Label>
                          <Input
                            id="phoneNumber"
                            placeholder="Phone Number"
                            className="w-full h-12 border-2 border-muted rounded-lg px-4"
                          />
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="mt-6 pt-4 border-t border-muted">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-sans text-lg font-semibold text-foreground">Payment</span>
                          <span className="font-sans text-lg font-bold text-foreground">
                            US${paymentAmount || "0.00"}
                          </span>
                        </div>
                        <Button disabled className="w-full h-12 text-lg font-semibold">
                          Pay Later not implemented yet
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </RadioGroup>
            </div>
          </div>

          {/* Company Information */}
          <div className="mt-12 text-center space-y-2">
            <p className="font-sans text-xl font-bold text-foreground">Apostol law Firm LLC</p>
            <p className="text-base text-foreground/80">255 Primera Boulevard</p>
            <p className="text-base text-foreground/80">Suite 160</p>
            <p className="text-base text-foreground/80">Lake Mary, FL 32746</p>
            <div className="pt-4 space-y-1">
              <p>
                <Link href="mailto:florina@apostolfirm.com" className="text-base text-primary hover:underline">
                  florina@apostolfirm.com
                </Link>
              </p>
              <p>
                <Link href="mailto:flory@apostolvisa.com" className="text-base text-primary hover:underline">
                  flory@apostolvisa.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
