const DashboardCards = (): JSX.Element => {
  return (
    <div className="flex gap-x-10">
      <div
        className=" w-[24.313rem] h-[14.688rem] rounded-primary  bg-white overflow-hidden bg-cards-image bg-contain bg-left bg-no-repeat 
      flex items-center justify-end p-[0.875rem]"
      >
        <div className="text-xl leading-6 gray-primary-blue font-bold text-center">
          <p>
            რეგისტრირებული <br /> ბარათები
          </p>
          <span>300</span>
        </div>
      </div>
      <div
        className=" w-[24.313rem] h-[14.688rem] rounded-primary  bg-white overflow-hidden bg-cards-image bg-contain bg-left bg-no-repeat 
      flex items-center justify-end p-[0.875rem] shadow-custom"
      >
        <div className="text-xl leading-6 gray-primary-blue font-bold text-center">
          <p>
            რეგისტრირებული <br /> ბარათები
          </p>
          <span>300</span>
        </div>
      </div>
      <div
        className=" w-[24.313rem] h-[14.688rem] rounded-primary  bg-white overflow-hidden bg-cards-image bg-contain bg-left bg-no-repeat 
      flex items-center justify-end p-[0.875rem]"
      >
        <div className="text-xl leading-6 gray-primary-blue font-bold text-center">
          <p>
            რეგისტრირებული <br /> ბარათები
          </p>
          <span>300</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
