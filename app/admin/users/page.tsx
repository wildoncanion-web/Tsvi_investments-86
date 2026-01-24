"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, Timestamp } from "firebase/firestore"
import { getFirebaseDb } from "@/lib/firebase"
import { AdminHeader } from "@/components/admin/admin-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, Search, DollarSign, Gift, ArrowDownToLine, CreditCard, Wallet, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface UserData {
  uid: string
  email: string
  displayName: string
  totalBalance: number
  availableBalance: number
  credits: number
  bonus: number
  profit: number
  holdings: {
    BTC: number
    ETH: number
    USDC: number
    USDT: number
    LTC: number
    DOGE: number
  }
  createdAt: { seconds: number }
  status: "active" | "suspended" | "pending"
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [actionType, setActionType] = useState<"edit" | "deposit" | "bonus" | "credit" | "profit">("edit")
  const [actionAmount, setActionAmount] = useState("")
  const [actionCrypto, setActionCrypto] = useState("USDT")
  const [actionNote, setActionNote] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    displayName: "",
    totalBalance: 0,
    availableBalance: 0,
    credits: 0,
    bonus: 0,
    profit: 0,
    status: "active" as "active" | "suspended" | "pending",
    BTC: 0,
    ETH: 0,
    USDC: 0,
    USDT: 0,
    LTC: 0,
    DOGE: 0,
  })

  const fetchUsers = async () => {
    const db = getFirebaseDb()
    const usersSnapshot = await getDocs(collection(db, "users"))
    const usersData = usersSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as UserData[]
    setUsers(usersData)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleEdit = (user: UserData) => {
    setEditingUser(user)
    setActionType("edit")
    setEditForm({
      displayName: user.displayName || "",
      totalBalance: user.totalBalance || 0,
      availableBalance: user.availableBalance || 0,
      credits: user.credits || 0,
      bonus: user.bonus || 0,
      profit: user.profit || 0,
      status: user.status || "active",
      BTC: user.holdings?.BTC || 0,
      ETH: user.holdings?.ETH || 0,
      USDC: user.holdings?.USDC || 0,
      USDT: user.holdings?.USDT || 0,
      LTC: user.holdings?.LTC || 0,
      DOGE: user.holdings?.DOGE || 0,
    })
    setDialogOpen(true)
  }

  const handleQuickAction = (user: UserData, type: "deposit" | "bonus" | "credit") => {
    setEditingUser(user)
    setActionType(type)
    setActionAmount("")
    setActionCrypto("USDT")
    setActionNote("")
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingUser) return
    const db = getFirebaseDb()

    try {
      await updateDoc(doc(db, "users", editingUser.uid), {
        displayName: editForm.displayName,
        totalBalance: editForm.totalBalance,
        availableBalance: editForm.availableBalance,
        credits: editForm.credits,
        bonus: editForm.bonus,
        profit: editForm.profit,
        status: editForm.status,
        holdings: {
          BTC: editForm.BTC,
          ETH: editForm.ETH,
          USDC: editForm.USDC,
          USDT: editForm.USDT,
          LTC: editForm.LTC,
          DOGE: editForm.DOGE,
        },
      })
    } catch (error) {
      console.error("Error saving user:", error)
      alert("Failed to save user. Please try again.")
      return
    }

    setDialogOpen(false)
    setEditingUser(null)
    fetchUsers()
  }

  const handleQuickActionSave = async () => {
    if (!editingUser || !actionAmount) return
    const db = getFirebaseDb()
    const amount = Number.parseFloat(actionAmount)

    if (actionType === "deposit") {
      // Add deposit and update user balance
      await addDoc(collection(db, "deposits"), {
        userId: editingUser.uid,
        userEmail: editingUser.email,
        amount: amount,
        crypto: actionCrypto,
        status: "confirmed",
        note: actionNote || "Admin deposit",
        createdAt: Timestamp.now(),
        confirmedAt: Timestamp.now(),
        confirmedBy: "admin",
      })

      const newHoldings = { ...editingUser.holdings }
      newHoldings[actionCrypto as keyof typeof newHoldings] =
        (newHoldings[actionCrypto as keyof typeof newHoldings] || 0) + amount

      await updateDoc(doc(db, "users", editingUser.uid), {
        totalBalance: (editingUser.totalBalance || 0) + amount,
        availableBalance: (editingUser.availableBalance || 0) + amount,
        holdings: newHoldings,
      })

      // Add transaction record
      await addDoc(collection(db, "transactions"), {
        userId: editingUser.uid,
        userEmail: editingUser.email,
        type: "deposit",
        amount: amount,
        crypto: actionCrypto,
        description: actionNote || "Admin deposit",
        createdAt: Timestamp.now(),
      })
    } else if (actionType === "bonus") {
      await updateDoc(doc(db, "users", editingUser.uid), {
        bonus: (editingUser.bonus || 0) + amount,
        totalBalance: (editingUser.totalBalance || 0) + amount,
      })

      await addDoc(collection(db, "transactions"), {
        userId: editingUser.uid,
        userEmail: editingUser.email,
        type: "bonus",
        amount: amount,
        description: actionNote || "Admin bonus",
        createdAt: Timestamp.now(),
      })
    } else if (actionType === "credit") {
      await updateDoc(doc(db, "users", editingUser.uid), {
        credits: (editingUser.credits || 0) + amount,
      })

      await addDoc(collection(db, "transactions"), {
        userId: editingUser.uid,
        userEmail: editingUser.email,
        type: "credit",
        amount: amount,
        description: actionNote || "Admin credit",
        createdAt: Timestamp.now(),
      })
    } else if (actionType === "profit") {
      // Add profit and update holdings so user can withdraw
      const newHoldings = { ...editingUser.holdings }
      newHoldings[actionCrypto as keyof typeof newHoldings] =
        (newHoldings[actionCrypto as keyof typeof newHoldings] || 0) + amount

      await updateDoc(doc(db, "users", editingUser.uid), {
        profit: (editingUser.profit || 0) + amount,
        totalBalance: (editingUser.totalBalance || 0) + amount,
        availableBalance: (editingUser.availableBalance || 0) + amount,
        holdings: newHoldings,
      })

      await addDoc(collection(db, "transactions"), {
        userId: editingUser.uid,
        userEmail: editingUser.email,
        type: "profit",
        amount: amount,
        crypto: actionCrypto,
        description: actionNote || "Investment profit",
        createdAt: Timestamp.now(),
      })
    }

    setDialogOpen(false)
    setEditingUser(null)
    setActionAmount("")
    setActionNote("")
    fetchUsers()
  }

  const handleDelete = async (uid: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      const db = getFirebaseDb()
      await deleteDoc(doc(db, "users", uid))
      fetchUsers()
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <AdminHeader title="Users Management" description="Manage users, balances, deposits, credits and bonuses" />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-zinc-800 bg-zinc-900/50 pl-9 text-white placeholder:text-zinc-500"
            />
          </div>
          <div className="flex gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400">
              {users.filter((u) => u.status === "active" || !u.status).length} Active
            </Badge>
            <Badge className="bg-amber-500/20 text-amber-400">
              {users.filter((u) => u.status === "pending").length} Pending
            </Badge>
            <Badge className="bg-red-500/20 text-red-400">
              {users.filter((u) => u.status === "suspended").length} Suspended
            </Badge>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-zinc-900/50">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">User</TableHead>
                <TableHead className="text-zinc-500">Balance</TableHead>
                <TableHead className="text-zinc-500">Credits</TableHead>
                <TableHead className="text-zinc-500">Bonus</TableHead>
                <TableHead className="text-zinc-500">Profit</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-right text-zinc-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.uid} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{user.displayName || "N/A"}</p>
                      <p className="text-sm text-zinc-500">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-emerald-400 font-medium">
                    ${(user.totalBalance || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sky-400">${(user.credits || 0).toLocaleString()}</TableCell>
                  <TableCell className="text-amber-400">${(user.bonus || 0).toLocaleString()}</TableCell>
                  <TableCell className="text-purple-400">${(user.profit || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === "suspended"
                          ? "bg-red-500/20 text-red-400"
                          : user.status === "pending"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-emerald-500/20 text-emerald-400"
                      }
                    >
                      {user.status || "active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                        onClick={() => handleQuickAction(user, "deposit")}
                        title="Add Deposit"
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                        onClick={() => handleQuickAction(user, "bonus")}
                        title="Add Bonus"
                      >
                        <Gift className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10"
                        onClick={() => handleQuickAction(user, "credit")}
                        title="Add Credit"
                      >
                        <CreditCard className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                        onClick={() => handleQuickAction(user, "profit")}
                        title="Add Profit"
                      >
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-white"
                        onClick={() => handleEdit(user)}
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(user.uid)}
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-zinc-500">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {actionType === "edit" && <Edit className="h-5 w-5 text-emerald-500" />}
              {actionType === "deposit" && <ArrowDownToLine className="h-5 w-5 text-emerald-500" />}
              {actionType === "bonus" && <Gift className="h-5 w-5 text-amber-500" />}
              {actionType === "credit" && <CreditCard className="h-5 w-5 text-sky-500" />}
              {actionType === "profit" && <TrendingUp className="h-5 w-5 text-purple-500" />}
              {actionType === "edit"
                ? `Edit User: ${editingUser?.email}`
                : actionType === "deposit"
                  ? `Add Deposit for ${editingUser?.displayName}`
                  : actionType === "bonus"
                    ? `Add Bonus for ${editingUser?.displayName}`
                    : actionType === "profit"
                      ? `Add Profit for ${editingUser?.displayName}`
                      : `Add Credit for ${editingUser?.displayName}`}
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              {actionType === "edit"
                ? "Manage all user details and balances"
                : actionType === "deposit"
                  ? "Add a deposit to the user's account"
                  : actionType === "bonus"
                    ? "Add a bonus to the user's account"
                    : actionType === "profit"
                      ? "Add investment profit to the user's account (withdrawable)"
                      : "Add credits to the user's account"}
            </DialogDescription>
          </DialogHeader>

          {actionType === "edit" ? (
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="balances">Balances</TabsTrigger>
                <TabsTrigger value="holdings">Holdings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 mt-4">
                <div className="grid gap-2">
                  <Label>Display Name</Label>
                  <Input
                    value={editForm.displayName}
                    onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                    className="border-zinc-800 bg-zinc-900"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Account Status</Label>
                  <Select
                    value={editForm.status}
                    onValueChange={(v) => setEditForm({ ...editForm, status: v as typeof editForm.status })}
                  >
                    <SelectTrigger className="border-zinc-800 bg-zinc-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-800 bg-zinc-950">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="balances" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      Total Balance ($)
                    </Label>
                    <Input
                      type="number"
                      value={editForm.totalBalance}
                      onChange={(e) => setEditForm({ ...editForm, totalBalance: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-blue-500" />
                      Available Balance ($)
                    </Label>
                    <Input
                      type="number"
                      value={editForm.availableBalance}
                      onChange={(e) => setEditForm({ ...editForm, availableBalance: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-sky-500" />
                      Credits ($)
                    </Label>
                    <Input
                      type="number"
                      value={editForm.credits}
                      onChange={(e) => setEditForm({ ...editForm, credits: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-amber-500" />
                      Bonus ($)
                    </Label>
                    <Input
                      type="number"
                      value={editForm.bonus}
                      onChange={(e) => setEditForm({ ...editForm, bonus: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 text-purple-400">Profit ($)</Label>
                  <Input
                    type="number"
                    value={editForm.profit}
                    onChange={(e) => setEditForm({ ...editForm, profit: Number(e.target.value) })}
                    className="border-zinc-800 bg-zinc-900"
                  />
                </div>
              </TabsContent>

              <TabsContent value="holdings" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-orange-400">BTC (Bitcoin)</Label>
                    <Input
                      type="number"
                      step="0.00000001"
                      value={editForm.BTC}
                      onChange={(e) => setEditForm({ ...editForm, BTC: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-indigo-400">ETH (Ethereum)</Label>
                    <Input
                      type="number"
                      step="0.00000001"
                      value={editForm.ETH}
                      onChange={(e) => setEditForm({ ...editForm, ETH: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-blue-400">USDC (USD Coin)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editForm.USDC}
                      onChange={(e) => setEditForm({ ...editForm, USDC: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-emerald-400">USDT (Tether)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={editForm.USDT}
                      onChange={(e) => setEditForm({ ...editForm, USDT: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-slate-400">LTC (Litecoin)</Label>
                    <Input
                      type="number"
                      step="0.00000001"
                      value={editForm.LTC}
                      onChange={(e) => setEditForm({ ...editForm, LTC: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-amber-400">DOGE (Dogecoin)</Label>
                    <Input
                      type="number"
                      step="0.00000001"
                      value={editForm.DOGE}
                      onChange={(e) => setEditForm({ ...editForm, DOGE: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label>Amount ($)</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={actionAmount}
                  onChange={(e) => setActionAmount(e.target.value)}
                  className="border-zinc-800 bg-zinc-900"
                />
              </div>
              {actionType === "deposit" && (
                <div className="grid gap-2">
                  <Label>Cryptocurrency</Label>
                  <Select value={actionCrypto} onValueChange={setActionCrypto}>
                    <SelectTrigger className="border-zinc-800 bg-zinc-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-800 bg-zinc-950">
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                      <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                      <SelectItem value="USDT">Tether (USDT)</SelectItem>
                      <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
                      <SelectItem value="DOGE">Dogecoin (DOGE)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid gap-2">
                <Label>Note (optional)</Label>
                <Textarea
                  placeholder="Add a note for this transaction..."
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 min-h-[80px]"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-zinc-700">
              Cancel
            </Button>
            <Button
              onClick={actionType === "edit" ? handleSave : handleQuickActionSave}
              className={
                actionType === "bonus"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : actionType === "credit"
                    ? "bg-sky-600 hover:bg-sky-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
              }
            >
              {actionType === "edit"
                ? "Save Changes"
                : actionType === "deposit"
                  ? "Add Deposit"
                  : actionType === "bonus"
                    ? "Add Bonus"
                    : "Add Credit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
