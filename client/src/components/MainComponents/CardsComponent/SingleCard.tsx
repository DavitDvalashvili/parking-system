import { RiPencilFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { card } from "../../../views/Main/Cards";

type singleCardPropTypes = {
  card: card;
  showEditCard: VoidFunction;
  showRemoveCard: VoidFunction;
};

const SingleCard = ({
  card,
  showEditCard,
  showRemoveCard,
}: singleCardPropTypes): JSX.Element => {
  return (
    <div className="w-full h-[14.688rem] rounded-[0.625rem] overflow-hidden bg-white">
      <div className="h-fit p-4">
        <div className="flex justify-between items-start ">
          <RiPencilFill
            className="w-6 h-6 cursor-pointer"
            onClick={showEditCard}
          />
          <div className="bg-gray-primary w-[161.44px] h-[102.63px] rounded-[0.625rem] px-[8.73px] py-[15.18px] flex flex-col justify-end mt-0.5">
            <img
              src="/logoWhite.svg"
              alt="logo"
              className="w-[67.59px] h-[26.23px]"
            />
          </div>
          <FaTrashAlt
            className="w-6 h-6 cursor-pointer"
            onClick={showRemoveCard}
          />
        </div>
        <div className="font-bold text-lg leading-[1.35rem] text-center mt-[0.625rem] mb-4">
          {card.role_name_description}
        </div>
      </div>

      <div className="bg-gray-primary text-xl leading-6 text-center text-white font-bold py-4">
        {card.card_uid}
      </div>
    </div>
  );
};

export default SingleCard;
