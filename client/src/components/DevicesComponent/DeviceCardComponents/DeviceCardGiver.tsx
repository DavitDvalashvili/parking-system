import { MdRestartAlt } from "react-icons/md";
import { DeviceCardGiverType } from "./CardGiverType";
import { FC } from "react";

type DeviceCardGiver = {
  deviceCardGiverObjects: DeviceCardGiverType;
};

const DeviceCardGiver: FC<DeviceCardGiver> = ({
  deviceCardGiverObjects,
}): JSX.Element => {
  return (
    <div className="border-0 border-t border-border-main-secondary pt-4 mt-4	">
      <div className="flex justify-between items-center text-[1rem] font-medium">
        <span>ბარათები:</span>{" "}
        <span className="text-button-green">
          {deviceCardGiverObjects.device_cards_to_give_quantity + " " + "₾"}
        </span>
      </div>
      <div className="flex justify-between items-center text-[1rem] font-medium mt-[0.625rem]">
        <span>დაკავებული:</span>{" "}
        <span>{deviceCardGiverObjects.device_cards_busy_quantity}</span>
      </div>
      <div className="flex justify-between items-center group text-[1rem] font-medium mt-[0.625rem]">
        <span>გადადებული:</span>
        <div className="flex items-center relative">
          <span className="group-hover:mr-[25px] duration-200 z-10">
            {deviceCardGiverObjects.device_cards_problematic_quantity}
          </span>
          <button
            className="w-fit absolute right-[100%] opacity-0 group-hover:opacity-100 group-hover:right-[-2px] duration-200"
            title="განულება"
          >
            <MdRestartAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceCardGiver;
