"use client"

import * as React from "react"
import { BarChart2, Calendar, MoreHorizontal, Tags, Trash, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function BrandsMenu({isAdmin, name, brandId}: {isAdmin: boolean, name: string, brandId: string}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
      <p className="text-sm font-medium leading-none">
        <span className={cn("mr-2 rounded-lg px-2 py-1 bg-yellow-500 text-xs text-primary-foreground", isAdmin && "bg-sky-800")}>
          {isAdmin ? "Admin" : "Staff"}
        </span>
        <span className="text-muted-foreground">{name}</span>
      </p>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="mx-2">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>{name + " Actions"}</DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link className="flex flex-row" href={`/${brandId}/campaigns`}>
              <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      Campaigns
              </DropdownMenuItem>
            </Link>
            <Link className="flex flex-row" href={`/${brandId}/analytics`}>
              <DropdownMenuItem>
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Analytics
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
