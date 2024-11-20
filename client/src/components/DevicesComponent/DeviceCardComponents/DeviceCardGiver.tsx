import { MdRestartAlt } from 'react-icons/md';
import { DeviceCardGiverType } from './CardGiverType';
import { FC } from 'react';

type DeviceCardGiver = {
	deviceCardGiverObjects: DeviceCardGiverType;
};

const DeviceCardGiver: FC<DeviceCardGiver> = ({ deviceCardGiverObjects }): JSX.Element => {
	return (
		<div className='border-0 border-t border-slate-300 pt-3 mt-3'>
			<div className='flex justify-between items-center'>
				<span>ბარათები:</span> <span className='text-2xl'>{deviceCardGiverObjects.device_cards_to_give_quantity}</span>
			</div>
			<div className='flex justify-between items-center'>
				<span>დაკავებული:</span> <span className='text-2xl'>{deviceCardGiverObjects.device_cards_busy_quantity}</span>
			</div>
			<div className='flex justify-between items-center group'>
				<span>გადადებული:</span>
				<div className='flex items-center text-2xl relative'>
					<span className='group-hover:mr-[25px] duration-200 z-10'>{deviceCardGiverObjects.device_cards_problematic_quantity}</span>
					<button className='w-fit absolute right-[100%] opacity-0 group-hover:opacity-100 group-hover:right-[-2px] duration-200' title='განულება'>
						<MdRestartAlt />
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeviceCardGiver;
