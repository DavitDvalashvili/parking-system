import { FC } from "react";
import { MdRestartAlt } from "react-icons/md";

type DeviceCardReceiver = {
  cardsToReceiveQuantity: string | number;
};

const DeviceCardReceiver: FC<DeviceCardReceiver> = ({
  cardsToReceiveQuantity,
}): JSX.Element => {
  return (
    <div className="border-0 border-t border-border-main-secondary pt-4 mt-4">
      <div className="flex justify-between items-center group">
        <span>მიღებული ბარათები:</span>
        <div className="flex items-center relative">
          <span className="group-hover:mr-[25px] duration-200 z-10">
            {cardsToReceiveQuantity}
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

export default DeviceCardReceiver;
