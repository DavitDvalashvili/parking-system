import { IoMdKeypad } from "react-icons/io";
import AddNewCounter from "../../components/CounterComponents/AddNewCounter";
import { useEffect, useState } from "react";
import { useParking } from "../../App";
import { HiOutlinePlusSm } from "react-icons/hi";
import axios from "axios";

export type Variant1 = {
  counter_id?: number;
  counter_name: string;
  tolerance_time: number | string;
  first_hours: number | string;
  during_3_hours: number | string;
  until_23_oclock: number | string;
  until_9_oclock: number | string;
  every_24_hours: number | string;
};

const Counter = (): JSX.Element => {
  const { API_URL } = useParking();

  const [isNewCounterAdding, setIsNewCounterAdding] = useState<boolean>(false);
  const [counters, setCounters] = useState<Variant1[]>([]);

  const showAddNewCounter = (): void => {
    setIsNewCounterAdding(true);
  };
  const hideAddNewCounter = (): void => {
    setIsNewCounterAdding(false);
  };

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

  useEffect(() => {
    getCounters();
  }, []);

  return (
    <div className="p-10 flex flex-col flex-1 gap-y-[5rem]">
      <div className="flex gap-x-[1.875rem]">
        <div className="bg-white px-[0.813rem] py-[0.625rem] flex justify-center items-center gap-5 rounded-[0.625rem] text-text-gray-primary ">
          <IoMdKeypad className="w-[1.813rem] h-[1.813rem]" />
          <span className="font-bold text-[1.25rem]">მრიცხველი</span>
        </div>
        <button
          onClick={showAddNewCounter}
          className="bg-white py-[0.938rem] px-[0.875rem] flex justify-center items-center gap-[0.625rem] rounded-[0.625rem] text-text-gray-primary text-[1.25rem] font-bold "
        >
          <span>მრიცხველის დამატება</span>
          <HiOutlinePlusSm className="w-[1.563rem] h-[1.563rem] cursor-pointer" />
        </button>
      </div>
      <div className="flex gap-x-10">
        {counters?.map((counter, i) => {
          return (
            <div key={i} className="w-[27.5rem]">
              <div className="px-5 py-[1.375rem] bg-white w-full rounded-[1.5rem] text-text-gray-secondary shadow-custom">
                <div className="flex gap-x-[0.813rem] items-center text-[1.25rem] font-bold leading-[1.5rem]">
                  <IoMdKeypad />
                  მრიცხველი {i + 1}
                </div>
                <div className="pt-[0.625rem]">
                  <span className="text-base font-medium">
                    {counter.counter_name}
                  </span>
                </div>
                <div className="border-0 border-t border-border-color-secondary mt-5 font-medium flex flex-col gap-5 text-[1rem] py-4 ">
                  <div className="flex items-center justify-between leading-[1.188rem]">
                    <span>პირველი 1 საათი</span>{" "}
                    <span className="text-button-green">
                      {counter.first_hours}₾
                    </span>
                  </div>
                  <div className="flex items-center justify-between leading-[1.188rem]">
                    <span>3 საათის განმავლობაში</span>{" "}
                    <span className="text-button-green">
                      {counter.during_3_hours}₾
                    </span>
                  </div>
                  <div className="flex items-center justify-between  leading-[1.188rem]">
                    <span>პირველი 4 საათის შემდეგ ღამის 11 საათამდე</span>{" "}
                    <span className="text-button-green ">
                      {counter.until_23_oclock}₾
                    </span>
                  </div>
                  <div className="flex items-center justify-between leading-[1.188rem]">
                    <span>ღამის 11 დან დილის 9-მდე</span>{" "}
                    <span className="text-button-green ">
                      {counter.until_9_oclock}₾
                    </span>
                  </div>
                  <div className="flex items-center justify-between leading-[1.188rem]">
                    <span>ყოველი 24 საათი</span>{" "}
                    <span className="text-button-green ">
                      {counter.every_24_hours}₾
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between  border-0 border-t border-border-color-secondary pt-4 font-bold">
                  <span>დრო:</span>{" "}
                  <span className="">{counter.tolerance_time}წთ</span>
                </div>
                {/* <div className="flex gap-x-2 items-center border-0 border-t border-slate-200 mt-2 pt-3">
                  <button className="py-1 px-3 border border-green-500 text-green-500 rounded-md w-full hover:bg-green-500 hover:text-white transition-colors duration-200">
                    რედაქტირება
                  </button>
                  <button className="py-1 px-3 border border-red-500 text-red-500 rounded-md w-full hover:bg-red-500 hover:text-white transition-colors duration-200">
                    წაშლა
                  </button>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
      {isNewCounterAdding && (
        <AddNewCounter
          hideAddNewCounter={hideAddNewCounter}
          setCounters={setCounters}
        />
      )}
    </div>
  );
};

export default Counter;
