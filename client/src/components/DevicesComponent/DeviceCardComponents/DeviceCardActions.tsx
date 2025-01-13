import { FC } from "react";
import { RiPencilFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";

type IDeviceCardActions = {
  device: Device;
  showEditDevice: (device: Device) => void;
  showDeleteDevice: (device: Device) => void;
};

const DeviceCardActions: FC<IDeviceCardActions> = ({
  device,
  showEditDevice,
  showDeleteDevice,
}): JSX.Element => {
  return (
    <div className="flex gap-[1.875rem] items-center border-0 border-t border-border-main-secondary pt-[0.625rem] mt-4 ">
      <button
        className="w-[185px] h-10 rounded-primary  bg-button-green font-bold text-white text-[1rem] flex justify-center items-center gap-2"
        onClick={() => showEditDevice(device)}
      >
        <span>რედაქტირება</span>
        <RiPencilFill />
      </button>
      <button
        className="w-[185px] h-10 rounded-primary bg-button-red font-bold text-white text-[1rem] flex justify-center items-center gap-2"
        onClick={() => showDeleteDevice(device)}
      >
        <span>წაშლა</span>
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default DeviceCardActions;
