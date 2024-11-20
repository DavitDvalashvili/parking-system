import { FC } from "react";
import DeviceAdditionalParts from "./DeviceAdditionalParts";
import DeviceBalance from "./DeviceBalance";
import DeviceCardReceiver from "./DeviceCardReceiver";
import DeviceMoneyReceiver from "./DeviceMoneyReceiver";
import { CardReceiverObjects } from "../DeviceCard";

type CardReceiverType = {
  cardReceiverObjects: CardReceiverObjects;
};

export type DeviceMoneyReceiverType = {
  has_subsidiary_money_receiver: boolean;
  has_cash_receiver: boolean;
  has_debit_card_transaction: boolean;
};

const CardReceiverType: FC<CardReceiverType> = ({
  cardReceiverObjects,
}): JSX.Element => {
  const deviceMoneyReceiverObjects: DeviceMoneyReceiverType = {
    has_subsidiary_money_receiver:
      cardReceiverObjects.has_subsidiary_money_receiver,
    has_cash_receiver: cardReceiverObjects.has_cash_receiver,
    has_debit_card_transaction: cardReceiverObjects.has_debit_card_transaction,
  };

  return (
    <div>
      <DeviceBalance
        subsidaryMoneyAmount={
          cardReceiverObjects.device_subsidiary_money_amount
        }
      />
      <DeviceCardReceiver
        cardsToReceiveQuantity={
          cardReceiverObjects.device_cards_received_quantity
        }
      />
      <DeviceMoneyReceiver
        deviceMoneyReceiverObjects={deviceMoneyReceiverObjects}
      />
      <DeviceAdditionalParts has_monitor={cardReceiverObjects.has_monitor} />
    </div>
  );
};

export default CardReceiverType;
