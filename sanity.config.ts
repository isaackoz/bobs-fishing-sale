import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schema";
import { visionTool } from "@sanity/vision";

const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID!;
const dataset = import.meta.env.PUBLIC_SANITY_STUDIO_DATASET!;

if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2
    )}`
  );
}

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["index"]);

export default defineConfig({
  name: "default",
  title: "listings-astro",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Our singleton type has a list item with a custom child
            S.listItem().title("Home Page").id("index").child(
              // Instead of rendering a list of documents, we render a single
              // document, specifying the `documentId` manually to ensure
              // that we're editing the single instance of the document
              S.document().schemaType("index").documentId("index")
            ),

            // Regular document types
            S.documentTypeListItem("brands").title("Brands"),
            S.documentTypeListItem("collections").title("Collection"),
            S.documentTypeListItem("items").title("Items"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
