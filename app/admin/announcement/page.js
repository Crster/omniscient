"use client";

import { MdOutlineAdd, MdOutlineFilterAlt } from "react-icons/md";
import { PrimaryButton } from "../../components/theme/Button";
import { DataTable } from "../../components/theme/DataTable";

export default function AnnouncementPage() {
  const announcementTableColumns = [
    {
      name: "date",
      label: "Date",
      sortable: true,
      template: val => val.toLocaleDateString()
    },
    {
      name: "subject",
      label: "Subject",
      sortable: true,
    },
    {
      name: "tag",
      label: "Tag",
      sortable: true,
    },
    {
      name: "recipient",
      label: "Recipient",
      sortable: true,
    },
    {
      name: "sender",
      label: "Sender",
      sortable: true,
    },
  ];

  const handleOnload = () => {
    return Promise.resolve([
      {
        id: Math.random(),
        date: new Date(),
        subject: "Babala asawa ni Babalu",
        tag: "test",
        recipient: "All barangay Tagalog",
        sender: "Admin",
      },
    ]);
  };

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
        columns={announcementTableColumns}
        onLoad={handleOnload}
      />
    </>
  );
}
