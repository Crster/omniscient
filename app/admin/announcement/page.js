"use client";

import _ from "lodash";
import { MdOutlineAdd, MdOutlineFilterAlt } from "react-icons/md";
import { PrimaryButton } from "../../../components/theme/Button";
import { DataTable } from "../../../components/theme/DataTable";
import { useAsyncList } from "@react-stately/data";


export default function AnnouncementPage() {
  const columns = [
    {
      key: "date",
      label: "Date",
      allowsSorting: true,
      template: val => val.date.toLocaleDateString()
    },
    {
      key: "subject",
      label: "Subject",
      allowsSorting: true,
    },
    {
      key: "tag",
      label: "Tag",
      allowsSorting: true,
    },
    {
      key: "recipient",
      label: "Recipient",
      allowsSorting: true,
    },
    {
      key: "sender",
      label: "Sender",
      allowsSorting: true,
    },
  ];

  const rows = useAsyncList({
    load: async () => {
      return { items: [] };
    },
    sort: ({ items, sortDescriptor }) => {
      return {
        items: _.orderBy(
          items,
          sortDescriptor.column,
          sortDescriptor.direction === "descending" ? "desc" : "asc"
        ),
      };
    },
  });

  return (
    <>
      <div className="grid grid-cols-2">
        <h2 className="text-4xl text-blue-500 font-medium">
          Announcement List
        </h2>

        <div className="flex flex-row gap-1 justify-self-end">
          <PrimaryButton
            outline
            className="px-2 py-2 text-blue-700"
            startContent={
              <MdOutlineFilterAlt className="inline text-2xl align-top " />
            }
          >
            Filter
          </PrimaryButton>
          <PrimaryButton
            className="px-2 py-2"
            startContent={
              <MdOutlineAdd className="inline text-2xl align-top" />
            }
          >
            Add Announcement
          </PrimaryButton>
        </div>
      </div>

      <DataTable
        title="Announcement List"
        columns={columns}
        rows={rows}
      />
    </>
  );
}
