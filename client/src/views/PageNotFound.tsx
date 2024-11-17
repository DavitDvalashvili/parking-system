const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center font-firago bg-bg-image bg-top-right bg-no-repeat">
      <div className="flex justify-center items-center gap-10">
        <img src="./logoBlue.svg" alt="logo" />
        <div className="text-6xl text-text-primary-blue text-[2.5rem] font-bold leading-[3.053rem]">
          გვერდი არ მოიძებნა
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
