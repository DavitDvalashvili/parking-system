import { FaLock } from "react-icons/fa6";
import { useParking } from "../App";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Login = () => {
  const { API_URL, setUserData, userData, checkSession } = useParking();
  const navigate: NavigateFunction = useNavigate();

  type authInfoType = {
    username: string;
    password: string;
  };

  const [authInfo, setAuthInfo] = useState<authInfoType>({
    username: "",
    password: "",
  });

  const login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (authInfo.username && authInfo.password) {
      axios
        .post(API_URL + "/login", authInfo)
        .then((res: AxiosResponse) => {
          if (res.status >= 200 && res.status < 226) {
            console.log(res.data);
            if (res.data) {
              setUserData(res.data);
              navigate("/");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeAuthInfo = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  useEffect(() => {
    document.title = "ავტორიზაცია";
    checkSession();
  }, []);

  useEffect(() => {
    if (userData) navigate("/");
  }, [userData]);

  return (
    <div className="w-screen h-screen flex justify-center item-center font-firago">
      <div className="w-[61.8vw] h-full bg-green-200 bg-bg-gradient bg-center p-10 flex justify-center items-start flex-col">
        <img
          src="/logoWhite.svg"
          alt="logo"
          className="w-[294px] h-[114.76px]"
        />
        <p className="mt-4 mb-6 text-white text-[19px] max-w-[372px] font-normal">
          ყველაზე პოპულარული პარკინგის მენეგმენტის სისტემა
        </p>
        <button className="text-4 leading-6 font-bold text-black inline bg-button-bg-yellow py-[1.125rem] px-[4.719rem] rounded-[1.25rem]">
          {" "}
          გაიგე მეტი{" "}
        </button>
      </div>
      <div className="w-[38.2vw] h-full bg-bg-image bg-top-right bg-no-repeat flex justify-center items-center flex-col ">
        <div>
          <h2 className="text-text-primary-blue text-[2.5rem] font-bold">
            მოგესამლებით!
          </h2>
          <p className="mt-3.5 mb-8 font-medium text-[1.188rem] leading-[1.781rem]">
            გთხოვთ შეხვიდეთ სისტემაში
          </p>
          <form
            className="text-sm text-text-gray-secondary mb-5"
            onSubmit={login}
          >
            <div className=" w-[21.625rem] h-[3.75rem] rounded-[1.875rem] border border-border-color py-[1.125rem] px-[1.625rem] flex justify-start items-center gap-3">
              <FaLock className="text-text-gray-secondary opacity-30" />
              <input
                className="w-full h-full focus:outline-none "
                type="text"
                placeholder="მომხმარებლის სახელი"
                name="username"
                value={authInfo.username}
                onChange={handleChangeAuthInfo}
              />
            </div>
            <div className=" my-5 w-[21.625rem] h-[3.75rem] rounded-[1.875rem] border border-border-color py-[1.125rem] px-[1.625rem] flex justify-start items-center gap-3">
              <FaLock className="text-text-gray-secondary opacity-30" />
              <input
                className="w-full h-full focus:outline-none"
                type="password"
                placeholder="პაროლი"
                name="password"
                value={authInfo.password}
                onChange={handleChangeAuthInfo}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-text-primary-blue font-bold leading-[1.298rem] text-[1rem] w-[21.625rem] h-[3.75rem] rounded-[1.875rem]"
            >
              შესვლა
            </button>
          </form>
          <span className="text-center block text-text-gray-secondary text-sm opacity-30 cursor-pointer">
            დაგავიწყდა პაროლი?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
