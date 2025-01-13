import axios from "axios";
import { useParking } from "../../../App";
import {
  Modal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from "../../Modal";
import { FC, useEffect, useState } from "react";
import { Variant1 } from "../../../views/Main/Counter";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiCheck } from "react-icons/fi";

type FitCounter = {
  selectedDevice: Device;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  hideFitDevice: () => void;
};

const FitCounter: FC<FitCounter> = ({
  selectedDevice,
  setDevices,
  hideFitDevice,
}): JSX.Element => {
  const { API_URL, showNotification } = useParking();

  const [counters, setCounters] = useState<Variant1[]>([]);
  const [selectedCounter, setSelectedCounter] = useState<number | null>(null);
  const [selectedDropdown, setSelectedDropdown] = useState<number | null>(null);

  const getCounters = async () => {
    await axios
      .get(API_URL + "/getcounters")
      .then((res) => {
        if (res.status >= 200 && res.status <= 226) {
          setCounters(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fitCounter = async () => {
    await axios
      .post(API_URL + "/fitcounter", {
        device_id: selectedDevice.device_id,
        counter_id: selectedCounter,
      })
      .then((res) => {
        if (res.status >= 200 && res.status <= 226) {
          const { status, message } = res.data as ResponseStatus;
          if (status === "updated") {
            setDevices((devices) => {
              return devices.map((device) => {
                if (device.device_id === selectedDevice.device_id) {
                  return {
                    ...device,
                    counter_id: selectedCounter as number,
                  };
                } else {
                  return device;
                }
              });
            });
            showNotification(message, false);
            hideFitDevice();
          }
        }
      });
  };

  const selectCounter = (id: number) => {
    setSelectedCounter(id);
  };

  const selectDropdown = (idx: number) => {
    if (selectedDropdown === idx) setSelectedDropdown(-1);
    else setSelectedDropdown(idx);
  };

  useEffect(() => {
    getCounters();
    if (selectedDevice) setSelectedCounter(selectedDevice.counter_id);
  }, []);

  return (
    <ModalContainer>
      <Modal className="w-[36.75rem]">
        <ModalHeader
          title="მრიცხველის მორგება"
          onHide={hideFitDevice}
          className="flex justify-between items-center"
        >
          <h5 className="font-bold text-[1.375rem] text-gray-primary px-[0.625rem]">
            მოწყობილობის დამატება
          </h5>
        </ModalHeader>
        <ModalBody>
          <div className="px-[0.625rem]">
            <div className="text-[1rem] font-medium gray-primary-blue my-[1.375rem]">
              {selectedDevice.device_name}
            </div>
            {counters.map((counter, i) => {
              let bgColor =
                counter.counter_id === selectedCounter ? "bg-primary-blue" : "";
              return (
                <div key={i} className="rounded-lg shadow-custom">
                  <div className="flex items-center justify-between pl-[0.625rem] py-[1.063rem] pr-6 ">
                    <div className="flex items-center gap-x-3">
                      <div
                        className={`${bgColor} w-[1.313rem] h-[1.313rem] border-[0.2px] rounded-[3px] cursor-pointer flex items-center justify-center`}
                        onClick={() =>
                          selectCounter(counter.counter_id as number)
                        }
                      >
                        {counter.counter_id === selectedCounter && (
                          <FiCheck className="text-white" />
                        )}
                      </div>
                      <span className="text-gray-primary">
                        {counter.counter_name}
                      </span>
                    </div>
                    <span
                      className="cursor-pointer"
                      onClick={() => selectDropdown(i)}
                    >
                      {selectedDropdown === i ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </span>
                  </div>
                  {selectedDropdown === i && (
                    <div className="m-[0.625rem] border-t-[1px] text-gray-primary flex flex-col gap-5 pt-[0.938rem] pb-[1.563rem]">
                      <div className="flex px-3 items-center justify-between">
                        <span>პირველი 1 საათი</span>
                        <span className="text-button-green">
                          {counter.first_hours}₾
                        </span>
                      </div>
                      <div className="flex px-3 items-center justify-between">
                        <span>3 საათის განმავლობაში</span>
                        <span className="text-button-green">
                          {counter.during_3_hours}₾
                        </span>
                      </div>
                      <div className="flex px-3 items-center justify-between">
                        <span>4 საათის შემდეგ ღამის 11-მდე</span>
                        <span className="text-button-green">
                          {counter.until_23_oclock}₾
                        </span>
                      </div>
                      <div className="flex px-3 items-center justify-between">
                        <span>ღამის 11 დან დილის 9-მდე</span>
                        <span className="text-button-green">
                          {counter.until_9_oclock}₾
                        </span>
                      </div>
                      <div className="flex px-3 items-center justify-between">
                        <span>ყოველი 24 საათი</span>
                        <span className="text-button-green">
                          {counter.every_24_hours}₾
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="mt-[1.875rem] mx-auto block bg-button-green text-white rounded-md w-[9.625rem] h-[2.5rem] font-bold disabled:bg-green-400/[.6]"
            disabled={!selectedCounter}
            onClick={fitCounter}
          >
            შენახვა
          </button>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
};

export default FitCounter;
