import { MdOutlineCheckBox, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

export default function User() {
  return (
    <>
      <h2 className="text-4xl text-blue-500 font-medium">User List</h2>

      <table>
        <tr className="text-gray-500">
          <th className="font-normal text-left"><MdOutlineCheckBox className="inline text-2xl align-top"/> User Role</th>
          <th className="font-normal text-left">Name</th>
          <th className="font-normal text-left">Barangay</th>
          <th className="font-normal text-left">Status</th>
          <th className="font-normal text-right w-40"></th>
        </tr>
        <tr className=" bg-gray-100 border-gray-100 border-t-[10px] border-b-[10px]">
          <td className="text-blue-500"><MdOutlineCheckBox className="inline text-2xl align-top text-gray-500"/> Surveyor</td>
          <td className="text-black">R.Kimaruu</td>
          <td className="text-black">Ubalde</td>
          <td className="text-blue-500"><span className="bg-blue-100 px-2 py-1 rounded-md">Active</span></td>
          <td className="text-right">
            <MdOutlineEdit className="inline text-2xl align-top text-blue-500"/>
            <MdOutlineDelete className="inline text-2xl align-top text-gray-500"/>
          </td>
        </tr>
        <tr className=" border-transparent border-t-[10px] border-b-[10px]">
          <td className="text-blue-500"><MdOutlineCheckBox className="inline text-2xl align-top text-gray-500"/> Surveyor</td>
          <td className="text-black">R.Kimaruu</td>
          <td className="text-black">Ubalde</td>
          <td className="text-blue-500"><span className="bg-blue-100 px-2 py-1 rounded-md">Active</span></td>
          <td className="text-right">
            <MdOutlineEdit className="inline text-2xl align-top text-blue-500"/>
            <MdOutlineDelete className="inline text-2xl align-top text-gray-500"/>
          </td>
        </tr>
        <tr className=" border-transparent border-t-[10px] border-b-[10px]">
          <td className="text-blue-500"><MdOutlineCheckBox className="inline text-2xl align-top text-gray-500"/> Surveyor</td>
          <td className="text-black">R.Kimaruu</td>
          <td className="text-black">Ubalde</td>
          <td className="text-blue-500"><span className="bg-blue-100 px-2 py-1 rounded-md">Active</span></td>
          <td className="text-right">
            <MdOutlineEdit className="inline text-2xl align-top text-blue-500"/>
            <MdOutlineDelete className="inline text-2xl align-top text-gray-500"/>
          </td>
        </tr>
        <tr className=" border-transparent border-t-[10px] border-b-[10px]">
          <td className="text-blue-500"><MdOutlineCheckBox className="inline text-2xl align-top text-gray-500"/> Surveyor</td>
          <td className="text-black">R.Kimaruu</td>
          <td className="text-black">Ubalde</td>
          <td className="text-blue-500"><span className="bg-blue-100 px-2 py-1 rounded-md">Active</span></td>
          <td className="text-right">
            <MdOutlineEdit className="inline text-2xl align-top text-blue-500"/>
            <MdOutlineDelete className="inline text-2xl align-top text-gray-500"/>
          </td>
        </tr>
        <tr className=" border-transparent border-t-[10px] border-b-[10px]">
          <td className="text-blue-500"><MdOutlineCheckBox className="inline text-2xl align-top text-gray-500"/> Surveyor</td>
          <td className="text-black">R.Kimaruu</td>
          <td className="text-black">Ubalde</td>
          <td className="text-blue-500"><span className="bg-blue-100 px-2 py-1 rounded-md">Active</span></td>
          <td className="text-right">
            <MdOutlineEdit className="inline text-2xl align-top text-blue-500"/>
            <MdOutlineDelete className="inline text-2xl align-top text-gray-500"/>
          </td>
        </tr>
        <tr className=" border-transparent border-t-[10px] border-b-[10px]">
          <td className="text-blue-500"><MdOutlineCheckBox className="inline text-2xl align-top text-gray-500"/> Surveyor</td>
          <td className="text-black">R.Kimaruu</td>
          <td className="text-black">Ubalde</td>
          <td className="text-blue-500"><span className="bg-blue-100 px-2 py-1 rounded-md">Active</span></td>
          <td className="text-right">
            <MdOutlineEdit className="inline text-2xl align-top text-blue-500"/>
            <MdOutlineDelete className="inline text-2xl align-top text-gray-500"/>
          </td>
        </tr>
        <tr className=" border-transparent border-t-[10px] border-b-[10px]">
          <td className="text-blue-500"><MdOutlineCheckBox className="inline text-2xl align-top text-gray-500"/> Surveyor</td>
          <td className="text-black">R.Kimaruu</td>
          <td className="text-black">Ubalde</td>
          <td className="text-blue-500"><span className="bg-blue-100 px-2 py-1 rounded-md">Active</span></td>
          <td className="text-right">
            <MdOutlineEdit className="inline text-2xl align-top text-blue-500"/>
            <MdOutlineDelete className="inline text-2xl align-top text-gray-500"/>
          </td>
        </tr>
        
      </table>
    </>
  );
}
