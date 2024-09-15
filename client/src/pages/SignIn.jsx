/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import { useState } from "react";
import useApiFun from "../confiiguration/useApiFun";
import useRouter from "../confiiguration/useRouter";

function SignIn() {
  // styles
  const divStyle = "w-full h-[40px] md:h-[50px]";
  const inputStyle = (hasError) =>
    `h-full w-full text-base text-[#737373] font-nunito outline-none pl-[12px] rounded-[4px] font-normal border-2 ${
      hasError ? "border-[1.5px] border-[#E00D20]" : "border-[#d3d3d3]"
    }`;
  const errorStyle =
    "text-sm text-[#E00D20] font-normal font-nunito mt-[0.2rem]";
  const [signIn, setSignIn] = useState([]);

  const [isStudent, setIsStudent] = useState(false);

  const { signinStudent, signinTeacher } = useRouter();

  // React-Hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    isStudent ? signinStudent.mutate(data) : signinTeacher.mutate(data);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default Enter key behavior
      handleSubmit(onSubmit)(); // Manually trigger form submission
    }
  };

  return (
    <div
      className="flex h-full w-[300px] flex-col justify-center md:h-full md:w-[425px] xl:w-[590px]"
      id="modalParent"
    >
      <p className="mb-[5vh] mt-[2vh] font-nunito text-av font-normal text-white md:text-lg md:text-primary-normal_gray">
        Welcome Back, Sign in to your Schooly account
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown} // Attach keydown event
        className="flex w-full flex-col justify-center gap-y-[1.2rem]"
      >
        <p className="hidden font-nunito text-xl font-normal text-primary-medium_gray md:block">
          Enter your Credentials
        </p>
        <div className={divStyle}>
          <input
            placeholder="Enter your mail id"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Invalid email",
              },
            })}
            className={inputStyle(errors.email)}
          />
          {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
        </div>
        <div className={divStyle}>
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className={inputStyle(errors.password)}
          />
          {errors.password && (
            <p className={errorStyle}>{errors.password.message}</p>
          )}
        </div>
        {/* USER CATEGORY (STUDENT OR TEACHER) */}
        <div className={divStyle}>
          <label className="font-nunito text-base text-gray-700 font-semibold">
            Profession
          </label>
          <div className="flex items-center gap-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="STUDENT"
                {...register("profession", {
                  required: "Please select if you're a student or teacher",
                })}
                className="radio-input hidden"
                onClick={() => setIsStudent(true)}
              />
              <span className="custom-radio ml-2">Student</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="TEACHER"
                {...register("profession", {
                  required: "Please select if you're a student or teacher",
                })}
                className="radio-input hidden"
                onClick={() => setIsStudent(false)}
              />
              <span className="custom-radio ml-2">Teacher</span>
            </label>
          </div>
          {errors.profession && (
            <p className={errorStyle}>{errors?.profession?.message}</p>
          )}
          <br /> <br />
        </div>

        {signIn?.error?.response?.status === 400 && (
          <p className={errorStyle}>Email or Password are incorrect</p>
        )}
        <div className="mt-2">
          <Button btnType="signup">
            {signIn.isPending ? (
              <span className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></span>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>

        <div className="mt-[10vh] flex flex-row items-center justify-center gap-2 md:mt-[2vh]">
          <p className="font-nunito text-av font-semibold ext-primary-medium_gray">
            Don&apos;t have an account?{" "}
            <Link
              to="/"
              className="font-nunito text-base font-bold  hover:underline md:text-xl text-primary-anchor"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
