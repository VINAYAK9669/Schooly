import { NavLink } from "react-router-dom";

function SideBar() {
  const activeLinkStyle =
    "relative text-blue-500 after:absolute after:h-full after:w-[8px] after:bg-gradient-to-b after:from-pink-start after:to-pink-end after:content-['']  h-[57px] w-[320px]  flex items-center justify-start bg-secondary-userPage_bg inline-block bg-gradient-to-r from-pink-start to-pink-end bg-clip-text font-semibold text-transparent";
  const listStyle = "h-[57px] w-[320px] flex items-center ";
  return (
    <aside className="sidebar border-1 h-full w-[320px] overflow-x-hidden rounded-[24px] bg-white pt-8 text-primary-strong_gray shadow-3xl">
      <ul>
        <li className={listStyle}>
          <NavLink className="font-lg font-semibold ">
            <span className="ml-5 font-bold !text-xl !pl-[-5rem]">Manage</span>
          </NavLink>
        </li>
        <li className={listStyle}>
          <NavLink
            to="/admin/class"
            className={({ isActive }) =>
              isActive
                ? activeLinkStyle
                : "font-lg font-semibold text-secondary-nav_inactive_color"
            }
          >
            <span className="ml-[2rem]">Class</span>
          </NavLink>
        </li>
        <li className={listStyle}>
          <NavLink
            to="/admin/teacher"
            className={({ isActive }) =>
              isActive
                ? activeLinkStyle
                : "font-lg font-semibold text-secondary-nav_inactive_color"
            }
          >
            <span className="ml-[2rem]">Teacher</span>
          </NavLink>
        </li>
        <li className={listStyle}>
          <NavLink
            to="/admin/student"
            className={({ isActive }) =>
              isActive
                ? activeLinkStyle
                : "font-lg font-semibold text-secondary-nav_inactive_color"
            }
          >
            <span className="ml-[2rem]">Student</span>
          </NavLink>
        </li>

        <li className={listStyle}>
          <NavLink
            to="/admin/finance"
            className={({ isActive }) =>
              isActive
                ? activeLinkStyle
                : "font-lg font-semibold text-secondary-nav_inactive_color"
            }
          >
            <span className="ml-[2rem]">Finance</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
