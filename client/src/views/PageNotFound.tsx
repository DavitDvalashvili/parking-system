const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center font-firago bg-bg-image bg-right-top bg-no-repeat">
      <div className="flex flex-col justify-center items-center gap-10">
        <img src="./notFound.svg" alt="logo" />
        <div className="text-6xl text-[#25314C] text-[5rem] font-bold leading-[3.053rem] mt-[50px] ">
          გვერდი არ მოიძებნა!
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
