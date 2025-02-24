import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { XIcon } from "lucide-react"
import { PencilIcon } from "lucide-react"

export default function OrgMembers() {
  return (
    <section >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">Organization members</h2>
      </div>

      <div className="mb-4">
        <Input placeholder="Search for members" className="max-w-sm" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">NAME</TableHead>
            <TableHead className="w-[300px]">EMAIL</TableHead>
            <TableHead className="w-[150px]">LEVEL</TableHead>
            <TableHead className="w-[150px]">2FA</TableHead>
            <TableHead className="w-[150px]">JOINED</TableHead>
            <TableHead className="w-[150px]">LAST LOGGED IN</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Shanto Islam (you)</TableCell>
            <TableCell>ishanto722722@gmail.com</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>
              <span className="rounded-md bg-yellow-500/20 px-2 py-1 text-xs text-yellow-500">
                2FA not enabled
              </span>
            </TableCell>
            <TableCell>11 days ago</TableCell>
            <TableCell>2 hours ago</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <PencilIcon className="mr-2 size-4" />
                    Edit member
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <XIcon className="mr-2 size-4" />
                    Remove member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  )
}
