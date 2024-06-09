import { DataTable } from "./data-table";
import { getItemsByCollection, type Item } from "@/utils/sanity";
import { columns } from "./columns";
export function TableWrapper({ data }: { data: Item[] }) {
  return <DataTable data={data} columns={columns} />;
}
