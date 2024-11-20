import { DeviceMoneyReceiverType } from "./CardReceiverType";
import { FC } from "react";

type DeviceMoneyReceiver = {
  deviceMoneyReceiverObjects: DeviceMoneyReceiverType;
};

const DeviceMoneyReceiver: FC<DeviceMoneyReceiver> = ({
  deviceMoneyReceiverObjects,
}): JSX.Element => {
  const { has_subsidiary_money_receiver } = deviceMoneyReceiverObjects;

  return (
    <div className="border-0 border-t border-border-color-secondary pt-4 mt-4 flex flex-col">
      <div className="flex justify-between items-center">
        <span>ხურდის მიმღები:</span>{" "}
        {has_subsidiary_money_receiver ? (
          <img src="/check.svg" />
        ) : (
          <img src="/close.svg" />
        )}
      </div>
      <div className="flex justify-between items-center mt-[0.688rem]">
        <span>ქეშის მიმღები:</span>{" "}
        {has_subsidiary_money_receiver ? (
          <img src="/check.svg" />
        ) : (
          <img src="/close.svg" />
        )}
      </div>
      <div className="flex justify-between items-center mt-[0.688rem]">
        <span>ბარათით გადახდა:</span>{" "}
        {has_subsidiary_money_receiver ? (
          <img src="/check.svg" />
        ) : (
          <img src="/close.svg" />
        )}
      </div>
    </div>
  );
};

export default DeviceMoneyReceiver;
