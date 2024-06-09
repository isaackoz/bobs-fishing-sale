"use client";

import type { Item } from "@/utils/sanity";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";

import { urlFor } from "@/utils/sanity-img-url";

export const columns: ColumnDef<Item, any>[] = [
  {
    id: "coverImage",
    header: "Image",
    cell: ({ row }) => {
      return (
        <span className="bg-white h-32 w-48 flex items-center justify-center rounded-md">
          <img
            src={urlFor(row.original.mainImage).width(200).url()}
            className="h-32 object-contain"
          />
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "refId",
    header: "Reference-ID",
  },
  {
    accessorKey: "name",
    header: "Item Name",
    enableSorting: true,
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <a href={`/item/${row.original._id}`}>
          <Button>Details</Button>
        </a>
      );
    },
  },
];
