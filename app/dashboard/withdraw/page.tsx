"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowUpFromLine, Wallet, AlertCircle, Clock, CheckCircle2, ShieldCheck } from "lucide-react"
import { collection, addDoc, Timestamp, getDocs, query, where, orderBy, doc, updateDoc } from "firebase/firestore"
import { getFirebaseDb } from "@/lib/firebase"

const CRYPTO_OPTIONS = [
  { value: "BTC", label: "Bitcoin (BTC)", color: "text-orange-500" },
  { value: "ETH", label: "Ethereum (ETH)", color: "text-indigo-500" },
  { value: "USDC", label: "USD Coin (USDC)", color: "text-blue-500" },
  { value: "USDT", label: "Tether (USDT)", color: "text-green-500" },
  { value: "LTC", label: "Litecoin (LTC)", color: "text-gray-400" },
  { value: "DOGE", label: "Dogecoin (DOGE)", color: "text-amber-500" },
]

interface WithdrawalRequest {
  id: string
  amount: number
  crypto: string
  walletAddress: string
  status: "pending_otp" | "pending" | "processing" | "completed" | "rejected"
  createdAt: { seconds: number }
  otp?: string
  otpVerified?: boolean
}

export default function WithdrawPage() {
  const { user, userProfile, loading, refreshProfile } = useAuth()
  const router = useRouter()
  const [selectedCrypto, setSelectedCrypto] = useState("")
  const [amount, setAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"form" | "otp" | "success">("form")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalRequest[]>([])
  const [pendingWithdrawalId, setPendingWithdrawalId] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchWithdrawalHistory()
    }
  }, [user])

  const fetchWithdrawalHistory = async () => {
    if (!user) return
    const db = getFirebaseDb()
    const q = query(
      collection(db, "withdrawals"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    )
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as WithdrawalRequest[]
    setWithdrawalHistory(data)
  }

  const getAvailableBalance = (crypto: string) => {
    if (!userProfile?.holdings) return 0
    return userProfile.holdings[crypto as keyof typeof userProfile.holdings] || 0
  }

  const handleSubmitWithdrawal = async () => {
    setError("")

    if (!selectedCrypto) {
      setError("Please select a cryptocurrency")
      return
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (!walletAddress) {
      setError("Please enter your wallet address")
      return
    }

    setIsSubmitting(true)

    // Refresh profile to get latest balance from admin edits
    const freshProfile = await refreshProfile()
    const currentHoldings = freshProfile?.holdings || userProfile?.holdings
    const availableBalance = currentHoldings?.[selectedCrypto as keyof typeof currentHoldings] || 0
    
    if (Number(amount) > availableBalance) {
      setError(`Insufficient balance. You only have ${availableBalance} ${selectedCrypto} available.`)
      setIsSubmitting(false)
      return
    }

    try {
      const db = getFirebaseDb()
      
      const withdrawalRef = await addDoc(collection(db, "withdrawals"), {
        userId: user!.uid,
        userEmail: user!.email,
        userName: userProfile?.displayName || "Unknown",
        amount: Number(amount),
        crypto: selectedCrypto,
        walletAddress: walletAddress,
        status: "pending_otp",
        otpVerified: false,
        createdAt: Timestamp.now(),
        estimatedCompletion: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      })

      await addDoc(collection(db, "admin_notifications"), {
        type: "withdrawal_otp_request",
        withdrawalId: withdrawalRef.id,
        userId: user!.uid,
        userEmail: user!.email,
        userName: userProfile?.displayName,
        amount: Number(amount),
        crypto: selectedCrypto,
        walletAddress: walletAddress,
        read: false,
        createdAt: Timestamp.now(),
      })

      setPendingWithdrawalId(withdrawalRef.id)
      setStep("otp")
    } catch (err) {
      console.error("Error submitting withdrawal:", err)
      setError("Failed to submit withdrawal request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setError("Please enter the OTP provided by support")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const db = getFirebaseDb()
      
      // First, get all OTPs for this withdrawal and check manually
      // This avoids compound index issues
      const otpQuery = query(
        collection(db, "withdrawal_otps"),
        where("withdrawalId", "==", pendingWithdrawalId)
      )
      
      const snapshot = await getDocs(otpQuery)
      
      const matchingOtpDoc = snapshot.docs.find((d) => {
        const data = d.data()
        return data.otp === otp && data.used === false
      })

      if (!matchingOtpDoc) {
        setError("Invalid OTP. Please contact support via live chat to get your verification code.")
        setIsSubmitting(false)
        return
      }

      await updateDoc(doc(db, "withdrawal_otps", matchingOtpDoc.id), {
        used: true,
        usedAt: Timestamp.now(),
      })

      await updateDoc(doc(db, "withdrawals", pendingWithdrawalId!), {
        status: "pending",
        otpVerified: true,
        otpVerifiedAt: Timestamp.now(),
      })

      // Refresh profile to get latest balance before deducting
      const freshProfile = await refreshProfile()
      const currentProfile = freshProfile || userProfile!
      const newHoldings = { ...currentProfile.holdings }
      newHoldings[selectedCrypto as keyof typeof newHoldings] -= Number(amount)
      
      await updateDoc(doc(db, "users", user!.uid), {
        holdings: newHoldings,
        totalBalance: (currentProfile.totalBalance || 0) - Number(amount),
        availableBalance: (currentProfile.availableBalance || 0) - Number(amount),
      })

      await addDoc(collection(db, "transactions"), {
        userId: user!.uid,
        userEmail: user!.email,
        type: "withdrawal",
        amount: -Number(amount),
        crypto: selectedCrypto,
        status: "pending",
        description: `Withdrawal to ${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}`,
        createdAt: Timestamp.now(),
      })

      const notifQuery = query(
        collection(db, "admin_notifications"),
        where("withdrawalId", "==", pendingWithdrawalId)
      )
      const notifSnapshot = await getDocs(notifQuery)
      if (!notifSnapshot.empty) {
        await updateDoc(doc(db, "admin_notifications", notifSnapshot.docs[0].id), {
          type: "withdrawal_confirmed",
          otpVerified: true,
        })
      }

      setStep("success")
      fetchWithdrawalHistory()
    } catch (err) {
      console.error("Error verifying OTP:", err)
      setError("Failed to verify OTP. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_otp":
        return <Badge className="bg-amber-500/20 text-amber-400">Awaiting OTP</Badge>
      case "pending":
        return <Badge className="bg-blue-500/20 text-blue-400">Processing</Badge>
      case "processing":
        return <Badge className="bg-purple-500/20 text-purple-400">In Progress</Badge>
      case "completed":
        return <Badge className="bg-emerald-500/20 text-emerald-400">Completed</Badge>
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400">Rejected</Badge>
      default:
        return <Badge className="bg-zinc-500/20 text-zinc-400">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Withdraw Funds</h1>
            <p className="mt-1 text-muted-foreground">
              Withdraw your crypto to your personal wallet
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-emerald-500/20 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ArrowUpFromLine className="h-5 w-5 text-emerald-500" />
                  {step === "form" && "Request Withdrawal"}
                  {step === "otp" && "Verify OTP"}
                  {step === "success" && "Withdrawal Submitted"}
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  {step === "form" && "Enter the amount and wallet address"}
                  {step === "otp" && "Enter the OTP sent by our support team"}
                  {step === "success" && "Your withdrawal is being processed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === "form" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Select Cryptocurrency</Label>
                      <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                        <SelectTrigger className="border-zinc-800 bg-zinc-950 text-white">
                          <SelectValue placeholder="Choose crypto to withdraw" />
                        </SelectTrigger>
                        <SelectContent className="border-zinc-800 bg-zinc-950">
                          {CRYPTO_OPTIONS.map((crypto) => (
                            <SelectItem key={crypto.value} value={crypto.value}>
                              <span className={crypto.color}>{crypto.label}</span>
                              <span className="ml-2 text-zinc-500">
                                (Balance: {getAvailableBalance(crypto.value).toFixed(6)})
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-300">Amount</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.00000001"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="border-zinc-800 bg-zinc-950 pr-16 text-white"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                          {selectedCrypto || "---"}
                        </span>
                      </div>
                      {selectedCrypto && (
                        <p className="text-sm text-zinc-500">
                          Available: {getAvailableBalance(selectedCrypto).toFixed(6)} {selectedCrypto}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-300">
                        Your {selectedCrypto || "Crypto"} Wallet Address
                      </Label>
                      <div className="relative">
                        <Wallet className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          placeholder={`Enter your ${selectedCrypto || "crypto"} wallet address`}
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                          className="border-zinc-800 bg-zinc-950 pl-10 text-white"
                        />
                      </div>
                    </div>

                    {error && (
                      <Alert className="border-red-500/50 bg-red-500/10">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-400">{error}</AlertDescription>
                      </Alert>
                    )}

                    <Alert className="border-amber-500/50 bg-amber-500/10">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <AlertDescription className="text-amber-400">
                        Withdrawals require OTP verification and take 2 working days to process.
                      </AlertDescription>
                    </Alert>

                    <Button
                      onClick={handleSubmitWithdrawal}
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ArrowUpFromLine className="mr-2 h-4 w-4" />
                          Request Withdrawal
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {step === "otp" && (
                  <div className="space-y-4">
                    <Alert className="border-blue-500/50 bg-blue-500/10">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <AlertDescription className="text-blue-400">
                        For security, please contact our support team via live chat or email to receive your OTP verification code.
                      </AlertDescription>
                    </Alert>

                    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                      <p className="text-sm text-zinc-400 mb-2">Withdrawal Details:</p>
                      <p className="text-white font-medium">
                        {amount} {selectedCrypto}
                      </p>
                      <p className="text-sm text-zinc-500 mt-1 break-all">
                        To: {walletAddress}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-zinc-300">Enter OTP Code</Label>
                      <Input
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="border-zinc-800 bg-zinc-950 text-white text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                    </div>

                    {error && (
                      <Alert className="border-red-500/50 bg-red-500/10">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-400">{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep("form")}
                        className="flex-1 border-zinc-700"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleVerifyOtp}
                        disabled={isSubmitting}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify & Withdraw"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {step === "success" && (
                  <div className="space-y-4 text-center">
                    <div className="flex justify-center">
                      <div className="rounded-full bg-emerald-500/20 p-4">
                        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Withdrawal Submitted!</h3>
                      <p className="mt-2 text-zinc-400">
                        Your withdrawal of {amount} {selectedCrypto} has been submitted and will be processed within 2 working days.
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setStep("form")
                        setAmount("")
                        setWalletAddress("")
                        setSelectedCrypto("")
                        setOtp("")
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      Make Another Withdrawal
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-emerald-500/20 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5 text-emerald-500" />
                  Withdrawal History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {withdrawalHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <ArrowUpFromLine className="mx-auto h-12 w-12 text-zinc-700" />
                    <p className="mt-2 text-zinc-500">No withdrawals yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {withdrawalHistory.map((withdrawal) => (
                      <div
                        key={withdrawal.id}
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-3"
                      >
                        <div>
                          <p className="font-medium text-white">
                            {withdrawal.amount} {withdrawal.crypto}
                          </p>
                          <p className="text-sm text-zinc-500">
                            {new Date(withdrawal.createdAt.seconds * 1000).toLocaleDateString()}
                          </p>
                        </div>
                        {getStatusBadge(withdrawal.status)}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
