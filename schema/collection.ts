import { defineField, defineType } from "sanity";

export default defineType({
  name: "collections",
  title: "Collections",
  type: "document",
  fields: [
    {
      title: "Collection Name",
      name: "name",
      type: "string",
    },
    {
      title: "Description",
      name: "description",
      type: "text",
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
