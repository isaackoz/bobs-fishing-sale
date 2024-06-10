"use client";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React from "react";
interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

const searchMap = new Map<string, string>([
  ["name", "Name"],
  ["brand", "Brand"],
  ["refId", "Reference ID"],
]);

export function DataTable<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [searchBy, setSearchBy] = React.useState<string>("name");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      columnFilters,
    },
  });

  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="mr-2">
            <Button>Search by: {searchMap.get(searchBy)}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Search by...</DropdownMenuLabel>
            {Array.from(searchMap.entries()).map(([key, label]) => (
              <DropdownMenuItem key={key} onClick={() => setSearchBy(key)}>
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          placeholder={`Filter by ${searchMap.get(searchBy)}...`}
          value={(table.getColumn(searchBy)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchBy)?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
      </div>
      <Table className="bg-slate-300">
        <TableHeader className=" ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="first:rounded-l-lg last:rounded-r-lg p-4 bg-slate-400 hover:bg-slate-500"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-black">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
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
                className="bg-slate-300 hover:bg-slate-400/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
