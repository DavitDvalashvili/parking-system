import axios from 'axios';
import { useParking } from '../../../App';
import { Modal, ModalBody, ModalContainer, ModalFooter, ModalHeader } from '../../Modal';
import { FC, useEffect, useState } from 'react';
import { Variant1 } from '../../../views/Main/Counter';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';

type FitCounter = {
	selectedDevice: Device;
	setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
	hideFitDevice: () => void;
};

const FitCounter: FC<FitCounter> = ({ selectedDevice, setDevices, hideFitDevice }): JSX.Element => {
	const { API_URL, showNotification } = useParking();

	const [counters, setCounters] = useState<Variant1[]>([]);
	const [selectedCounter, setSelectedCounter] = useState<number | null>(null);
	const [selectedDropdown, setSelectedDropdown] = useState<number | null>(null);

	const getCounters = async () => {
		await axios
			.get(API_URL + '/getcounters')
			.then((res) => {
				if (res.status >= 200 && res.status <= 226) {
					setCounters(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fitCounter = async () => {
		await axios.post(API_URL + '/fitcounter', { device_id: selectedDevice.device_id, counter_id: selectedCounter }).then((res) => {
			if (res.status >= 200 && res.status <= 226) {
				const { status, message } = res.data as ResponseStatus;
				if (status === 'updated') {
					setDevices((devices) => {
						return devices.map((device) => {
							if (device.device_id === selectedDevice.device_id) {
								return {
									...device,
									counter_id: selectedCounter as number,
								};
							} else {
								return device;
							}
						});
					});
					showNotification(message);
					hideFitDevice();
				}
			}
		});
	};

	const selectCounter = (id: number) => {
		setSelectedCounter(id);
	};

	const selectDropdown = (idx: number) => {
		if (selectedDropdown === idx) setSelectedDropdown(-1);
		else setSelectedDropdown(idx);
	};

	useEffect(() => {
		getCounters();
		if (selectedDevice) setSelectedCounter(selectedDevice.counter_id);
	}, []);

	return (
		<ModalContainer>
			<Modal>
				<ModalHeader title='მრიცხველის მორგება' onHide={hideFitDevice} />
				<ModalBody>
					<div>
						<div className='text-sm ps-3 italic text-gray-700'>{selectedDevice.device_name}</div>
						{counters.map((counter, i) => {
							return (
								<div key={i} className='p-3 border mt-2 rounded-md'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-x-3'>
											<div className='w-5 h-5 border cursor-pointer flex items-center justify-center' onClick={() => selectCounter(counter.counter_id as number)}>
												{counter.counter_id === selectedCounter && <FiCheck />}
											</div>
											<span className='mt-0.5 text-gray-800'>{counter.counter_name}</span>
										</div>
										<span className='cursor-pointer' onClick={() => selectDropdown(i)}>
											{selectedDropdown === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
										</span>
									</div>
									{selectedDropdown === i && (
										<div className='mt-3 p-2 border-t text-gray-700'>
											<div className='flex px-3 py-1 items-center justify-between'>
												<span>პირველი 1 საათი</span>
												<span className='text-green-500'>{counter.first_hours}₾</span>
											</div>
											<div className='flex px-3 py-1 items-center justify-between'>
												<span>3 საათის განმავლობაში</span>
												<span className='text-green-500'>{counter.during_3_hours}₾</span>
											</div>
											<div className='flex px-3 py-1 items-center justify-between'>
												<span>4 საათის შემდეგ ღამის 11-მდე</span>
												<span className='text-green-500'>{counter.until_23_oclock}₾</span>
											</div>
											<div className='flex px-3 py-1 items-center justify-between'>
												<span>ღამის 11 დან დილის 9-მდე</span>
												<span className='text-green-500'>{counter.until_9_oclock}₾</span>
											</div>
											<div className='flex px-3 py-1 items-center justify-between'>
												<span>ყოველი 24 საათი</span>
												<span className='text-green-500'>{counter.every_24_hours}₾</span>
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</ModalBody>
				<ModalFooter>
					<button className='py-2 px-5 bg-green-500 hover:bg-green-400 active:bg-green-600 text-white rounded-md disabled:bg-green-400/[.6]' disabled={!selectedCounter} onClick={fitCounter}>
						შენახვა
					</button>
				</ModalFooter>
			</Modal>
		</ModalContainer>
	);
};

export default FitCounter;
