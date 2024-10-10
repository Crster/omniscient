import { ReactElement } from "react";

import Sidebar from "../Sidebar";

export default function AdminLayout(props: { children: ReactElement }) {
  return (
    <>
      <Sidebar />

      <div className="flex flex-col gap-8 ml-[20rem] px-5 py-10 overflow-y-auto h-screen">{props.children}</div>
    </>
  );
}
