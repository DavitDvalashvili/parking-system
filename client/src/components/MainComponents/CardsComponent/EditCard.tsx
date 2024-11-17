import { ChangeEvent, FC, useEffect, useState } from 'react';
import { card } from '../../../views/Main/Cards';
import { Modal, ModalBody, ModalContainer, ModalFooter, ModalHeader } from '../../Modal';
import axios, { AxiosResponse } from 'axios';
import { useParking } from '../../../App';
import { defaultRole, Role } from './AddCardForm';

type EditCard = {
	card: card;
	setCards: React.Dispatch<React.SetStateAction<card[]>>;
	hideEditCard: VoidFunction;
};

const EditCard: FC<EditCard> = ({ card, setCards, hideEditCard }): JSX.Element => {
	const { API_URL, showNotification } = useParking();

	const [selectedCard, setSelectedCard] = useState<card>(card);
	const [roles, setRoles] = useState<Role[]>([]);
	const [selectedRole, setSelectedRole] = useState<Role>(defaultRole);
	const [dropdownRole, setDropdownRole] = useState<boolean>(false);

	const handleChangeCard = (e: ChangeEvent<HTMLInputElement>) => setSelectedCard({ ...selectedCard, card_uid: e.target.value });

	const toggleSelectRole = () => setDropdownRole(!dropdownRole);
	const handleSelectRole = (role: Role) => {
		setSelectedRole(role);
		toggleSelectRole();
	};

	const getRoles = async () => {
		await axios
			.get(API_URL + '/roles')
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
				.post(API_URL + '/updatecard', { ...selectedCard, role_id: selectedRole.role_id })
				.then((res: AxiosResponse) => {
					if (res.status >= 200 && res.status <= 226) {
						const { status, message } = res.data;
						if (status === 'updated') {
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
							showNotification(message);
						} else if (status === 'update_exists' || status === 'update_error') {
							hideEditCard();
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
				<ModalHeader title='ბარათის რედაქტირება' onHide={hideEditCard} />
				<ModalBody>
					<div className='flex justify-center'>
						<input type='text' placeholder='ბარათის ნომერი' className='py-2 px-3 outline-none rounded-lg border border-slate-300 w-8/12' value={selectedCard.card_uid} onChange={handleChangeCard} />
						<div className='relative ms-5'>
							<div className='px-4 py-2 border border-green-400 hover:bg-green-400 text-slate-600 hover:text-white rounded-lg text-lg cursor-pointer duration-300' onClick={toggleSelectRole}>
								{selectedRole?.role_name_description}
							</div>
							{dropdownRole && (
								<div className='flex flex-col absolute z-10 bg-white shadow-md top-[110%] rounded-md'>
									{roles.map((role, i: number) => {
										return (
											<div key={i} className='flex items-center px-4 py-2 hover:bg-slate-100' onClick={() => handleSelectRole(role)}>
												{role.role_name_description}
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<button className='py-1 px-3 bg-green-500 hover:bg-green-400 active:bg-green-600 text-white rounded-md' onClick={updateCard}>
						განახლება
					</button>
				</ModalFooter>
			</Modal>
		</ModalContainer>
	);
};

export default EditCard;
