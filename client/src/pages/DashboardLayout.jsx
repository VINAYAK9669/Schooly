import Nav from "../components/Nav";

import Profile from "./Profile";

function DashboardLayout() {
  return (
    <div className="w-full ">
      {/* NAVIGATION BAR */}
      <Nav />
      {/* PAGE CONTENT */}
      <div className="p-[2rem]  mt-[8rem]">
        <Profile />
      </div>
    </div>
  );
}

export default DashboardLayout;
