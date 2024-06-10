import { defineField, defineType } from "sanity";
import { ReValidate } from "./reValidate";

export default defineType({
  name: "actions",
  title: "Actions",
  type: "document",
  fields: [
    {
      name: "revalidate",
      title: "Revaliidate",
      components: { input: ReValidate },
      description:
        "After changing the data, press this to publish it. This takes about 60-180s, so be patient.",
      type: "string",
    },
  ],
});
