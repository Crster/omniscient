import {
  MdOutlineCheckBox,
  MdOutlineDelete,
  MdOutlineEdit,
} from "react-icons/md";
import Sidebar from "../ui/components/sidebar";
import NewUserModal from "../ui/modal/new-user";

export default function UserPage() {
  return (
    <>
      <Sidebar />

      <div className="flex flex-col gap-8 ml-[22rem] my-10 mr-5">
        <div className="grid grid-cols-2">
          <h2 className="text-4xl text-blue-500 font-medium">User List</h2>
          <NewUserModal />
        </div>

        <div>
          <div className="grid grid-cols-5 text-gray-500 px-1 py-4">
            <div className="font-normal text-left">
              <MdOutlineCheckBox className="inline text-2xl align-top" /> User
              Role
            </div>
            <div className="font-normal text-left">Name</div>
            <div className="font-normal text-left">Barangay</div>
            <div className="font-normal text-left">Status</div>
            <div className="font-normal text-right w-40"></div>
          </div>

          <div className="grid grid-cols-5 bg-gray-100 px-1 py-4 border-t border-b">
            <div className="text-blue-500">
              <MdOutlineCheckBox className="inline text-2xl align-top text-gray-500" />{" "}
              Surveyor
            </div>
            <div className="text-black">R.Kimaruu</div>
            <div className="text-black">Ubalde</div>
            <div className="text-blue-500">
              <span className="bg-blue-100 px-2 py-1 rounded-md">Active</span>
            </div>
            <div className="flex flex-row gap-1 justify-end">
              <MdOutlineEdit className="text-2xl text-blue-500" />
              <MdOutlineDelete className="text-2xl text-gray-500" />
            </div>
          </div>

          {Array.from(Array(40).keys()).map((k) => (
            <div key={k} className="grid grid-cols-5 px-1 py-4">
              <div className="text-blue-500">
                <MdOutlineCheckBox className="inline text-2xl align-top text-gray-500" />{" "}
                Surveyor
              </div>
              <div className="text-black">R.Kimaruu {k}</div>
              <div className="text-black">Ubalde</div>
              <div className="text-blue-500">
                <span className="bg-blue-100 px-2 py-1 rounded-md">Active</span>
              </div>
              <div className="flex flex-row gap-1 justify-end">
                <MdOutlineEdit className="text-2xl text-blue-500" />
                <MdOutlineDelete className="text-2xl text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
