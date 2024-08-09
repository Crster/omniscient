import { Suspense } from "react";
import Sidebar from "../../components/sidebar";

export default function HomeLayout({ children }) {
  return (
    <>
      <p>{new Date().toLocaleString()}</p>
      <Sidebar />

      <div className="flex flex-col gap-8 ml-[22rem] my-10 mr-5">
        <Suspense fallback={<p>Loading...</p>}>
          {children}
        </Suspense>
      </div>
    </>
  );
}
