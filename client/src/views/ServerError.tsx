const ServerError = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-bg-image bg-right-top bg-no-repeat font-firago">
      <div className="flex flex-col justify-center items-center gap-10">
        <img src="./serverError.svg" alt="server error" />
        <div className="text-6xl text-[#25314C] text-[5rem] font-bold leading-[3.053rem] mt-[50px]">
          სერვერთან კომუნიკაცია ვერ დამყარდა
        </div>
      </div>
    </div>
  );
};

export default ServerError;
