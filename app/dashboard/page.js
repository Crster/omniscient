import Dashboard from "./components/dashboard";
import Sidebar from "./components/sidebar";
import User from "./components/user";

export default function DashboardPage() {
  return (
    <>
      <Sidebar />

      <div className="flex flex-col gap-8 ml-[22rem] my-10 mr-5">
        {/* <Dashboard /> */}
        <User />
      </div>
    </>
  );
}
