import { FC } from "react";

type DeviceAdditionalParts = {
  has_monitor: boolean;
};

const DeviceAdditionalParts: FC<DeviceAdditionalParts> = ({
  has_monitor,
}): JSX.Element => {
  return (
    <div className="border-0 border-t border-border-color-secondary mt-[0.875rem] pt-4">
      <div className="flex justify-between items-center ">
        <span>ეკრანი</span>{" "}
        {has_monitor ? <img src="/check.svg" /> : <img src="/close.svg" />}
      </div>
    </div>
  );
};

export default DeviceAdditionalParts;
