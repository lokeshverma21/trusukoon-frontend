"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

export type Staff = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  services: string[]
  googleCalendarConnected: boolean
}

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.role}</Badge>
    ),
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }) => (
      <div className="max-w-[180px] truncate">
        {row.original.services.join(", ")}
      </div>
    ),
  },
  {
    accessorKey: "googleCalendarConnected",
    header: "Google Calendar",
    cell: ({ row }) =>
      row.original.googleCalendarConnected ? (
        <Badge className="bg-green-100 text-green-800">Connected</Badge>
      ) : (
        <Badge className="bg-red-100 text-red-800">Not Connected</Badge>
      ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]
