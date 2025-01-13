import { ChangeEvent, FC, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from "../Modal";
import { DeviceType } from "../../views/Main/Devices";
import { useParking } from "../../App";
import axios, { AxiosResponse } from "axios";

type AddNewDevice = {
  deviceTypes: DeviceType[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  hideAddNewDevice: VoidFunction;
};

const AddNewDevice: FC<AddNewDevice> = ({
  deviceTypes,
  setDevices,
  hideAddNewDevice,
}): JSX.Element => {
  const { API_URL, showNotification } = useParking();

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    device_id: 0,
    external_device_id: "",
    device_name: "",
    device_subsidiary_money_amount: "",
    device_cards_to_give_quantity: "",
    has_subsidiary_money_receiver: false,
    has_cash_receiver: false,
    has_debit_card_transaction: false,
    has_monitor: false,
    device_type: deviceTypes[0],
  });

  const selectDeviceType = (type: DeviceType) => {
    setDeviceInfo((deviceInfo: DeviceInfo) => ({
      ...deviceInfo,
      has_subsidiary_money_receiver: false,
      has_cash_receiver: false,
      has_debit_card_transaction: false,
      device_type: type,
    }));
  };

  const handleChangeDeviceInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setDeviceInfo((deviceInfo: DeviceInfo) => ({
      ...deviceInfo,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const addNewDevice = async (): Promise<void> => {
    await axios
      .post(API_URL + "/addnewdevice", { ...deviceInfo })
      .then((res: AxiosResponse) => {
        if (res.status >= 200 && res.status <= 226) {
          setDevices((devices: Device[]) => {
            return [
              ...devices,
              {
                device_id: res.data.device_id,
                counter_id: res.data.counter_id,
                ...deviceInfo,
                device_cards_received_quantity: 0,
                device_cards_busy_quantity: 0,
                device_cards_problematic_quantity: 0,
                client_mode: 0,
                employee_mode: 0,
              },
            ];
          });
          hideAddNewDevice();
          showNotification("მოწყობილობა წარმატებით დაემატა", true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ModalContainer>
      <Modal className="w-[36.75rem]">
        <ModalHeader
          title="მოწყობილობის დამატება"
          onHide={hideAddNewDevice}
          className="flex justify-between items-center"
        >
          <h5 className="font-bold text-[1.375rem] text-gray-primary ">
            მოწყობილობის დამატება
          </h5>
        </ModalHeader>
        <ModalBody>
          <div className="mt-[1.688rem] mx-[0.625rem]">
            <div className="flex items-center w-full text-[1rem] font-bold gap-[1.375rem] justify-center ">
              {deviceTypes.map((d: DeviceType, i: number) => {
                return (
                  <div key={i} className={`w-[15.813rem] `}>
                    <label
                      htmlFor={`deviceType${i}`}
                      className={`w-full h-full block text-center py-4 rounded-primary leading-[1.188rem] cursor-pointer ${
                        deviceInfo.device_type.devicetype_id === d.devicetype_id
                          ? "bg-primary-blue text-white"
                          : "text-gray-primary border-primary-blue border"
                      }`}
                    >
                      {d.devicetype_name}
                    </label>
                    <input
                      type="radio"
                      id={`deviceType${i}`}
                      name="deviceType"
                      className="hidden"
                      onChange={() => selectDeviceType(d)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-x-3 my-[0.938rem]">
              <input
                type="text"
                placeholder="მოწყობილობის დასახელება"
                className="w-[18.75rem] p-4 outline-none rounded-primary border-[0.5px] border-primary-blue font-firago"
                name="device_name"
                value={deviceInfo.device_name}
                onChange={handleChangeDeviceInfo}
              />
              <input
                type="text"
                placeholder="ID"
                className="w-[7.438rem] p-4 outline-none rounded-primary border-[0.5px] border-primary-blue font-firago"
                name="external_device_id"
                value={deviceInfo.external_device_id}
                onChange={handleChangeDeviceInfo}
              />
            </div>
            <div className="flex gap-x-3">
              {deviceInfo.device_type?.devicetype_type === "card-receiver" && (
                <input
                  type="text"
                  placeholder="ხურდა (გასაცემი რაოდენობა)"
                  className="w-[18.75rem] p-4 outline-none rounded-primary border-[0.5px] border-primary-blue font-firago"
                  name="device_subsidiary_money_amount"
                  value={deviceInfo.device_subsidiary_money_amount}
                  onChange={handleChangeDeviceInfo}
                />
              )}
              {deviceInfo.device_type?.devicetype_type === "card-giver" && (
                <input
                  type="text"
                  placeholder="ბარათები (გასაცემი რაოდენობა)"
                  className="w-[18.75rem] p-4 outline-none rounded-primary border-[0.5px] border-primary-blue font-firago"
                  name="device_cards_to_give_quantity"
                  value={deviceInfo.device_cards_to_give_quantity}
                  onChange={handleChangeDeviceInfo}
                />
              )}
            </div>
            <div className="flex flex-col gap-y-5 my-[1.875rem]">
              {deviceInfo.device_type?.devicetype_type === "card-receiver" && (
                <>
                  <label className="inline-flex justify-between items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      name="has_subsidiary_money_receiver"
                      checked={deviceInfo.has_subsidiary_money_receiver}
                      onChange={handleChangeDeviceInfo}
                    />
                    <span className="text-[1rem] font-bold text-gray-primary">
                      ხურდის მიმღები
                    </span>
                    <div className="relative w-9 h-5 bg-[#D9D9D9] peer-focus:outline-none rounded-full peer peer-checked:bg-[#63769A] rtl:peer-checked:after:-translate-x-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
                  </label>
                  <label className="inline-flex justify-between items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      name="has_cash_receiver"
                      checked={deviceInfo.has_cash_receiver}
                      onChange={handleChangeDeviceInfo}
                    />
                    <span className="text-[1rem] font-bold text-gray-primary">
                      ქეშის მიმღები
                    </span>
                    <div className="relative w-9 h-5 bg-[#D9D9D9] peer-focus:outline-none rounded-full peer peer-checked:bg-[#63769A] rtl:peer-checked:after:-translate-x-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
                  </label>
                  <label className="inline-flex justify-between items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      name="has_debit_card_transaction"
                      checked={deviceInfo.has_debit_card_transaction}
                      onChange={handleChangeDeviceInfo}
                    />
                    <span className="text-[1rem] font-bold text-gray-primary">
                      ბარათით გადახდა
                    </span>
                    <div className="relative w-9 h-5 bg-[#D9D9D9] peer-focus:outline-none rounded-full peer peer-checked:bg-[#63769A] rtl:peer-checked:after:-translate-x-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
                  </label>
                </>
              )}
              <label className="inline-flex justify-between items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  name="has_monitor"
                  checked={deviceInfo.has_monitor}
                  onChange={handleChangeDeviceInfo}
                />
                <span className="text-[1rem] font-bold text-gray-primary">
                  ეკრანი
                </span>
                <div className="relative w-9 h-5 bg-[#D9D9D9] peer-focus:outline-none rounded-full peer peer-checked:bg-[#63769A] rtl:peer-checked:after:-translate-x-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
              </label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="w-[9.625rem] h-10 bg-button-green text-white text-[1rem] rounded-primary block mx-auto"
            onClick={addNewDevice}
          >
            დამატება
          </button>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
};

export default AddNewDevice;
