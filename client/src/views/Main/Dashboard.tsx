import { IoIosCard } from "react-icons/io";
import AddCardForm from "../../components/MainComponents/CardsComponent/AddCardForm";
import { useState } from "react";
import { card } from "./Cards";
import DashboardBalances from "../../components/MainComponents/DashboardComponents/DashboardBalances";
import DashboardCards from "../../components/MainComponents/DashboardComponents/DashboardCards";
import DashboardParkingDevices from "../../components/MainComponents/DashboardComponents/DashboardParkingDevices";

const Dashboard = () => {
  const [cards, setCards] = useState<card[]>([]);

  return (
    <div className="pt-10 pb-[1.875rem] pl-[33px] pr-[7rem] flex flex-col gap-10 overflow-v">
      <div className="flex gap-[1.875rem]">
        <div
          className="text-gray-primary font-bold text-xl leading-[1.875rem] flex justify-center items-center gap-6 bg-white 
        rounded-[0.625rem] px-[0.813rem] py-[0.625rem]"
        >
          <IoIosCard className="w-[1.563rem]" />
          <span>ბარათები</span>
        </div>
        <AddCardForm setCards={setCards} />
      </div>
      <DashboardBalances />
      <DashboardCards />
      <DashboardParkingDevices />
    </div>
  );
};

export default Dashboard;
