const DashboardParkingDevices = (): JSX.Element => {
  return (
    <div>
      <div className="flex gap-x-10 text-text-primary-blue font-bold ">
        <div className="bg-white rounded-[0.625rem] w-[24.688rem] text-xl ">
          <div className="flex justify-start items-center gap-[2.938rem]">
            <img src="/device.svg" alt="device" />
            <h5>მოწყობილობა 1</h5>
          </div>
          <div className="flex flex-col gap-[0.625rem] py-4 px-[1.375rem]">
            <span className="leading-[1.375rem] text-lg">
              ბალანსი: <span className="text-green-500">451₾</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              ხურდა: <span className="text-green-500">248₾</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              ბარათები: <span>70</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              დაკავებული ბარათი: <span>15</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              გადადებული ბარათი: <span>4</span>
            </span>
          </div>
        </div>
        <div className="bg-white rounded-[0.625rem] w-[24.688rem] text-xl shadow-custom">
          <div className="flex justify-start items-center gap-[2.938rem]">
            <img src="/device.svg" alt="device" />
            <h5>მოწყობილობა 1</h5>
          </div>
          <div className="flex flex-col gap-[0.625rem] py-4 px-[1.375rem]">
            <span className="leading-[1.375rem] text-lg">
              ბალანსი: <span className="text-green-500">451₾</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              ხურდა: <span className="text-green-500">248₾</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              ბარათები: <span>70</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              დაკავებული ბარათი: <span>15</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              გადადებული ბარათი: <span>4</span>
            </span>
          </div>
        </div>
        <div className="bg-white rounded-[0.625rem] w-[24.688rem] text-xl ">
          <div className="flex justify-start items-center gap-[2.938rem]">
            <img src="/device.svg" alt="device" />
            <h5>მოწყობილობა 1</h5>
          </div>
          <div className="flex flex-col gap-[0.625rem] py-4 px-[1.375rem]">
            <span className="leading-[1.375rem] text-lg">
              ბალანსი: <span className="text-button-green">451₾</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              ხურდა: <span className="text-button-green">248₾</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              ბარათები: <span>70</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              დაკავებული ბარათი: <span>15</span>
            </span>
            <span className="leading-[1.375rem] text-lg">
              გადადებული ბარათი: <span>4</span>
            </span>
          </div>
        </div>
      </div>
      <div className="text-text-primary-blue font-bold flex flex-col gap-5 mt-[2rem]">
        <span>
          თავისუფალი
          <span className="bg-button-green ml-[1.375rem] text-white rounded-md px-[0.438rem] h-[1.625rem]">
            100
          </span>
        </span>
        <span>
          დაკავებული
          <span className="bg-delete-button-red ml-[1.375rem] text-white rounded-md px-[0.438rem] h-[1.625rem]">
            20
          </span>
        </span>
      </div>
    </div>
  );
};

export default DashboardParkingDevices;
