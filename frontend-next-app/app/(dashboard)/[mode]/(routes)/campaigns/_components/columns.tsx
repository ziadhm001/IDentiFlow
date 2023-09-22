"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Campaign = {
        _id: string,
        campaignName: string, 
        campaignBrand: string, 
        campaignTarget: string[], 
        campaignDiscountValue: number, 
        isDiscountPercentage: boolean,
        isActive: boolean,
}
export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "campaignName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "isDiscountPercentage",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Currency
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const isPercentage = row.getValue("isDiscountPercentage")
        if(isPercentage !== undefined)
            return <Badge className={cn("bg-emerald-400 hover:bg-emerald-600", isPercentage && "bg-sky-500 hover:bg-sky-700")}>{isPercentage ? "%" : "$"}</Badge>
        else
            return <Badge className="bg-slate-300">No yet selected</Badge>
  }
  },
  {
    accessorKey: "campaignDiscountValue",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Discount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: 'mode',
    header: ({ column }) => {
      return (
        <></>
      )
    },
    cell: ({ row }) => {
      return (
        <></>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Active
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
            const isActive = row.getValue("isActive") || false
            return <Badge className={cn("bg-slate-500", isActive && "bg-sky-700")}>{isActive ? "Active" : "Draft"}</Badge>
      }
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const { _id } = row.original;
        const mode = row.getValue("mode")
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-4 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Link href={`/${mode}/campaigns/${_id}`}>
                        <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  }
]
