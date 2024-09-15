/* eslint-disable react/prop-types */
function Header({ children, category }) {
  return (
    <>
      {category === "h1" ? (
        <h1 className="mb-[2rem] font-nunito text-base font-semibold text-primary-medium_gray md:text-2xl">
          {children}
        </h1>
      ) : (
        <h2 className="font-nunito text-xl font-semibold text-primary-medium_gray">
          {children}
        </h2>
      )}
    </>
  );
}

export default Header;
