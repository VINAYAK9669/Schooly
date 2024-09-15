// Removed image imports

import ImageSlider from "../utils/ImageSlider";
import useDeviceWidth from "../hooks/useDevicWidth";
import { Link, Outlet, useLocation } from "react-router-dom";
import { logo } from "../data/fileImports";
import { HiArrowSmallRight } from "react-icons/hi2";

function AuthLayout() {
  const location = useLocation();
  //   custom hook to check the device innerwidth
  const isMobile = useDeviceWidth(768);

  // determine the margin bottom
  const isSignupDesktop = location.pathname.includes("signup") && !isMobile;

  const showAnimatedmages =
    (location.pathname.includes("/") || location.pathname.includes("otp")) &&
    isMobile;

  return (
    <div className="mx-auto  flex  h-screen  w-screen  items-center justify-center   bg-black opacity-65 md:gap-x-[2rem] md:bg-transparent md:pr-2 md:opacity-100 xl:gap-x-[0rem]">
      <div
        className="flex h-screen min-h-screen w-screen max-w-full items-center  justify-center overflow-y-auto  md:gap-x-[1rem]"
        style={showAnimatedmages ? { backgroundColor: "white" } : {}}
      >
        {!showAnimatedmages && (
          <div className="absolute  left-0 top-0 z-[-10] h-screen w-screen overflow-hidden opacity-35 md:static md:flex md:h-screen md:max-h-screen md:w-[75%]  md:items-center md:justify-center md:opacity-100 lg:w-full">
            <ImageSlider />
          </div>
        )}
        <div className=" mx-auto flex h-full w-full flex-col items-center  justify-start overflow-y-auto ">
          <div className=" mt-[1vh] flex flex-col items-center justify-start md:justify-center">
            <div
              className=" mt-[1dvh] flex  h-full w-full md:mt-0  justify-center items-center"
              style={
                isSignupDesktop
                  ? { marginBottom: "1vh" }
                  : showAnimatedmages
                  ? { marginTop: "2vh", marginBottom: "1vh" }
                  : { marginBottom: "0vh" }
              }
            >
              <Link to="/vendor">
                <img
                  src={logo}
                  alt="logo"
                  className=" w-full h-[85px] md:h-[150px]"
                />
              </Link>
            </div>
            <Link
              to="/admin"
              className="flex w-full items-center justify-end pb-5 cursor-pointer font-bold gap-2 text-xl"
            >
              Admin Dashboard <HiArrowSmallRight />
            </Link>

            <h1
              className=" font-raleway text-xl font-bold text-white  md:mb-[1vh] md:w-[425px] md:text-2xl  md:text-primary-medium_gray xl:w-[590px] xl:text-4xl"
              style={showAnimatedmages ? { color: "#171717" } : {}}
            >
              Manage your School with Schooly
            </h1>
          </div>

          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
