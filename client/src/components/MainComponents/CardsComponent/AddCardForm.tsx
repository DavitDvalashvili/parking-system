import { ChangeEvent, FC, useEffect, useState } from "react";
import { useParking } from "../../../App";
import axios, { AxiosResponse } from "axios";
import { card } from "../../../views/Main/Cards";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type CardForm = {
  setCards: React.Dispatch<React.SetStateAction<card[]>>;
};

export type Role = {
  role_id: number;
  role_name: string;
  role_name_description: string;
  role_priority: number;
};

export const defaultRole: Role = {
  role_id: 0,
  role_name: "",
  role_name_description: "",
  role_priority: 0,
};

const AddCardForm: FC<CardForm> = ({ setCards }): JSX.Element => {
  const { API_URL, showNotification } = useParking();

  const [cardUID, setCardUID] = useState<string>("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>(defaultRole);
  const [dropdownRole, setDropdownRole] = useState<boolean>(false);

  const handleChangeCardUID = (e: ChangeEvent<HTMLInputElement>) =>
    setCardUID(e.target.value);

  const toggleSelectRole = () => setDropdownRole(!dropdownRole);
  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    toggleSelectRole();
  };

  const addNewCard = async () => {
    if (cardUID) {
      await axios
        .post(API_URL + "/addnewcard", {
          card_uid: cardUID,
          role_id: selectedRole.role_id,
        })
        .then((res: AxiosResponse) => {
          if (res.status >= 200 && res.status <= 226) {
            const { status, message, insert_id } = res.data;
            if (status === "inserted") {
              setCards((cards) => [
                {
                  card_id: insert_id as number,
                  card_uid: cardUID,
                  ...selectedRole,
                },
                ...cards,
              ]);
              showNotification(message);
            } else if (status === "insert_exist" || status === "insert_error") {
              showNotification(message, "bg-red-500");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getRoles = async () => {
    await axios
      .get(API_URL + "/roles")
      .then((res) => {
        if (res.status >= 200 && res.status <= 226) {
          const responseData = res.data as Role[];
          setRoles(responseData);
          setSelectedRole(responseData[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="flex justify-between items-center max-w-[40rem] w-full">
      <div className="flex justify-center item-center gap-4 px-[0.875rem] py-[0.813rem] bg-white rounded-[0.625rem] font-medium text-base leading-5">
        <input
          type="text"
          className="w-[10.563rem] focus:outline-none"
          placeholder="ბარათის დამატება"
          value={cardUID}
          onChange={handleChangeCardUID}
        />
        <HiOutlinePlusSm
          onClick={addNewCard}
          className="w-6 h-6 rounded-full cursor-pointer"
        />
      </div>

      <div className="relative ms-5">
        <div
          className="flex justify-center items-center gap-4 px-[0.875rem] py-[0.813rem] bg-white rounded-[0.625rem] font-bold text-base leading-5 cursor-pointer"
          onClick={toggleSelectRole}
        >
          <span>{selectedRole?.role_name_description}</span>
          {dropdownRole && <IoIosArrowUp className="w-6 h-6" />}
          {!dropdownRole && <IoIosArrowDown className="w-6 h-6" />}
        </div>
        {dropdownRole && (
          <div className="flex flex-col absolute z-10 bg-white shadow-md top-[110%] rounded-md cursor-pointer font-medium">
            {roles.map((role, i: number) => {
              return (
                <div
                  key={i}
                  className="flex items-center px-4 py-2 hover:bg-slate-100"
                  onClick={() => handleSelectRole(role)}
                >
                  {role.role_name_description}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCardForm;
