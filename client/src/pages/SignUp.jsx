/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../utils/Button";
import useDeviceWidth from "../hooks/useDevicWidth";

import useRouter from "../confiiguration/useRouter";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../slices/authSlice";

function SignUp() {
  const isMobile = useDeviceWidth(640);
  const divStyle = "w-full h-[40px] xl:h-[50px] mt-1    ";
  const inputStyle =
    "h-full w-full text-base text-[#737373] font-nunito outline-none px-[12px] rounded-[4px] font-normal border-2 bg-transparent";
  const errorStyle = "text-sm text-[#E00D20] font-normal font-nunito";

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [isStudent, setIsStudent] = useState(false);

  const [signUp, setSignUp] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const { signupStudent, classLists, signupTeacher } = useRouter();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (validatePasswords()) {
      const signUpData = isStudent
        ? {
            name: data.name,
            phone: data.mobile,
            email: data.email,
            password: data.password,
            gender: data.gender,
            profession: data.profession,
            dob: data.dob,
            enrolledClass: data.enrolledClass,
          }
        : {
            name: data.name,
            mobileNumber: data.mobile,
            email: data.email,
            password: data.password,
            gender: data.gender,
            profession: data.profession,
            dob: data.dob,
          };

      isStudent
        ? signupStudent.mutate(signUpData)
        : signupTeacher.mutate(signUpData);
      dispatch(setCurrentUser({ email: data.email, password: data.password }));
    }
  };

  const validatePasswords = () => {
    if (watch("password") !== watch("rePassword")) {
      setError("rePassword", {
        type: "manual",
        message: "Passwords don't match!",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    isStudent && classLists.refetch();
  }, [isStudent]);

  return (
    <div className="mx-auto mt-[0.2vh] flex h-full  max-h-[957px]  w-[300px] flex-col justify-center  md:w-[425px] xl:w-[590px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col md:grid md:grid-cols-2 w-full md:gap-[2rem] justify-center gap-y-[1rem] "
      >
        {/* Full Name */}
        <div className={divStyle}>
          <input
            placeholder="Full Name*"
            type="text"
            {...register("name", {
              required: "Full Name is required",
            })}
            className={`${inputStyle} ${
              errors.email && "border-[1.5px] border-[#E00D20]"
            }`}
          />
          {(errors.name || signUp.data?.response?.status === 400) && (
            <p className={errorStyle}>
              {signUp.data?.response?.status === 400
                ? "User already registered"
                : errors?.name?.message}
            </p>
          )}
        </div>
        {/* EMAIL */}
        <div className={divStyle}>
          <input
            placeholder="Email*"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Invalid email",
              },
            })}
            className={`${inputStyle} ${
              errors.email && "border-[1.5px] border-[#E00D20]"
            }`}
          />
          {(errors.email || signUp.data?.response?.status === 400) && (
            <p className={errorStyle}>
              {signUp.data?.response?.status === 400
                ? "Vendor already registered"
                : errors?.email?.message}
            </p>
          )}
        </div>
        {/* MOBILE NUMBER */}
        <div className={divStyle}>
          <input
            placeholder="Mobile Number"
            type="number"
            {...register("mobile", {
              required: "Mobile Number is required",
              minLength: {
                value: 10,
                message: "Mobile number must be exactly 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Mobile number must be exactly 10 digits",
              },
              validate: (value) =>
                /^[0-9]+$/.test(value) ||
                "Mobile number must contain only digits", // Extra validation
            })}
            onKeyDown={(e) => {
              if (
                e.key === "e" ||
                e.key === "E" ||
                e.key === "+" ||
                e.key === "-" ||
                e.key === "." ||
                e.key === "w"
              ) {
                e.preventDefault(); // Prevent invalid characters
              }
            }}
            className={`${inputStyle} ${
              errors.mobile && "border-[1.5px] border-[#E00D20]"
            }`}
          />
          {errors.mobile && (
            <p className={errorStyle}>{errors?.mobile?.message}</p>
          )}
        </div>
        {/* Date Of Birth */}
        <div className={divStyle}>
          <input
            placeholder="Date of Birth"
            type="date"
            {...register("dob", {
              required: "Date of Birth is required",
              validate: {
                validDate: (value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  return (
                    selectedDate < currentDate ||
                    "Date of Birth cannot be in the future"
                  );
                },
              },
            })}
            className={`${inputStyle} ${
              errors.dob && "border-[1.5px] border-[#E00D20]"
            }`}
          />
          {errors.dob && <p className={errorStyle}>{errors?.dob?.message}</p>}
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
        {/* Gender */}

        <div className={divStyle}>
          <label className="font-nunito text-base text-gray-700 font-semibold ">
            Gender
          </label>
          <div className="flex items-center gap-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="MALE"
                {...register("gender", {
                  required: "Please select your gender",
                })}
                className="radio-input hidden"
              />
              <span className="custom-radio ml-2">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="FEMALE"
                {...register("gender", {
                  required: "Please select your gender",
                })}
                className="radio-input hidden"
              />

              <span className="custom-radio ml-2">Female</span>
            </label>
          </div>
          {errors.gender && (
            <p className={`${errorStyle}`}>{errors?.gender?.message}</p>
          )}
        </div>

        {isStudent && (
          <>
            <div className={divStyle}>
              <select
                {...register("enrolledClass", {
                  required: "Please select a class",
                })}
                className={`${inputStyle} flex items-center justify-between !px-0 ${
                  errors.enrolledClass && "border-[1.5px] border-[#E00D20]"
                }`}
              >
                <option value="">--select class</option>
                {classLists?.data?.data?.map((curClass) => (
                  <option key={curClass._id} value={curClass._id}>
                    {curClass.classGrade}&nbsp; -&nbsp; ₹ {curClass.studentFees}
                  </option>
                ))}
              </select>
              {errors.enrolledClass && (
                <p className={errorStyle}>{errors?.enrolledClass?.message}</p>
              )}
            </div>
          </>
        )}

        {/* PASSWORD */}
        <div className={`${divStyle} `}>
          <div
            className={`${inputStyle} flex items-center justify-between !px-0 ${
              errors.password && "border-[1.5px] border-[#E00D20]"
            }`}
          >
            <input
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={`${inputStyle} !h-full !w-full !border-0 !outline-none`}
            />

            <div className="mr-3">
              {" "}
              {isPasswordVisible ? (
                <HiOutlineLockOpen
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <HiOutlineLockClosed
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </div>
          </div>
          {errors.password && (
            <p className={errorStyle}>{errors?.password?.message}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className={divStyle}>
          <div
            className={`${inputStyle} flex items-center justify-between !px-0 ${
              errors.rePassword && "border-[1.5px] border-[#E00D20]"
            }`}
          >
            <input
              placeholder="Re-enter Password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              {...register("rePassword", {
                required: "Please re-enter your password",
              })}
              className={`${inputStyle} !h-full !w-full !border-0 !outline-none`}
            />

            <div className="mr-3">
              {isConfirmPasswordVisible ? (
                <HiOutlineLockOpen
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              ) : (
                <HiOutlineLockClosed
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              )}
            </div>
          </div>
          <p className={errorStyle}>
            {errors.rePassword && errors?.rePassword?.message}
          </p>
        </div>

        {/* PRIVACY POLICY */}
        <div className=" col-span-2">
          <label className="flex items-start">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms.",
              })}
              className={`custom-checkbox mr-2 ${
                errors.terms && "border-[1.5px] border-[#E00D20]"
              }`}
            />
            <p className="md:text- font-nunito text-sm font-normal text-primary-strong_gray md:text-md">
              By submitting and sharing your information you agree to
              Schooly&apos;s{" "}
              <a href="/terms-of-use" className="text-blue-600 hover:underline">
                terms of use
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                privacy policy
              </a>
              .
            </p>
          </label>
          <p
            className={`${errorStyle} !m-[0.3rem] !mt-[2px]  !ml-[0.1rem] text-[0.85rem]`}
          >
            {errors.terms && errors?.terms?.message}
          </p>
        </div>

        <div className="col-span-2">
          <Button btnType="signup" handleForm={validatePasswords}>
            {signupStudent.isPending ? (
              <span className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
      </form>
      <div className="mt-[2vh] flex flex-row items-center justify-center gap-2 md:mt-[2vh]">
        <p className="font-nunito text-av font-semibold ext-primary-medium_gray">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-nunito text-base font-bold  hover:underline md:text-xl text-primary-anchor"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
