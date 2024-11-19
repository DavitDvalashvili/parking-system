const DashboardBalances = (): JSX.Element => {
  return (
    <div className="rounded-[1.25rem] bg-white w-[18.063rem] h-[14.688rem] pt-[0.563rem]">
      <span className="font-normal text-base leading-5  pl-[1.188rem]">
        02.11.2024
      </span>
      <div className="flex justify-evenly items-center mt-[2.625rem]">
        <img src="/wallet.svg" className="w-[4.969rem] h-[4.969rem]" />
        <div className="flex flex-col">
          <span className="font-semibold text-[1.625rem] leading-[1.95rem] mb-5">
            ბალანსი
          </span>
          <span className="font-bold text-[2.125rem] leading-[2.55rem] text-button-green">
            1537₾
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardBalances;
