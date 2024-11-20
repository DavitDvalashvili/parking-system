import { FaTrash } from 'react-icons/fa';
import { Modal, ModalBody, ModalContainer, ModalFooter, ModalHeader } from '../Modal';
import { FC } from 'react';
import { useParking } from '../../App';
import axios from 'axios';

type DeleteDevice = {
	selectedDevice: Device | null;
	setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
	hideDeleteDevice: VoidFunction;
};

const DeleteDevice: FC<DeleteDevice> = ({ selectedDevice, setDevices, hideDeleteDevice }): JSX.Element => {
	const { API_URL, showNotification } = useParking();

	const removeDevice = async (): Promise<void> => {
		if (selectedDevice) {
			await axios
				.delete(API_URL + '/removedevice/' + selectedDevice.device_id)
				.then((res) => {
					if (res.status >= 200 && res.status <= 226) {
						const { status, message } = res.data as ResponseStatus;

						if (status === 'deleted') {
							setDevices((devices) => devices.filter((d) => d.device_id !== selectedDevice.device_id));
							hideDeleteDevice();
							showNotification(message);
						} else if (status === 'delete_error') {
							showNotification(message, 'bg-red-500');
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
				<ModalHeader title='ყურადღება!' onHide={hideDeleteDevice} />
				<ModalBody>
					<div className='flex flex-col gapy-3 items-center'>
						<span className='text-red-500 text-xl'>ნამდვილად გსურთ მოწყობილობის წაშლა?</span>
						<span className='text-slate-700 mt-3'>{selectedDevice?.device_name}</span>
					</div>
				</ModalBody>
				<ModalFooter>
					<button className='py-1 px-3 flex items-center justify-center gap-x-2 bg-red-500 hover:bg-red-500/[.9] active:bg-red-600 text-white rounded-md' onClick={removeDevice}>
						წაშლა <FaTrash />
					</button>
				</ModalFooter>
			</Modal>
		</ModalContainer>
	);
};

export default DeleteDevice;
