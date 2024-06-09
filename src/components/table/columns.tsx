"use client";

import type { Item } from "@/utils/sanity";
import { type ColumnDef } from "@tanstack/react-table";
import SanityImage from "../SanityImage.astro";

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "mainImage",
    header: "Image",
    cell: ({ row }) => {
      <SanityImage
        node={row.getValue("mainImage")}
        width="192"
        className="object-contain h-24"
      />;
    },
  },
  {
    accessorKey: "refId",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Amount",
  },
  {
    accessorKey: "brand",
    header: "Amount",
  },
];
