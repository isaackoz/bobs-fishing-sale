import { defineField, defineType } from "sanity";
import { RefIDInput } from "./RefIDInput";

export default defineType({
  name: "items",
  title: "Items",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Item Name",
      type: "string",
    }),
    {
      name: "refId",
      title: "Reference ID",
      components: { input: RefIDInput },
      type: "string",
      readOnly: true,
    },
    {
      name: "mainImage",
      title: "Primary Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "otherImages",
      title: "Other Images",
      type: "array",
      description: "Other images will be displayed on the items dedicated page",
      of: [{ type: "image" }],
    },
    {
      name: "info",
      title: "Item Info",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collections" }],
    },
    {
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brands" }],
    },
  ],
});
