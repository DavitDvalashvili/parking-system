import { useParking } from "../../App";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import { MdHomeFilled } from "react-icons/md";
import { IoIosCard } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { RiSettings5Fill } from "react-icons/ri";
import { PiDeviceMobileSpeakerFill } from "react-icons/pi";
import { IoMdKeypad } from "react-icons/io";
import { MdInsertChart } from "react-icons/md";

type NavMenuObject = {
  path: string;
  icon: JSX.Element;
  name: string;
};

const NavigationLayout = () => {
  const { API_URL, setUserData } = useParking();

  const location = useLocation();
  const navigate = useNavigate();

  const NavMenu: NavMenuObject[] = [
    {
      path: "/",
      icon: <MdHomeFilled />,
      name: "პანელი",
    },
    {
      path: "/cards",
      icon: <IoIosCard />,
      name: "ბარათები",
    },
    {
      path: "/devices",
      icon: <PiDeviceMobileSpeakerFill />,
      name: "მოწყობილობები",
    },
    {
      path: "/counter",
      icon: <IoMdKeypad />,
      name: "მრიცხველი",
    },
    {
      path: "/statistic",
      icon: <MdInsertChart />,
      name: "სტატისტიკა",
    },
    {
      path: "/history",
      icon: <GrUpdate />,
      name: "ისტორია",
    },
    {
      path: "/settings",
      icon: <RiSettings5Fill />,
      name: "პარამეტრები",
    },
  ];

  const logout = async () => {
    await axios
      .post(API_URL + "/logout")
      .then((res: AxiosResponse) => {
        if (res.status >= 200 && res.status <= 226) {
          setUserData(null);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        setUserData(null);
        navigate("/login");
      });
  };

  useEffect(() => {
    const validPath = NavMenu.find((nm) => nm.path === location.pathname);
    if (validPath) document.title = validPath.name;
  }, [location]);

  return (
    <div className="flex flex-col w-[26.5625vw] h-screen bg-white ">
      <div className="flex justify-center pb-[6rem] pt-10">
        <img src="./logoBlue.svg" alt="logo" />
      </div>
      <div>
        <ul className="text-center w-full flex flex-col flex-1  text-gray-primary text-xl font-bold leading-6 gap-[2.125rem]">
          {NavMenu.map((item: NavMenuObject, i: number) => {
            const textColor: string =
              item.path === location.pathname
                ? "text-white"
                : "text-gray-primary";
            const bgColor: string =
              item.path === location.pathname ? "bg-primary-blue" : "";
            return (
              <li className="flex" key={i}>
                <Link
                  to={item.path}
                  className={`py-[0.469rem] ${textColor} ${bgColor} flex items-center leading-[1.876rem] rounded-r-[0.625rem] w-full pl-[3.75rem] justify-left  gap-6`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full mt-auto">
        <button
          className="p-4 w-full pb-3 bg-[#E44] text-white rounded-[20px] font-bold"
          onClick={logout}
        >
          გასვლა
        </button>
      </div>
    </div>
  );
};

export default NavigationLayout;
