import NavigationLayout from "../../components/MainComponents/NavigationLayout";
import Notification from "../../components/Notification";
import { Outlet, useNavigate } from "react-router-dom";
import { useParking } from "../../App";
import { useEffect } from "react";
import Loading from "../Loading";
import ServerError from "../ServerError";

const Main = () => {
  const { userData, checkSession, notification } = useParking();

  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (userData === null) navigate("/login");
  }, [userData]);

  if (userData === "Loading") return <Loading />;
  else if (userData === "Network Error") return <ServerError />;
  else if (userData instanceof Object) {
    return (
      <div className="w-screen h-screen flex font-firago bg-bg-main ">
        <NavigationLayout />
        <div className="flex flex-col flex-1 bg-bg-image bg-right-top bg-no-repeat">
          <Outlet />
        </div>
        {notification && <Notification />}
      </div>
    );
  }
};

export default Main;
