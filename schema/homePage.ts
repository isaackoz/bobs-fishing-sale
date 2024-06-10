import { defineField, defineType } from "sanity";

export default defineType({
  name: "index",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "info",
      title: "Item Info",
      description:
        "This is the info that goes on the main page. Put contact info or other stuff here.",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
});
