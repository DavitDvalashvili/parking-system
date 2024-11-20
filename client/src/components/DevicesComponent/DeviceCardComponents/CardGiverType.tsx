import { FC } from 'react';
import { CardGiverObjects } from '../DeviceCard';
import DeviceAdditionalParts from './DeviceAdditionalParts';
import DeviceCardGiver from './DeviceCardGiver';

type CardGiverType = {
	cardGiverObjects: CardGiverObjects;
};

export type DeviceCardGiverType = {
	device_cards_to_give_quantity: string | number;
	device_cards_busy_quantity: string | number;
	device_cards_problematic_quantity: string | number;
};

const CardGiverType: FC<CardGiverType> = ({ cardGiverObjects }): JSX.Element => {
	const deviceCardGiverObjects: DeviceCardGiverType = {
		device_cards_to_give_quantity: cardGiverObjects.device_cards_to_give_quantity,
		device_cards_busy_quantity: cardGiverObjects.device_cards_busy_quantity,
		device_cards_problematic_quantity: cardGiverObjects.device_cards_problematic_quantity,
	};

	return (
		<div>
			<DeviceCardGiver deviceCardGiverObjects={deviceCardGiverObjects} />
			<DeviceAdditionalParts has_monitor={cardGiverObjects.has_monitor} />
		</div>
	);
};

export default CardGiverType;
