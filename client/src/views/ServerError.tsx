const ServerError = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-bg-image bg-right-top bg-no-repeat font-firago">
      <div className="flex justify-center items-center gap-10">
        <img src="./logoBlue.svg" alt="logo" />
        <div className="text-6xl text-text-primary-blue text-[2.5rem] font-bold leading-[3.053rem]">
          სერვერთან კომუნიკაცია ვერ დამყარდა
        </div>
      </div>
    </div>
  );
};

export default ServerError;
