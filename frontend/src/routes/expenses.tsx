import { createFileRoute } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'


export const Route = createFileRoute('/expenses')({
  component: GetExpenses,
})

async function getAllExpenses() {
    const res = await api.api.expenses.$get();

    if(!res.ok) {
        throw new Error("Failed fetch server error!")
    }

    const data = await res.json()

    return data;
}

function GetExpenses() {

    const { data, isPending, error } = useQuery({
        queryKey: ["get-all-expenses"],
        queryFn: getAllExpenses,
    })


    if (error) return 'An error has occurred: ' + error.message

  return (
    <Table className='w-full max-w-lg m-auto'>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending ? Array(3).fill(0).map((_, i) => (
           <TableRow key={i}>
            <TableCell className="font-medium">
                <Skeleton  className='h-4'/>
            </TableCell>
            <TableCell>
                <Skeleton className='h-4'/>
            </TableCell>
            <TableCell className="text-right">
                <Skeleton className='h-4' />
            </TableCell>
          </TableRow>
        )) :data?.fakseExpenses.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell className="text-right">{item.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <pre>
        {isPending ? "..." : JSON.stringify(data, null, 0)}
      </pre>
    </Table>
  )
}
