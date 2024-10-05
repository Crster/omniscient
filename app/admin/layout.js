import { Suspense } from "react";
import Sidebar from "../../components/Sidebar";

export default function HomeLayout({ children }) {
  return (
    <>
      <Sidebar />

      <div className="flex flex-col gap-8 ml-[20rem] px-5 py-10 overflow-y-auto h-screen">
        <Suspense fallback={<p>Loading...</p>}>
          {children}
        </Suspense>
      </div>
    </>
  );
}
