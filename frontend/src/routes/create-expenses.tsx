import { createFileRoute } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Route = createFileRoute('/create-expenses')({
  component: CreateExpenses,
})

function CreateExpenses() {
  return (
    <div className='w-full m-auto h-2 max-w-lg'>
        <h2>Create Expenses</h2>
        <div className="grid w-full max-w-sm items-center gap-3 mt-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
        </div>

    </div>
  )
}
