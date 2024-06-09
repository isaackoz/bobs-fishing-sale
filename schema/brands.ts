import { defineField, defineType } from "sanity";

export default defineType({
  name: "brands",
  title: "Brands",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
  ],
});
