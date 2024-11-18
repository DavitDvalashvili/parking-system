import { FaTrashAlt } from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from "../../Modal";
import { FC } from "react";
import { card } from "../../../views/Main/Cards";
import axios, { AxiosResponse } from "axios";
import { useParking } from "../../../App";

type RemoveCard = {
  card: card;
  setCards: React.Dispatch<React.SetStateAction<card[]>>;
  hideRemoveCard: VoidFunction;
};

const RemoveCard: FC<RemoveCard> = ({ card, setCards, hideRemoveCard }) => {
  const { API_URL, showNotification } = useParking();

  const deleteCard = async (): Promise<void> => {
    if (card.card_id) {
      await axios
        .delete(API_URL + "/deletecard/" + card.card_id)
        .then((res: AxiosResponse) => {
          if (res.status >= 200 && res.status <= 226) {
            const { status, message } = res.data;
            if (status === "deleted") {
              hideRemoveCard();
              showNotification(message);
              setCards((cards) =>
                cards.filter((_card) => _card.card_id !== card.card_id)
              );
            } else if (status === "delete_error") {
              hideRemoveCard();
              showNotification(message, "bg-red-500");
            }
          }
        });
    }
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader onHide={hideRemoveCard} />
        <ModalBody>
          <div className="w-[37.938rem]">
            <div className="w-[4.5rem] h-[4.5rem] rounded-3xl font-bold text-[53px] bg-delete-button-red flex justify-center items-center mx-auto mt-5">
              <img
                src="./Delete.svg"
                alt="Delete"
                className="h-[2.063rem] w-[2.063rem]"
              />
            </div>
            <div className="text-xl leading-6 text-text-gray-primary text-center font-bold mt-[1.875rem] mb-8">
              ნამდვილად გსურთ ბარათის წაშლა ?
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="w-[8rem] h-10 bg-delete-button-red rounded-[0.625rem] flex justify-between font-bold mx-auto text-white text-[1rem] leading-5 px-[1.688rem] py-[0.625rem] mb-[2.563rem]"
            onClick={deleteCard}
          >
            <span>წაშლა</span>
            <FaTrashAlt className="text-md"/>
          </button>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
};

export default RemoveCard;
