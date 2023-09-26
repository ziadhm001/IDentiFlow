"use client"
import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Banner } from "@/components/banner"



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  mode: string,
}

export function DataTable<TData, TValue>({
  columns,
  data,
  mode,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [filterValue, setFilterValue] = React.useState<string>()
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    }
  })

  return (
    <div>
         <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Filter customers by name..."
          value={(filterValue) ?? ""}
          onChange={(event) => {
            setFilterValue(event.target.value)
            const firstName = event.target.value.split(' ')[0]
            const lastName = event.target.value?.split(' ')[1]
            table.getColumn("firstName")?.setFilterValue(firstName)
            if(lastName)
              table.getColumn("lastName")?.setFilterValue(lastName)
            else
              table.getColumn("lastName")?.setFilterValue("")
          }
          }
          className="max-w-sm"
        />
        <RadioGroup defaultValue="All" className="grid grid-cols-6 overflow-x-scroll" onValueChange={(value) => {
          if(value === "All")
            table.getColumn("segment")?.setFilterValue("")
          else
            table.getColumn("segment")?.setFilterValue(value)
        }}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="All" id="r0" />
            <Label htmlFor="r0">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Students" id="r1" />
            <Label htmlFor="r1">Students</Label>
          </div>
          <div className="flex items-center space-x-2 ml-12 md:ml-0">
            <RadioGroupItem value="Teachers" id="r2" />
            <Label htmlFor="r2">Teachers</Label>
          </div>
          <div className="flex items-center space-x-2 ml-24 md:ml-0 ">
            <RadioGroupItem value="Healthcare Workers" id="r3" />
            <Label htmlFor="r3">Healthcare Workers</Label>
          </div>
          <div className="flex items-center space-x-2 ml-40 md:ml-5">
            <RadioGroupItem value="Military" id="r4" />
            <Label htmlFor="r4">Military</Label>
          </div>
          <div className="flex items-center space-x-2 ml-48 md:ml-0">
            <RadioGroupItem value="First Responders" id="r5" />
            <Label htmlFor="r5">First Responders</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="">
        <Banner variant="info" label={"Total customers at this filter: " + table.getFilteredRowModel().rows.length}/>
      </div>
        <div className="rounded-md border">
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext() 
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
            
        </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
