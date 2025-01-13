import AddCardForm from "../../components/MainComponents/CardsComponent/AddCardForm";
import { IoIosCard } from "react-icons/io";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useParking } from "../../App";
import EditCard from "../../components/MainComponents/CardsComponent/EditCard";
import RemoveCard from "../../components/MainComponents/CardsComponent/RemoveCard";
import SingleCard from "../../components/MainComponents/CardsComponent/SingleCard";

export type card = {
  card_id: number;
  card_uid: string;
  role_id: number;
  role_name: string;
  role_name_description: string;
  role_priority: number;
};

const defaultCard: card = {
  card_id: 0,
  card_uid: "",
  role_id: 0,
  role_name: "",
  role_name_description: "",
  role_priority: 0,
};

const Cards = () => {
  const { API_URL } = useParking();

  const [cards, setCards] = useState<card[]>([]);
  const [selectedCard, setSelectedCard] = useState<card>(defaultCard);
  const [isCardEditing, setIsCardEditing] = useState<boolean>(false);
  const [isCardRemoving, setIsCardRemoving] = useState<boolean>(false);

  const getCards = async (): Promise<void> => {
    await axios
      .get(`${API_URL}` + "/cards")
      .then((res: AxiosResponse) => {
        if (res.status >= 200 && res.status <= 226) {
          setCards(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCards();
  }, []);

  const showEditCard = (card: card): void => {
    setSelectedCard(card);
    setIsCardEditing(true);
  };
  const hideEditCard = (): void => {
    setSelectedCard(defaultCard);
    setIsCardEditing(false);
  };

  const showRemoveCard = (card: card): void => {
    setSelectedCard(card);
    setIsCardRemoving(true);
  };
  const hideRemoveCard = (): void => {
    setSelectedCard(defaultCard);
    setIsCardRemoving(false);
  };

  return (
    <div className="p-10 pr-[7.625rem] flex flex-col gap-10 overflow-v">
      <div className="flex gap-[1.875rem]">
        <div
          className="text-gray-primary font-bold text-xl leading-[1.875rem] flex justify-center items-center gap-6 bg-white 
        rounded-primary px-[0.813rem] py-[0.625rem]"
        >
          <IoIosCard className="w-[1.563rem]" />
          <span>ბარათები</span>
        </div>
        <AddCardForm setCards={setCards} />
      </div>
      <div className="grid grid-cols-3 gap-10">
        {cards.map((card: card, i: number) => {
          return (
            <SingleCard
              card={card}
              key={i}
              showEditCard={() => showEditCard(card)}
              showRemoveCard={() => showRemoveCard(card)}
            />
          );
        })}
      </div>
      {isCardEditing && (
        <EditCard
          card={selectedCard}
          setCards={setCards}
          hideEditCard={hideEditCard}
        />
      )}
      {isCardRemoving && (
        <RemoveCard
          card={selectedCard}
          setCards={setCards}
          hideRemoveCard={hideRemoveCard}
        />
      )}
    </div>
  );
};

export default Cards;
