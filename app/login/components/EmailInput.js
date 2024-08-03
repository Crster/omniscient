import { MdOutlineMail } from "react-icons/md";

export default function EmailInput() {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="email-input" className="font-normal text-sm">
        Email
      </label>
      <div className="flex bg-blue-100 rounded-lg px-2 py-3 items-center">
        <MdOutlineMail className="text-lg w-8" />
        <input
          id="email-input"
          className="bg-blue-100 w-full focus:outline-none"
          placeholder="Enter account email"
        />
      </div>
    </div>
  );
}
