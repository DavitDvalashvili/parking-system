import { Request, Response } from 'express';
import { createConnection } from './dbController';
import { ResponseStatus } from './types';
import { Sockets, WS } from './WebSocketController';

type DeviceTypesTypes = 'card_receiver' | 'card_giver';

type DeviceType = {
	devicetype_id: number;
	devicetype_name: string;
	devicetype_type: DeviceTypesTypes;
};

type DeviceInfo = {
	device_id?: number;
	external_device_id: number | string;
	device_name: string;
	device_subsidiary_money_amount: string | number;
	device_cards_to_give_quantity: string | number;
	device_cards_received_quantity: string | number;
	device_cards_busy_quantity: string | number;
	device_cards_problematic_quantity: string | number;
	has_subsidiary_money_receiver: boolean;
	has_cash_receiver: boolean;
	has_debit_card_transaction: boolean;
	has_monitor: boolean;
	device_type: DeviceType;
	enabled: boolean;
	client_allowed: boolean;
	employee_allowed: boolean;
	standard_mode: boolean;
};

type SwitchType = {
	device_id: number | string;
	external_device_id: number | string;
	client_mode: string | number;
	employee_mode: string | number;
};

export const getDeviceTypes = async (req: Request, res: Response): Promise<void> => {
	let conn;

	try {
		if (req.session.Auth) {
			conn = await createConnection();

			await conn
				.query(`SELECT * FROM devicetypes`)
				.then((resp: DeviceType[]) => {
					res.send(resp);
				})
				.catch((err) => {
					console.log(err.toString());
					res.send(false);
				});
		}
	} catch (err) {
		console.log(err);
		res.send(false);
	} finally {
		if (conn) conn.release();
	}
};

export const addNewDevice = async (req: Request, res: Response): Promise<void> => {
	let conn;

	try {
		if (req.session.Auth) {
			conn = await createConnection();
			const { device_name, device_subsidiary_money_amount, device_cards_to_give_quantity, has_subsidiary_money_receiver, has_cash_receiver, has_debit_card_transaction, has_monitor, device_type } = <DeviceInfo>req.body;
			const deviceInfo = [device_name, device_subsidiary_money_amount || 0, device_cards_to_give_quantity || 0, has_subsidiary_money_receiver, has_cash_receiver, has_debit_card_transaction, has_monitor, device_type.devicetype_id];

			const device = await conn.query(
				`
                INSERT INTO devices
                    (
                        device_name, device_subsidiary_money_amount, device_cards_to_give_quantity,
                        has_subsidiary_money_receiver, has_cash_receiver, has_debit_card_transaction,
                        has_monitor, devicetype_id, enabled
                    ) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
                `,
				[...deviceInfo],
			);
			res.send({ device_id: device.insertId });
		} else {
			res.send(false);
		}
	} catch (err) {
		console.log(err);
		res.send(false);
	} finally {
		if (conn) conn.release();
	}
};

export const getDevices = async (req: Request, res: Response): Promise<void> => {
	let conn;

	try {
		if (req.session.Auth) {
			conn = await createConnection();

			const devices = await conn.query(`
                SELECT
                    d.device_id, d.counter_id, d.external_device_id, d.device_name, d.device_subsidiary_money_amount, 
					d.device_cards_to_give_quantity, d.device_cards_busy_quantity, d.device_cards_problematic_quantity,
                    d.device_cards_received_quantity, d.has_monitor, d.has_cash_receiver, d.has_subsidiary_money_receiver,
                    d.has_debit_card_transaction, d.client_mode, d.employee_mode,
                    JSON_OBJECT(
                        'devicetype_id', dt.devicetype_id,
                        'devicetype_name', dt.devicetype_name,
                        'devicetype_type', dt.devicetype_type 
                    ) as device_type
                    FROM devices d
                    JOIN devicetypes dt ON d.devicetype_id = dt.devicetype_id
            `);

			res.send(devices);
		}
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};

export const switchDevice = async (req: Request, res: Response): Promise<void> => {
	let conn;

	if (req.session.Auth) {
		try {
			conn = await createConnection();

			const { device_id, external_device_id, client_mode, employee_mode } = <SwitchType>req.body;

			await conn.query(`UPDATE devices SET client_mode = ?, employee_mode = ? WHERE device_id = ?`, [client_mode, employee_mode, device_id]).then(() => {
				Sockets.forEach((client: WS) => {
					if (client._protocol == external_device_id) {
						client.send(`client:${client_mode}|employee:${employee_mode}`);
					}
				});
			});

			res.send(true);
		} catch (err) {
			console.log(err);
		} finally {
			if (conn) conn.release();
		}
	}
};

export const editDevice = async (req: Request, res: Response): Promise<void> => {
	let conn;

	if (req.session.Auth) {
		try {
			conn = await createConnection();
			const { device_id, device_name, external_device_id, device_subsidiary_money_amount, device_cards_to_give_quantity, has_subsidiary_money_receiver, has_cash_receiver, has_debit_card_transaction, has_monitor } = <DeviceInfo>req.body;
			const deviceInfo = [device_name, external_device_id || null, device_subsidiary_money_amount, device_cards_to_give_quantity, has_subsidiary_money_receiver, has_cash_receiver, has_debit_card_transaction, has_monitor, device_id];

			let message: ResponseStatus;

			await conn
				.query(
					`
				UPDATE devices SET 
					device_name = ?, external_device_id = ?, device_subsidiary_money_amount = ?, device_cards_to_give_quantity = ?,
					has_subsidiary_money_receiver = ?, has_cash_receiver = ?, has_debit_card_transaction = ?, has_monitor = ?
				WHERE device_id = ?
			`,
					[...deviceInfo],
				)
				.then(() => {
					message = {
						status: 'updated',
						message: 'მოწყობილობა წარმატებით განახლდა',
					};
					res.send(message);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		} finally {
			if (conn) conn.end();
		}
	} else {
		res.send(false);
	}
};

export const removeDevice = async (req: Request, res: Response): Promise<void> => {
	let conn;

	if (req.session.Auth) {
		try {
			conn = await createConnection();
			const { device_id } = req.params;
			let message: ResponseStatus;
			await conn
				.query(`DELETE FROM devices WHERE device_id = ?`, [device_id])
				.then(() => {
					message = {
						status: 'deleted',
						message: 'მოწყობილობა წარმატებით წაიშალა',
					};
					res.send(message);
				})
				.catch((err) => {
					message = {
						status: 'delete_error',
						message: 'დაფიქსირდა შეცდომა, სცადეთ ხელახლა',
					};
					res.send(message);
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		} finally {
			if (conn) conn.release();
		}
	} else {
		res.send(false);
	}
};

export const fitCounter = async (req: Request, res: Response): Promise<void> => {
	let conn;
	const { device_id, counter_id } = req.body;
	let status: ResponseStatus = {
		status: 'update_error',
		message: '',
	};

	try {
		conn = await createConnection();

		await conn
			.query(`UPDATE devices SET counter_id = ? WHERE device_id = ?`, [counter_id, device_id])
			.then(() => {
				status = {
					status: 'updated',
					message: 'მრიცხველის მორგება დასრულდა წარმატებით',
				};
				res.send(status);
			})
			.catch((err) => {
				status = {
					status: 'update_error',
					message: 'დაფიქსირდა შეცდომა, სცადეთ ხელახლა',
				};
				res.send(status);
				console.log(err?.toString());
			});
	} catch (err) {
		console.log(err?.toString());
	} finally {
		if (conn) conn.release();
	}
};
