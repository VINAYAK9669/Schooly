/* eslint-disable react/prop-types */
function Button({ children, btnType, handleForm }) {
  const style =
    "flex h-[40px] lg:h-[46px] w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-pink-start to-pink-end hover:from-pink-start hover:to-pink-start box-border";

  // Correctly return JSX based on btnType condition
  return btnType === "submit" ? (
    <button className={style} onClick={handleForm} type="submit">
      <span className=" inline-block text-base font-bold text-primary-gray_white">
        {children}
      </span>
    </button>
  ) : (
    <button className={style} onClick={handleForm}>
      <span className="inline-block text-base font-bold text-primary-gray_white">
        {children}
      </span>
    </button>
  );
}

export default Button;
