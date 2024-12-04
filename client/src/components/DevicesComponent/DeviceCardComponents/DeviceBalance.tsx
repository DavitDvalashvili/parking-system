import { FC } from "react";

type DeviceBalanceObjects = {
  subsidaryMoneyAmount: string | number;
};

const DeviceBalance: FC<DeviceBalanceObjects> = ({
  subsidaryMoneyAmount,
}): JSX.Element => {
  return (
    <div className="border-0 border-t border-border-main-secondary pt-4 mt-4 text-gray-primary text-[1rem] font-medium">
      <div className="flex justify-between items-center mb-[0.625rem]">
        <span>ბალანსი:</span> <span className=" text-button-green">458₾</span>
      </div>
      <div className="flex justify-between items-center group transition-all">
        <span>ხურდა:</span>
        <span button-green>{subsidaryMoneyAmount}₾</span>
      </div>
    </div>
  );
};

export default DeviceBalance;
