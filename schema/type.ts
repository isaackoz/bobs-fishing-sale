import { defineField, defineType } from "sanity";

export default defineType({
  name: "types",
  title: "Item Types",
  type: "document",
  fields: [
    {
      title: "Type Name",
      placeholder: "E.g. Fishing Rod... or Lure...",
      name: "name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 96,
      },
    },
  ],
});
