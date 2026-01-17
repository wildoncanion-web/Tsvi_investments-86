"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { getFirebaseDb } from "@/lib/firebase"
import { AdminHeader } from "@/components/admin/admin-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, Search, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UserData {
  uid: string
  email: string
  displayName: string
  totalBalance: number
  holdings: {
    BTC: number
    USDC: number
    USDT: number
    TON: number
    LTC: number
  }
  createdAt: { seconds: number }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [editForm, setEditForm] = useState({
    displayName: "",
    totalBalance: 0,
    BTC: 0,
    USDC: 0,
    USDT: 0,
    TON: 0,
    LTC: 0,
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
    setEditForm({
      displayName: user.displayName || "",
      totalBalance: user.totalBalance || 0,
      BTC: user.holdings?.BTC || 0,
      USDC: user.holdings?.USDC || 0,
      USDT: user.holdings?.USDT || 0,
      TON: user.holdings?.TON || 0,
      LTC: user.holdings?.LTC || 0,
    })
  }

  const handleSave = async () => {
    if (!editingUser) return
    const db = getFirebaseDb()

    await updateDoc(doc(db, "users", editingUser.uid), {
      displayName: editForm.displayName,
      totalBalance: editForm.totalBalance,
      holdings: {
        BTC: editForm.BTC,
        USDC: editForm.USDC,
        USDT: editForm.USDT,
        TON: editForm.TON,
        LTC: editForm.LTC,
      },
    })

    setEditingUser(null)
    fetchUsers()
  }

  const handleDelete = async (uid: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
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
      <AdminHeader title="Users" description="Manage platform users and their balances" />

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
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-zinc-900/50">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">User</TableHead>
                <TableHead className="text-zinc-500">Email</TableHead>
                <TableHead className="text-zinc-500">Balance</TableHead>
                <TableHead className="text-zinc-500">Holdings</TableHead>
                <TableHead className="text-right text-zinc-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.uid} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="font-medium text-white">{user.displayName || "N/A"}</TableCell>
                  <TableCell className="text-zinc-400">{user.email}</TableCell>
                  <TableCell className="text-emerald-400">${(user.totalBalance || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.holdings?.BTC > 0 && (
                        <Badge className="bg-orange-500/20 text-orange-400">{user.holdings.BTC} BTC</Badge>
                      )}
                      {user.holdings?.USDC > 0 && (
                        <Badge className="bg-blue-500/20 text-blue-400">{user.holdings.USDC} USDC</Badge>
                      )}
                      {user.holdings?.USDT > 0 && (
                        <Badge className="bg-emerald-500/20 text-emerald-400">{user.holdings.USDT} USDT</Badge>
                      )}
                      {user.holdings?.TON > 0 && (
                        <Badge className="bg-sky-500/20 text-sky-400">{user.holdings.TON} TON</Badge>
                      )}
                      {user.holdings?.LTC > 0 && (
                        <Badge className="bg-slate-500/20 text-slate-400">{user.holdings.LTC} LTC</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-400 hover:text-white"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-zinc-800 bg-zinc-950 text-white">
                        <DialogHeader>
                          <DialogTitle>Edit User: {user.email}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label>Display Name</Label>
                            <Input
                              value={editForm.displayName}
                              onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                              className="border-zinc-800 bg-zinc-900"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Total Balance ($)</Label>
                            <Input
                              type="number"
                              value={editForm.totalBalance}
                              onChange={(e) => setEditForm({ ...editForm, totalBalance: Number(e.target.value) })}
                              className="border-zinc-800 bg-zinc-900"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label>BTC</Label>
                              <Input
                                type="number"
                                step="0.0001"
                                value={editForm.BTC}
                                onChange={(e) => setEditForm({ ...editForm, BTC: Number(e.target.value) })}
                                className="border-zinc-800 bg-zinc-900"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>USDC</Label>
                              <Input
                                type="number"
                                value={editForm.USDC}
                                onChange={(e) => setEditForm({ ...editForm, USDC: Number(e.target.value) })}
                                className="border-zinc-800 bg-zinc-900"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>USDT</Label>
                              <Input
                                type="number"
                                value={editForm.USDT}
                                onChange={(e) => setEditForm({ ...editForm, USDT: Number(e.target.value) })}
                                className="border-zinc-800 bg-zinc-900"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>TON</Label>
                              <Input
                                type="number"
                                value={editForm.TON}
                                onChange={(e) => setEditForm({ ...editForm, TON: Number(e.target.value) })}
                                className="border-zinc-800 bg-zinc-900"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>LTC</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={editForm.LTC}
                                onChange={(e) => setEditForm({ ...editForm, LTC: Number(e.target.value) })}
                                className="border-zinc-800 bg-zinc-900"
                              />
                            </div>
                          </div>
                          <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(user.uid)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-zinc-500">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
