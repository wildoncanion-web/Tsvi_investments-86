"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, doc, setDoc, deleteDoc, Timestamp } from "firebase/firestore"
import { getFirebaseDb } from "@/lib/firebase"
import { AdminHeader } from "@/components/admin/admin-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Plus, Trash2, Edit, Percent, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BonusConfig {
  id: string
  name: string
  description: string
  type: "signup" | "deposit" | "referral" | "loyalty" | "custom"
  amount: number
  isPercentage: boolean
  minDeposit?: number
  maxBonus?: number
  isActive: boolean
  createdAt: { seconds: number }
}

export default function AdminBonusesPage() {
  const [bonuses, setBonuses] = useState<BonusConfig[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBonus, setEditingBonus] = useState<BonusConfig | null>(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "custom" as BonusConfig["type"],
    amount: 0,
    isPercentage: false,
    minDeposit: 0,
    maxBonus: 0,
    isActive: true,
  })

  const fetchBonuses = async () => {
    const db = getFirebaseDb()
    const snapshot = await getDocs(collection(db, "bonusConfigs"))
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BonusConfig[]
    setBonuses(data)
  }

  useEffect(() => {
    fetchBonuses()
  }, [])

  const handleEdit = (bonus: BonusConfig) => {
    setEditingBonus(bonus)
    setForm({
      name: bonus.name,
      description: bonus.description,
      type: bonus.type,
      amount: bonus.amount,
      isPercentage: bonus.isPercentage,
      minDeposit: bonus.minDeposit || 0,
      maxBonus: bonus.maxBonus || 0,
      isActive: bonus.isActive,
    })
    setDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingBonus(null)
    setForm({
      name: "",
      description: "",
      type: "custom",
      amount: 0,
      isPercentage: false,
      minDeposit: 0,
      maxBonus: 0,
      isActive: true,
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    const db = getFirebaseDb()
    const bonusData = {
      ...form,
      createdAt: editingBonus?.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    if (editingBonus) {
      await setDoc(doc(db, "bonusConfigs", editingBonus.id), bonusData)
    } else {
      const newId = `bonus_${Date.now()}`
      await setDoc(doc(db, "bonusConfigs", newId), bonusData)
    }

    setDialogOpen(false)
    fetchBonuses()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this bonus configuration?")) {
      const db = getFirebaseDb()
      await deleteDoc(doc(db, "bonusConfigs", id))
      fetchBonuses()
    }
  }

  const handleToggle = async (bonus: BonusConfig) => {
    const db = getFirebaseDb()
    await setDoc(doc(db, "bonusConfigs", bonus.id), {
      ...bonus,
      isActive: !bonus.isActive,
    })
    fetchBonuses()
  }

  const getBonusTypeColor = (type: string) => {
    switch (type) {
      case "signup":
        return "bg-emerald-500/20 text-emerald-400"
      case "deposit":
        return "bg-blue-500/20 text-blue-400"
      case "referral":
        return "bg-purple-500/20 text-purple-400"
      case "loyalty":
        return "bg-amber-500/20 text-amber-400"
      default:
        return "bg-zinc-500/20 text-zinc-400"
    }
  }

  return (
    <div>
      <AdminHeader title="Bonus Configuration" description="Configure and manage platform bonuses" />

      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-emerald-500/20 bg-zinc-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Active Bonuses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">{bonuses.filter((b) => b.isActive).length}</div>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/20 bg-zinc-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Signup Bonuses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {bonuses.filter((b) => b.type === "signup" && b.isActive).length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/20 bg-zinc-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Deposit Bonuses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">
                {bonuses.filter((b) => b.type === "deposit" && b.isActive).length}
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/20 bg-zinc-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Total Configurations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">{bonuses.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Bonus Configurations</h2>
          <Button onClick={handleCreate} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Bonus
          </Button>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-zinc-900/50">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-500">Name</TableHead>
                <TableHead className="text-zinc-500">Type</TableHead>
                <TableHead className="text-zinc-500">Amount</TableHead>
                <TableHead className="text-zinc-500">Min Deposit</TableHead>
                <TableHead className="text-zinc-500">Status</TableHead>
                <TableHead className="text-right text-zinc-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bonuses.map((bonus) => (
                <TableRow key={bonus.id} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{bonus.name}</p>
                      <p className="text-sm text-zinc-500">{bonus.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getBonusTypeColor(bonus.type)}>{bonus.type}</Badge>
                  </TableCell>
                  <TableCell className="text-emerald-400 font-medium">
                    {bonus.isPercentage ? `${bonus.amount}%` : `$${bonus.amount}`}
                    {bonus.maxBonus && bonus.isPercentage && (
                      <span className="text-zinc-500 text-sm ml-1">(max ${bonus.maxBonus})</span>
                    )}
                  </TableCell>
                  <TableCell className="text-zinc-400">{bonus.minDeposit ? `$${bonus.minDeposit}` : "-"}</TableCell>
                  <TableCell>
                    <Switch checked={bonus.isActive} onCheckedChange={() => handleToggle(bonus)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-white"
                      onClick={() => handleEdit(bonus)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(bonus.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {bonuses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-zinc-500 py-8">
                    <Gift className="h-12 w-12 mx-auto mb-2 text-zinc-700" />
                    No bonus configurations yet. Create your first bonus!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-amber-500" />
              {editingBonus ? "Edit Bonus" : "Create New Bonus"}
            </DialogTitle>
            <DialogDescription className="text-zinc-500">Configure the bonus settings and conditions</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label>Bonus Name</Label>
              <Input
                placeholder="e.g., Welcome Bonus"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-zinc-800 bg-zinc-900"
              />
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe this bonus..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border-zinc-800 bg-zinc-900 min-h-[80px]"
              />
            </div>

            <div className="grid gap-2">
              <Label>Bonus Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as typeof form.type })}>
                <SelectTrigger className="border-zinc-800 bg-zinc-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-zinc-950">
                  <SelectItem value="signup">Signup Bonus</SelectItem>
                  <SelectItem value="deposit">Deposit Bonus</SelectItem>
                  <SelectItem value="referral">Referral Bonus</SelectItem>
                  <SelectItem value="loyalty">Loyalty Bonus</SelectItem>
                  <SelectItem value="custom">Custom Bonus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  className="border-zinc-800 bg-zinc-900"
                />
              </div>
              <div className="grid gap-2">
                <Label>Type</Label>
                <div className="flex items-center gap-4 h-10">
                  <Button
                    type="button"
                    variant={!form.isPercentage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setForm({ ...form, isPercentage: false })}
                    className={!form.isPercentage ? "bg-emerald-600" : "border-zinc-700"}
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Fixed
                  </Button>
                  <Button
                    type="button"
                    variant={form.isPercentage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setForm({ ...form, isPercentage: true })}
                    className={form.isPercentage ? "bg-emerald-600" : "border-zinc-700"}
                  >
                    <Percent className="h-4 w-4 mr-1" />
                    Percentage
                  </Button>
                </div>
              </div>
            </div>

            {(form.type === "deposit" || form.isPercentage) && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Minimum Deposit ($)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={form.minDeposit}
                    onChange={(e) => setForm({ ...form, minDeposit: Number(e.target.value) })}
                    className="border-zinc-800 bg-zinc-900"
                  />
                </div>
                {form.isPercentage && (
                  <div className="grid gap-2">
                    <Label>Maximum Bonus ($)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={form.maxBonus}
                      onChange={(e) => setForm({ ...form, maxBonus: Number(e.target.value) })}
                      className="border-zinc-800 bg-zinc-900"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-4">
              <div>
                <Label>Active Status</Label>
                <p className="text-sm text-zinc-500">Enable or disable this bonus</p>
              </div>
              <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-zinc-700">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
              {editingBonus ? "Save Changes" : "Create Bonus"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
