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
            <div className="flex gap-x-[1.875rem] w-full bg-red-700">
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
                  className="w-full p-4 pt-[0.938rem] border border-border-color-tertiary rounded-lg outline-none leading-[1.188rem]"
                  placeholder="დრო"
                  value={counterVariant.tolerance_time}
                  onChange={handleChangeToleranceTime}
                />
                <div className="w-[11.438rem] max-h-[303px] rounded-lg bg-white border border-border-color-tertiary  absolute top-[54px] overflow-v peer-focus:block flex flex-col gap-4 cursor-pointer">
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
            <hr className="mt-4 mb-2" />
            <div className="w-full flex flex-col">
              <div className="ml-2 mb-2">
                <span className="text-sm italic text-gray-500">
                  დილის 9 საათიდან ღამის 11 საათამდე - ღამის 11 საათიდან დილის 9
                  საათამდე
                </span>
              </div>
              <div className="flex gap-x-2">
                <span className="w-8/12 flex px-3 py-1 items-center border rounded-md text-gray-400 bg-gray-100">
                  პირველი 1 საათი
                </span>
                <div className="w-4/12">
                  <input
                    type="number"
                    className="w-full py-1 px-3 border border-slate-300 rounded-md outline-none"
                    placeholder="თანხა"
                    name="first_hours"
                    value={counterVariant.first_hours}
                    onChange={handleChangeDetailValues}
                  />
                </div>
              </div>
              <div className="flex gap-x-2 mt-4">
                <span className="w-8/12 flex px-3 py-1 items-center border rounded-md text-gray-400 bg-gray-100">
                  1 საათის შემდეგ 3 საათის განმავლობაში
                </span>
                <div className="w-4/12">
                  <input
                    type="number"
                    className="w-full py-1 px-3 border border-slate-300 rounded-md outline-none"
                    placeholder="თანხა"
                    name="during_3_hours"
                    value={counterVariant.during_3_hours}
                    onChange={handleChangeDetailValues}
                  />
                </div>
              </div>
              <div className="flex gap-x-2 mt-4">
                <span className="w-8/12 flex px-3 py-1 items-center border rounded-md text-gray-400 bg-gray-100">
                  4 საათის შემდეგ ღამის 11 საათამდე
                </span>
                <div className="w-4/12">
                  <input
                    type="number"
                    className="w-full py-1 px-3 border border-slate-300 rounded-md outline-none"
                    placeholder="თანხა"
                    name="until_23_oclock"
                    value={counterVariant.until_23_oclock}
                    onChange={handleChangeDetailValues}
                  />
                </div>
              </div>
              <div className="flex gap-x-2 mt-4">
                <span className="w-8/12 flex px-3 py-1 items-center border rounded-md text-gray-400 bg-gray-100">
                  ღამის 11 დან დილის 9 საათამდე
                </span>
                <div className="w-4/12">
                  <input
                    type="number"
                    className="w-full py-1 px-3 border border-slate-300 rounded-md outline-none"
                    placeholder="თანხა"
                    name="until_9_oclock"
                    value={counterVariant.until_9_oclock}
                    onChange={handleChangeDetailValues}
                  />
                </div>
              </div>
              <div className="flex gap-x-2 mt-4">
                <span className="w-8/12 flex px-3 py-1 items-center border rounded-md text-gray-400 bg-gray-100">
                  ყოველი 24 საათი
                </span>
                <div className="w-4/12">
                  <input
                    type="number"
                    className="w-full py-1 px-3 border border-slate-300 rounded-md outline-none"
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
            className="py-2 px-3 bg-green-500 text-white rounded-md disabled:bg-green-400/[.6]"
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
