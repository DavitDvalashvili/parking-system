import React, { ChangeEvent, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from "../Modal";
import axios from "axios";
import { useParking } from "../../App";
import { Variant1 } from "../../views/Main/Counter";

type AddNewCounterPropTypes = {
  hideAddNewCounter: VoidFunction;
  setCounters: React.Dispatch<React.SetStateAction<Variant1[]>>;
};

const AddNewCounter: React.FC<AddNewCounterPropTypes> = ({
  hideAddNewCounter,
  setCounters,
}) => {
  const { API_URL, showNotification } = useParking();

  const [toleranceTimes] = useState<number[]>(
    Array.from({ length: 60 }, (_, k: number) => k)
  );
  const [counterVariant, setCounterVariant] = useState<Variant1>({
    counter_name: "",
    tolerance_time: "",
    first_hours: "",
    during_3_hours: "",
    until_23_oclock: "",
    until_9_oclock: "",
    every_24_hours: "",
  });

  const handleSelectToleranceTime = (time: number): void => {
    setCounterVariant({ ...counterVariant, tolerance_time: time });
  };

  const handleChangeToleranceTime = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCounterVariant({ ...counterVariant, tolerance_time: value });
  };

  const handleChangeDetailValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCounterVariant((variant) => {
      return {
        ...variant,
        [name]: value,
      };
    });
  };

  const AddNewCounter = async () => {
    await axios
      .post(API_URL + "/addcounter", { ...counterVariant })
      .then((res) => {
        if (res.status >= 200 && res.status <= 226) {
          const { status, message, insert_id } = res.data as ResponseStatus;
          if (status === "inserted") {
            setCounters((counters) => {
              return [
                ...counters,
                {
                  counter_id: insert_id,
                  ...counterVariant,
                },
              ];
            });
            showNotification(message, true);
            hideAddNewCounter();
          }
          if (status === "insert_error") {
            showNotification(message, false);
          }
        }
      })
      .catch((err) => {
        showNotification("დაფიქსირდა შეცდომა, სცადეთ ხელახლა", false);
        console.log(err);
      });
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader
          title="მრიცხველის დამატება"
          onHide={hideAddNewCounter}
          className="flex justify-between items-center"
        >
          <h5 className="font-bold text-[1.375rem] text-text-gray-primary ">
            მრიცხველის დამატება
          </h5>
        </ModalHeader>
        <ModalBody>
          <div className="w-fit mx-auto mt-[2.625rem]">
            <div className="flex gap-x-[1.875rem] w-full ">
              <div className="w-[26.5rem]">
                <input
                  type="text"
                  className="w-full p-4 pt-[0.938rem] border border-border-color-tertiary rounded-lg outline-none leading-[1.188rem]"
                  placeholder="მრიცხველის დასახელება"
                  name="counter_name"
                  value={counterVariant.counter_name}
                  onChange={handleChangeDetailValues}
                />
              </div>
              <div className="relative w-[11.438rem]">
                <input
                  type="number"
                  className="w-full p-4 pt-[0.938rem] border border-border-color-tertiary rounded-lg outline-none leading-[1.188rem] peer"
                  placeholder="დრო"
                  value={counterVariant.tolerance_time}
                  onChange={handleChangeToleranceTime}
                />
                <div className="w-[11.438rem] max-h-[303px] rounded-lg bg-white border border-border-color-tertiary  absolute top-[54px] overflow-v hidden peer-focus:flex hover:flex flex-col gap-4 cursor-pointer">
                  {toleranceTimes
                    .filter((t: number) =>
                      t
                        .toString()
                        .includes(counterVariant.tolerance_time.toString())
                    )
                    .map((t: number, i: number) => {
                      return (
                        <div
                          key={i}
                          className="text-left leading-[1.188rem] pl-4 "
                          onClick={() => handleSelectToleranceTime(t)}
                        >
                          {t} წთ
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-[1rem] mt-5 mb-[1.875rem]">
              <div className="text-[1rem] text-text-gray-tertiary mb-1">
                <span>
                  დილის 9 საათიდან ღამის 11 საათამდე - ღამის 11 საათიდან დილის 9
                  საათამდე
                </span>
              </div>
              <div className="flex gap-x-[1.875rem] w-full">
                <span className="w-[26.5rem] text-text-color-4 p-4 pt-[0.938rem] border border-border-color-tertiary rounded-lg outline-none leading-[1.188rem] bg-bg-color-4">
                  პირველი 1 საათი
                </span>
                <div className="w-[11.438rem]">
                  <input
                    type="number"
                    className="w-full p-4 pt-[0.938rem] border text-center border-border-color-tertiary rounded-lg outline-none leading-[1.188rem]"
                    placeholder="თანხა"
                    name="first_hours"
                    value={counterVariant.first_hours}
                    onChange={handleChangeDetailValues}
                  />
                </div>
              </div>
              <div className="flex gap-x-[1.875rem] w-full">
                <span className="w-[26.5rem] text-text-color-4 p-4 pt-[0.938rem] border border-border-color-tertiary rounded-lg outline-none leading-[1.188rem] bg-bg-color-4">
                  1 საათის შემდეგ 3 საათის განმავლობაში
                </span>
                <div className="w-[11.438rem]">
                  <input
                    type="number"
                    className="w-full p-4 pt-[0.938rem] border text-center border-border-color-tertiary rounded-lg outline-none leading-[1.188rem]"
                    placeholder="თანხა"
                    name="during_3_hours"
                    value={counterVariant.during_3_hours}
                    onChange={handleChangeDetailValues}
                  />
                </div>
              </div>
              <div className="flex gap-x-[1.875rem] w-full">
                <span className="w-[26.5rem] text-text-color-4 p-4 pt-[0.938rem] border border-border-color-tertiary rounded-lg outline-none leading-[1.188rem] bg-bg-color-4">
                  4 საათის შემდეგ ღამის 11 საათამდე
                </span>
                <div className="w-[11.438rem]">
                  <input
                    type="number"
                    className="w-full p-4 pt-[0.938rem] border text-center border-border-color-tertiary rounded-lg outline-none leading-[1.188rem]"
                    placeholder="თანხა"
                    name="until_23_oclock"
                    value={counterVariant.until_23_oclock}
                    onChange={handleChangeDetailValues}
                  />
                </div>
              </div>
              <div className="flex gap-x-[1.875rem] w-full">
                <span className="w-[26.5rem] text-text-color-4 p-4 pt-[0.938rem] border border-border-color-tertiary rounded-lg outline-none leading-[1.188rem] bg-bg-color-4">
                  ღამის 11 დან დილის 9 საათამდე
                </span>
                <div className="w-[11.438rem]">
                  <input
                    type="number"
                    className="w-full p-4 pt-[0.938rem] border text-center border-border-color-tertiary rounded-lg outline-none leading-[1.188rem]"
                    placeholder="თანხა"
                    name="until_9_oclock"
                    value={counterVariant.until_9_oclock}
                    onChange={handleChangeDetailValues}
                  />
                </div>
              </div>
              <div className="flex gap-x-[1.875rem] w-full">
                <span className="w-[26.5rem] text-text-color-4 p-4 pt-[0.938rem] border border-border-color-tertiary rounded-lg outline-none leading-[1.188rem] bg-bg-color-4">
                  ყოველი 24 საათი
                </span>
                <div className="w-[11.438rem]">
                  <input
                    type="number"
                    className="w-full p-4 pt-[0.938rem] border text-center border-border-color-tertiary rounded-lg outline-none leading-[1.188rem]"
                    placeholder="თანხა"
                    name="every_24_hours"
                    value={counterVariant.every_24_hours}
                    onChange={handleChangeDetailValues}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="w-[9.625rem] h-10 flex justify-center items-center mx-auto
            
            bg-button-green font-bold text-[1rem] text-white rounded-[10px]"
            disabled={false}
            onClick={AddNewCounter}
          >
            დამატება
          </button>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
};

export default AddNewCounter;
