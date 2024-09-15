import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";

function AdminDashboardLayout() {
  return (
    <div className="flex min-h-[60vh] w-screen flex-col items-center justify-center gap-y-[0.5rem] overflow-visible overflow-x-hidden  bg-[#F9F9F9] md:gap-y-[3rem] pb-[2rem] z-0">
      <header className=" w-full">
        <Nav />
      </header>

      <div className="relative mx-auto  mt-[1rem] flex h-full w-[95%]  max-w-[1448px] gap-5 md:mt-[6rem]">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div
          className="border-1  flex-grow  overflow-x-auto overflow-y-hidden rounded-[8px] bg-white text-primary-strong_gray shadow-3xl lg:min-h-[787px] lg:rounded-[24px]"
          id="profileWrapper"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
