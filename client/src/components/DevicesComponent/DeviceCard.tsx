import { PiDeviceMobileSpeakerFill } from "react-icons/pi";
import DeviceCardActions from "./DeviceCardComponents/DeviceCardActions";
import CardReceiverType from "./DeviceCardComponents/CardReceiverType";
import CardGiverType from "./DeviceCardComponents/CardGiverType";
import { IoMdOptions } from "react-icons/io";
import { ChangeEvent, FC, useState } from "react";

type DeviceCard = {
  index: number;
  device: Device;
  switchDevice: (
    e: ChangeEvent<HTMLInputElement>,
    device: Device
  ) => Promise<void>;
  showEditDevice: (device: Device) => void;
  showDeleteDevice: (device: Device) => void;
  showFitDevice: (device: Device) => void;
};

type DeviceAdditionalParts = {
  has_monitor: boolean;
};

export interface CardReceiverObjects extends DeviceAdditionalParts {
  device_subsidiary_money_amount: string | number;
  device_cards_received_quantity: string | number;
  has_subsidiary_money_receiver: boolean;
  has_cash_receiver: boolean;
  has_debit_card_transaction: boolean;
}

export interface CardGiverObjects extends DeviceAdditionalParts {
  device_cards_to_give_quantity: string | number;
  device_cards_busy_quantity: string | number;
  device_cards_problematic_quantity: string | number;
}

const DeviceCard: FC<DeviceCard> = ({
  device,
  switchDevice,
  index,
  showEditDevice,
  showDeleteDevice,
  showFitDevice,
}): JSX.Element => {
  const cardReceiverObjects: CardReceiverObjects = {
    device_subsidiary_money_amount: device.device_subsidiary_money_amount,
    device_cards_received_quantity:
      device.device_cards_received_quantity as number,
    has_subsidiary_money_receiver: device.has_subsidiary_money_receiver,
    has_cash_receiver: device.has_cash_receiver,
    has_debit_card_transaction: device.has_debit_card_transaction,
    has_monitor: device.has_monitor,
  };

  const cardGiverObjects: CardGiverObjects = {
    device_cards_to_give_quantity: device.device_cards_to_give_quantity,
    device_cards_busy_quantity: device.device_cards_busy_quantity as number,
    device_cards_problematic_quantity:
      device.device_cards_problematic_quantity as number,
    has_monitor: device.has_monitor,
  };

  const [clientMode, setClientMode] = useState<boolean>(false);
  const [employeeMode, setEmployeeMode] = useState<boolean>(false);

  const toggleClientMode = () => setClientMode(!clientMode);
  const toggleEmployeeMode = () => setEmployeeMode(!employeeMode);

  const unifyFunction = (
    e: ChangeEvent<HTMLInputElement>,
    device: Device,
    _switchDevice: (
      e: ChangeEvent<HTMLInputElement>,
      device: Device
    ) => Promise<void>,
    _toggle: () => void
  ) => {
    _toggle();
    _switchDevice(e, device);
  };

  return (
    <div className="text-gray-primary w-[27.5rem]">
      <div className="px-5 py-[1.375rem] bg-white rounded-[1.5rem] shadow-custom ">
        <div className="flex items-center justify-between gap-x-2 font-bold text-xl leading-6">
          <div className="flex items-center gap-x-[0.625rem]">
            <PiDeviceMobileSpeakerFill />
            <span>მოწყობილობა {index + 1}</span>
          </div>
        </div>
        <div className="pt-[0.625rem] text-[1rem] font-medium">
          <div className="flex justify-between items-center">
            <span>{device.device_name}</span>
          </div>
          <div className="flex justify-between items-center border-0 border-t border-border-main-secondary pt-4 mt-4">
            <span>ტიპი:</span> <span>{device.device_type.devicetype_name}</span>
          </div>
          <div className="flex justify-between items-center border-0 border-t border-border-main-secondary pt-4 mt-4">
            <span>მოწყობილობის ID:</span>{" "}
            <span>{device.external_device_id || "დაურეგისტრირებელი"}</span>
          </div>
          {device.device_type.devicetype_type === "card-giver" && (
            <CardGiverType cardGiverObjects={cardGiverObjects} />
          )}
          {device.device_type.devicetype_type === "card-receiver" && (
            <CardReceiverType cardReceiverObjects={cardReceiverObjects} />
          )}
          <DeviceCardActions
            device={device}
            showEditDevice={showEditDevice}
            showDeleteDevice={showDeleteDevice}
          />
        </div>
        <div className="px-3 py-2">
          <div className="border-0 border-t border-border-main-secondary pt-4 mt-4 text-gray-primary">
            <div className="flex items-center justify-between mt-1">
              <div className="relative">
                <div
                  className="w-fit justify-center items-center rounded-md flex px-3 py-1 border border-slate-300 cursor-pointer hover:bg-slate-50"
                  onClick={toggleClientMode}
                >
                  {device.client_mode == "0"
                    ? "სტანდარტული"
                    : device.client_mode == "1"
                    ? "ღია"
                    : "დაკეტილი"}
                </div>
                {clientMode && (
                  <div className="shadow-md flex flex-col w-fit rounded-md overflow-hidden absolute z-10 bg-white">
                    <input
                      id="client_mode_1"
                      type="radio"
                      name="client_mode"
                      value={0}
                      checked={device.client_mode == 0}
                      className="hidden"
                      onChange={(e) =>
                        unifyFunction(e, device, switchDevice, toggleClientMode)
                      }
                    />
                    <label htmlFor="client_mode_1" className="py-1 px-3 ">
                      სტანდარტული
                    </label>
                    <input
                      id="client_mode_2"
                      type="radio"
                      name="client_mode"
                      value={1}
                      checked={device.client_mode == 1}
                      className="hidden"
                      onChange={(e) =>
                        unifyFunction(e, device, switchDevice, toggleClientMode)
                      }
                    />
                    <label htmlFor="client_mode_2" className="py-1 px-3 ">
                      ღია
                    </label>
                    <input
                      id="client_mode_3"
                      type="radio"
                      name="client_mode"
                      value={2}
                      checked={device.client_mode == 2}
                      className="hidden"
                      onChange={(e) =>
                        unifyFunction(e, device, switchDevice, toggleClientMode)
                      }
                    />
                    <label
                      htmlFor="client_mode_3"
                      className="py-1 px-3 hover:bg-slate-100 "
                    >
                      დაკეტილი
                    </label>
                  </div>
                )}
              </div>
              <span className="text-md font-medium text-slate-700 ms-auto">
                კლიენტები
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="relative">
                <div
                  className="w-fit justify-center items-center rounded-md flex px-3 py-1 border border-slate-300 cursor-pointer hover:bg-slate-50"
                  onClick={toggleEmployeeMode}
                >
                  {device.employee_mode == "0"
                    ? "სტანდარტული"
                    : device.employee_mode == "1"
                    ? "ღია"
                    : "დაკეტილი"}
                </div>
                {employeeMode && (
                  <div className="shadow-md flex flex-col w-fit rounded-md overflow-hidden absolute z-10 bg-white">
                    <input
                      id="employee_mode_1"
                      type="radio"
                      name="employee_mode"
                      value={0}
                      checked={device.employee_mode == 0}
                      className="hidden"
                      onChange={(e) =>
                        unifyFunction(
                          e,
                          device,
                          switchDevice,
                          toggleEmployeeMode
                        )
                      }
                    />
                    <label
                      htmlFor="employee_mode_1"
                      className="py-1 px-3 hover:bg-slate-100"
                    >
                      სტანდარტული
                    </label>
                    <input
                      id="employee_mode_2"
                      type="radio"
                      name="employee_mode"
                      value={1}
                      checked={device.employee_mode == 1}
                      className="hidden"
                      onChange={(e) =>
                        unifyFunction(
                          e,
                          device,
                          switchDevice,
                          toggleEmployeeMode
                        )
                      }
                    />
                    <label
                      htmlFor="employee_mode_2"
                      className="py-1 px-3 hover:bg-slate-100 "
                    >
                      ღია
                    </label>
                    <input
                      id="employee_mode_3"
                      type="radio"
                      name="employee_mode"
                      value={2}
                      checked={device.employee_mode == 2}
                      className="hidden"
                      onChange={(e) =>
                        unifyFunction(
                          e,
                          device,
                          switchDevice,
                          toggleEmployeeMode
                        )
                      }
                    />
                    <label
                      htmlFor="employee_mode_3"
                      className="py-1 px-3 hover:bg-slate-100 "
                    >
                      დაკეტილი
                    </label>
                  </div>
                )}
              </div>
              <span className="text-md font-medium text-slate-700 ms-auto">
                თანამშრომლები
              </span>
            </div>
          </div>
        </div>
        {device.device_type.devicetype_type === "card-receiver" && (
          <div className="border-0 border-t border-border-main-secondary pt-4 mt-4 text-gray-primary">
            <button className=" " onClick={() => showFitDevice(device)}>
              მრიცხველის მორგება
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceCard;
