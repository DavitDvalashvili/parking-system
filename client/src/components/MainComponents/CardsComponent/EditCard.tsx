import { ChangeEvent, FC, useEffect, useState } from "react";
import { card } from "../../../views/Main/Cards";
import {
  Modal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from "../../Modal";
import axios, { AxiosResponse } from "axios";
import { useParking } from "../../../App";
import { RiPencilFill } from "react-icons/ri";
import { defaultRole, Role } from "./AddCardForm";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type EditCard = {
  card: card;
  setCards: React.Dispatch<React.SetStateAction<card[]>>;
  hideEditCard: VoidFunction;
};

const EditCard: FC<EditCard> = ({
  card,
  setCards,
  hideEditCard,
}): JSX.Element => {
  const { API_URL, showNotification } = useParking();

  const [selectedCard, setSelectedCard] = useState<card>(card);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>(defaultRole);
  const [dropdownRole, setDropdownRole] = useState<boolean>(false);

  const handleChangeCard = (e: ChangeEvent<HTMLInputElement>) =>
    setSelectedCard({ ...selectedCard, card_uid: e.target.value });

  const toggleSelectRole = () => setDropdownRole(!dropdownRole);
  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    toggleSelectRole();
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

  const updateCard = async (): Promise<void> => {
    if (selectedCard.card_uid) {
      await axios
        .post(API_URL + "/updatecard", {
          ...selectedCard,
          role_id: selectedRole.role_id,
        })
        .then((res: AxiosResponse) => {
          if (res.status >= 200 && res.status <= 226) {
            const { status, message } = res.data;
            if (status === "updated") {
              setCards((cards) => {
                return cards.map((c) => {
                  if (c.card_id === selectedCard.card_id) {
                    c = {
                      ...selectedCard,
                      card_uid: selectedCard.card_uid,
                      ...selectedRole,
                    };
                  }
                  return c;
                });
              });
              hideEditCard();
              showNotification(message, true);
            } else if (
              status === "update_exists" ||
              status === "update_error"
            ) {
              hideEditCard();
              showNotification(message, false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader title="ბარათის რედაქტირება" onHide={hideEditCard} />
        <ModalBody>
          <div className="text-xl leading-6 text-gray-primary text-center font-bold mb-9 w-[42.938rem]">
            რედაქტირება
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="relative text-center">
              <div
                className=" flex justify-between items-center mb-4 px-[1.375rem] h-[3.125rem] w-[16.188rem] bg-white rounded-[0.625rem] font-bold text-base leading-5 cursor-pointer border-[0.5px] border-primary-blue gray-primary"
                onClick={toggleSelectRole}
              >
                <span className="text-gray-primary">
                  {selectedRole?.role_name_description}
                </span>
                {dropdownRole && <IoIosArrowUp className="w-6 h-6" />}
                {!dropdownRole && <IoIosArrowDown className="w-6 h-6" />}
              </div>
              {dropdownRole && (
                <div className="flex flex-col absolute z-10 bg-white top-[0%] rounded-[0.625rem] font-bold text-base leading-5 cursor-pointer border-[0.5px] border-primary-blue gray-primary px-[1.375rem] w-[16.188rem]">
                  {roles
                    .sort((a, b) =>
                      a === selectedRole ? -1 : b === selectedRole ? 1 : 0
                    ) // Move selectedRole to the top
                    .map((role, i) => {
                      let borderStyle =
                        role === selectedRole
                          ? "border-b-[0.5px] border-black"
                          : "border-none";
                      let ArrowStyle =
                        role !== selectedRole ? "hidden" : "inline";
                      let margin =
                        role !== selectedRole
                          ? "mt-[0.625rem] mb-[0.563rem]"
                          : "";

                      return (
                        <div
                          key={i}
                          className={`${borderStyle} ${margin} py-[0.813rem] flex justify-between items-center`}
                          onClick={() => handleSelectRole(role)}
                        >
                          <span>{role.role_name_description}</span>
                          <IoIosArrowUp className={`${ArrowStyle} w-6 h-6`} />
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          <input
            type="text"
            placeholder="ბარათის ნომერი"
            className="block mx-auto border-[0.5px] mb-[1.438rem] border-primary-blue font-bold px-[1.375rem] text-base leading-[1.25rem] text-gray-primary h-[3.125rem] w-[16.188rem] focus:outline-none rounded-[0.625rem]"
            value={selectedCard.card_uid}
            onChange={handleChangeCard}
          />
        </ModalBody>
        <ModalFooter>
          <button
            className="w-[9.625rem] h-10 bg-button-green rounded-[0.625rem] font-bold mx-auto text-white text-[1rem] leading-5 flex justify-center items-center px-2 mb-5"
            onClick={updateCard}
          >
            <span>რედაქტირება</span>
            <RiPencilFill className="text-md" />
          </button>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
};

export default EditCard;
