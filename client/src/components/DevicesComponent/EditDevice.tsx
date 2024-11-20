import { ChangeEvent, FC, useState } from 'react';
import { Modal, ModalBody, ModalContainer, ModalFooter, ModalHeader } from '../Modal';
import { useParking } from '../../App';
import axios from 'axios';

type EditDevice = {
	selectedDevice: Device;
	setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
	hideEditDevice: VoidFunction;
};

const EditDevice: FC<EditDevice> = ({ selectedDevice, setDevices, hideEditDevice }): JSX.Element => {
	console.log(selectedDevice);

	const { API_URL, showNotification } = useParking();

	const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
		device_id: selectedDevice.device_id,
		external_device_id: selectedDevice.external_device_id,
		device_name: selectedDevice.device_name,
		device_subsidiary_money_amount: selectedDevice.device_subsidiary_money_amount,
		device_cards_to_give_quantity: selectedDevice.device_cards_to_give_quantity,
		has_subsidiary_money_receiver: selectedDevice.has_subsidiary_money_receiver,
		has_cash_receiver: selectedDevice.has_cash_receiver,
		has_debit_card_transaction: selectedDevice.has_debit_card_transaction,
		has_monitor: selectedDevice.has_monitor,
		device_type: selectedDevice.device_type,
	});

	const handleChangeDeviceInfo = (e: ChangeEvent<HTMLInputElement>) => {
		setDeviceInfo((deviceInfo: DeviceInfo) => ({ ...deviceInfo, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
	};

	const editDevice = async (): Promise<void> => {
		await axios
			.post(API_URL + '/editdevice', { ...deviceInfo })
			.then((res) => {
				if (res.status >= 200 && res.status <= 226) {
					const { status, message } = res.data as ResponseStatus;
					if (status === 'updated') {
						setDevices((devices) => {
							return devices.map((device) => {
								if (device.device_id === deviceInfo.device_id) {
									return {
										...device,
										...deviceInfo,
									};
								}
								return device;
							});
						});
						showNotification(message);
						hideEditDevice();
					} else if (status === 'update_error') {
						showNotification(message, 'bg-red-500');
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<ModalContainer>
			<Modal className='w-1/3'>
				<ModalHeader title='მოწყობილობის რედაქტირება' onHide={hideEditDevice} />
				<ModalBody>
					<div className='flex flex-col gap-y-3 w-10/12 mx-auto'>
						<div className='flex gap-x-3'>
							<input
								type='text'
								placeholder='მოწყობილობის დასახელება'
								className='w-full py-2 px-3 outline-none rounded-md border border-slate-300 font-bpg-arial-caps'
								name='device_name'
								value={deviceInfo.device_name}
								onChange={handleChangeDeviceInfo}
							/>
							<input
								type='text'
								placeholder='ID'
								className='w-16 py-2 px-3 outline-none rounded-md border border-slate-300 font-bpg-arial-caps'
								name='external_device_id'
								value={deviceInfo.external_device_id}
								onChange={handleChangeDeviceInfo}
							/>
						</div>
						<div className='flex gap-x-3'>
							{deviceInfo.device_type?.devicetype_type === 'card-receiver' && (
								<input
									type='text'
									placeholder='ხურდა (გასაცემი რაოდენობა)'
									className='w-full py-2 px-3 outline-none rounded-md border border-slate-300 font-bpg-arial-caps'
									name='device_subsidiary_money_amount'
									value={deviceInfo.device_subsidiary_money_amount}
									onChange={handleChangeDeviceInfo}
								/>
							)}
							{deviceInfo.device_type?.devicetype_type === 'card-giver' && (
								<input
									type='text'
									placeholder='ბარათები (გასაცემი რაოდენობა)'
									className='w-full py-2 px-3 outline-none rounded-md border border-slate-300 font-bpg-arial-caps'
									name='device_cards_to_give_quantity'
									value={deviceInfo.device_cards_to_give_quantity}
									onChange={handleChangeDeviceInfo}
								/>
							)}
						</div>
						<hr className='my-3' />
						<div className='flex flex-col gap-y-3'>
							{deviceInfo.device_type?.devicetype_type === 'card-receiver' && (
								<>
									<label className='inline-flex justify-between items-center cursor-pointer'>
										<input type='checkbox' className='sr-only peer' name='has_subsidiary_money_receiver' checked={deviceInfo.has_subsidiary_money_receiver} onChange={handleChangeDeviceInfo} />
										<span className='text-md font-medium text-slate-700'>ხურდის მიმღები</span>
										<div className="relative w-9 h-5 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
									</label>
									<label className='inline-flex justify-between items-center cursor-pointer'>
										<input type='checkbox' className='sr-only peer' name='has_cash_receiver' checked={deviceInfo.has_cash_receiver} onChange={handleChangeDeviceInfo} />
										<span className='text-md font-medium text-slate-700'>ქეშის მიმღები</span>
										<div className="relative w-9 h-5 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
									</label>
									<label className='inline-flex justify-between items-center cursor-pointer'>
										<input type='checkbox' className='sr-only peer' name='has_debit_card_transaction' checked={deviceInfo.has_debit_card_transaction} onChange={handleChangeDeviceInfo} />
										<span className='text-md font-medium text-slate-700'>ბარათით გადახდა</span>
										<div className="relative w-9 h-5 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
									</label>
								</>
							)}
							<label className='inline-flex justify-between items-center cursor-pointer'>
								<input type='checkbox' className='sr-only peer' name='has_monitor' checked={deviceInfo.has_monitor} onChange={handleChangeDeviceInfo} />
								<span className='text-md font-medium text-slate-700'>ეკრანი</span>
								<div className="relative w-9 h-5 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
							</label>
						</div>
						<hr className='my3' />
					</div>
				</ModalBody>
				<ModalFooter>
					<button className='py-1 px-3 rounded-md bg-green-500 hover:bg-green-500/[.8] active:bg-green-600/[.9] text-white text-lg' onClick={editDevice}>
						შენახვა
					</button>
				</ModalFooter>
			</Modal>
		</ModalContainer>
	);
};

export default EditDevice;
