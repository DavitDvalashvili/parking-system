import { WebSocket } from 'ws';
import { wss } from '../app';
import { createConnection } from './dbController';
import url, { URLSearchParams } from 'url';

type ExternalDeviceType = 'STM32' | 'PC';

export interface WS extends WebSocket {
	_protocol?: string;
	device_id?: string;
	card_uid?: string;
	device_type?: ExternalDeviceType;
	price: number;
	charged: number;
	uncharged: number;
	income_time: Date;
}

type RoleName = 'client' | 'employee';
type Charge = 'bill' | 'coin';
type DeviceDirection = '0' | '1';

const roleNames: RoleName[] = ['client', 'employee'];
const chargeTypes: Charge[] = ['bill', 'coin'];

type Counter = {
	counter_id: number;
	counter_name: string;
	tolerance_time: number;
	first_hours: number;
	during_3_hours: number;
	until_23_oclock: number;
	until_9_oclock: number;
	every_24_hours: number;
};

type ParkingPrice = {
	accounting_id: number;
	dispenser_device_id: string;
	collector_device_id: string;
	card_id: number;
	card_uid: string;
	income_time: Date;
	outcome_time: Date;
	counter: Counter;
};

export const Sockets = new Set<WS>();

const WebSocketController = () => {
	console.log('Websocket is ready');

	wss.on('connection', async (socket: WS, req) => {
		console.log('New device has been connected.');
		console.log(socket._protocol);

		socket.price = 0;
		socket.charged = 0;
		socket.uncharged = 0;
		socket.card_uid = '';
		socket.income_time = new Date();

		const urlParams = Object.fromEntries(new URLSearchParams(url.parse(req.url as string).query as string).entries());
		console.log(urlParams);

		if (urlParams.id && urlParams.t === undefined) {
			socket.device_id = urlParams.id;
			socket.device_type = 'PC';
			socket.send(JSON.stringify({ greeting: 'HELLO' }));
		} else {
			// socket.device_id = socket._protocol;
			socket.device_id = urlParams.id;
			socket.device_type = 'STM32';
			sendFirstParametersToExternalDevice(socket);
		}

		Sockets.add(socket);

		socket.on('message', async (data: Buffer) => {
			console.log(socket.device_id);

			const [card_uid, status, direction] = data.toString().split('|');
			console.log(data.toString(), card_uid, status, direction, 'THIS IS MESSAGE');

			if (status === 'access') {
				await openEntranseGate(socket, card_uid);
			} else if (roleNames.includes(status as RoleName) && (direction as DeviceDirection) === '0') {
				checkEntranceCard(socket, card_uid, status);
			} else if (roleNames.includes(status as RoleName) && (direction as DeviceDirection) === '1') {
				checkExitCard(socket, card_uid, <RoleName>status);
			} else if (status && chargeTypes.includes(status.split(':')[0] as Charge)) {
				let [chargeType, money] = status.split(':').map((x, i) => (i === 1 ? parseInt(x) : x)) as [Charge, number];
				money = chargeType === 'bill' ? money * 100 : money;

				if (socket.charged + money >= socket.price) {
					await finishExitProcedure(socket);
					Sockets.forEach(async (client: WS) => {
						if (client.device_id === socket.device_id) {
							const change = ((socket.charged + money) % socket.price) / 100;
							if (client.device_type === 'PC') {
								client.send(
									JSON.stringify({
										status: 'finished-charging',
										change: change,
										price: socket.price / 100,
									}),
								);
							} else {
								client.send('open');
							}
						}
					});
				} else {
					socket.charged += money;
					socket.uncharged -= money;
					Sockets.forEach((client: WS) => {
						if (client.device_id === socket.device_id && client.device_type === 'PC') {
							client.send(
								JSON.stringify({
									status: 'update-price',
									price: socket.price / 100,
									charged: socket.charged / 100,
									uncharged: socket.uncharged / 100,
									income_time: socket.income_time,
								}),
							);
						}
					});
				}
			}
		});

		socket.on('close', () => {
			Sockets.forEach((_socket) => {
				if (_socket.device_id === socket.device_id && socket.device_type === _socket.device_type) {
					Sockets.delete(_socket);
				}
			});
			socket.terminate();
			console.log('device disconnected');
		});

		socket.on('error', (err) => {
			console.log(err);
			Sockets.forEach((_socket) => {
				if (_socket.device_id === socket.device_id && socket.device_type === _socket.device_type) {
					Sockets.delete(_socket);
				}
			});
			socket.terminate();
		});
	});
};

const sendFirstParametersToExternalDevice = async (socket: WS) => {
	let conn;

	try {
		conn = await createConnection();

		await conn.query(`SELECT client_mode, employee_mode FROM devices WHERE external_device_id = ?`, [socket._protocol]).then((resp) => {
			if (resp[0]) {
				setTimeout(() => {
					socket.send(`client:${resp[0].client_mode}|employee:${resp[0].employee_mode}`);
				}, 1000);
			}
		});
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};

const openEntranseGate = async (socket: WS, card_uid: string) => {
	let conn;

	try {
		conn = await createConnection();
		await conn
			.query(
				`
			INSERT INTO
			accounting(dispenser_device_id, card_uid, income_time)
			VALUES(?, ?, NOW())	
		`,
				[socket.device_id, card_uid],
			)
			.then((resp) => {
				console.log(resp.insertId);
			});
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}

	socket.send('open');
};

const checkEntranceCard = async (socket: WS, card_uid: string, role_name: string) => {
	let conn;

	try {
		conn = await createConnection();

		await conn
			.query(
				`
					SELECT c.card_uid, r.role_name
					FROM cards c
					JOIN roles r ON c.role_id = r.role_id
					WHERE c.card_uid = ? AND r.role_name = ?
				`,
				[card_uid, role_name],
			)
			.then((resp) => {
				if (!resp[0]) {
					socket.send('deny');
				} else {
					socket.send('allow');
				}
			});
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};

const checkExitCard = async (socket: WS, card_uid: string, _role_name: RoleName) => {
	let conn;

	try {
		conn = await createConnection();
		const client = await conn.query(
			`
			SELECT c.card_id, c.card_uid,
			r.role_id, r.role_name, r.role_priority
			FROM cards c
			JOIN roles r ON r.role_id = c.role_id
			JOIN accounting acc ON c.card_uid = acc.card_uid
			WHERE c.card_uid = ? AND acc.outcome_time IS NULL
		`,
			[card_uid],
		);

		if (client[0]) {
			const { card_uid, role_name } = client[0];
			socket.card_uid = card_uid;
			console.log(client[0]);

			if ((role_name as RoleName) === 'client' && role_name === _role_name) {
				const { price, income_time } = await calculatePrice(socket, card_uid);
				socket.price = Number(price) * 100;
				socket.charged = 0;
				socket.uncharged = Number(price) * 100;
				socket.income_time = income_time;
				socket.send(price);
				Sockets.forEach((client: WS) => {
					if (client.device_id === socket.device_id && client.device_type === 'PC') {
						client.send(
							JSON.stringify({
								status: 'charge',
								price: price,
								charged: socket.charged / 100,
								uncharged: socket.uncharged / 100,
								income_time: socket.income_time,
							}),
						);
					}
				});
			} else if ((role_name as RoleName) === 'employee' && role_name === _role_name) {
				socket.send('open');
				await conn.query(`UPDATE accounting SET collector_device_id = ?, outcome_time = NOW() WHERE card_uid = ?`, [socket.device_id, card_uid]);
			} else {
				socket.send('deny');
			}
		} else {
			socket.send('deny');
		}
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};

const finishExitProcedure = async (socket: WS) => {
	let conn;

	try {
		conn = await createConnection();

		await conn.query(`UPDATE accounting SET collector_device_id = ?, outcome_time = NOW(), price = ? WHERE card_uid = ?`, [socket.device_id, socket.price / 100, socket.card_uid]);
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};

export const calculatePrice = async (socket: WS, card_uid: string): Promise<{ price: number; income_time: Date }> => {
	let conn;
	let T = 10;
	let price = 0;
	let income_time: Date = new Date();
	const startTime = 9;
	const endTime = 23;

	try {
		conn = await createConnection();

		const client: ParkingPrice[] = await conn.query(
			`
			SELECT acc.accounting_id, acc.dispenser_device_id, acc.collector_device_id, acc.income_time, acc.outcome_time,
			c.card_uid, c.card_id,
			(
				SELECT JSON_OBJECT(
					'counter_id', ct.counter_id,
					'counter_name', ct.counter_name,
					'tolerance_time', ct.tolerance_time,
					'first_hours', ct.first_hours,
					'during_3_hours', ct.during_3_hours,
					'until_23_oclock', ct.until_23_oclock,
					'until_9_oclock', ct.until_9_oclock,
					'every_24_hours', ct.every_24_hours
				)
				FROM counters ct
				JOIN devices d ON ct.counter_id = d.counter_id
				WHERE d.external_device_id = ?
			) AS counter
			FROM accounting acc
			JOIN cards c ON acc.card_uid = c.card_uid
			WHERE c.card_uid = ?
		`,
			[socket.device_id, card_uid],
		);

		console.log(client, socket.device_id, card_uid);

		if (client[0]) {
			income_time = client[0].income_time;
			const { tolerance_time, first_hours, during_3_hours, every_24_hours } = client[0].counter;
			const _incomeTimeUNIX = new Date(income_time).getTime();
			const _outcomeTimeUNIX = new Date().getTime();

			const _timeDecimal = (_outcomeTimeUNIX - _incomeTimeUNIX) / 1000 / 60 / 60;
			const _dayDecimal = Math.floor(_timeDecimal / 24);

			if (_timeDecimal > tolerance_time / 60) {
				const incomeTime = convertToDecimalTime(income_time);
				let incomeTimeInc = incomeTime;
				const outcomeTime = incomeTime + (_timeDecimal % 24);

				const timesDay = [
					{
						t: 1,
						p: first_hours,
					},
					{
						t: 3,
						p: during_3_hours,
					},
				];

				if (incomeTime % 23 >= startTime) {
					for (let i = 0; i < timesDay.length; i++) {
						if (incomeTimeInc <= outcomeTime) {
							incomeTimeInc += timesDay[i].t;
							price += timesDay[i].p;
							if (incomeTimeInc > endTime) T -= incomeTimeInc - endTime;
						}
					}
					if (incomeTimeInc <= outcomeTime && outcomeTime % 24 <= endTime && incomeTimeInc < endTime) {
						incomeTimeInc += endTime - incomeTimeInc;
						price += 2;
					}
					if (outcomeTime >= endTime) {
						incomeTimeInc += T;
						price += 3;

						if (outcomeTime % 24 >= startTime && incomeTimeInc <= outcomeTime) {
							for (let i = 0; i < timesDay.length; i++) {
								if (incomeTimeInc <= outcomeTime) {
									incomeTimeInc += timesDay[i].t;
									price += timesDay[i].p;
								}
							}
							if (incomeTimeInc <= outcomeTime && outcomeTime % 24 <= endTime) {
								price += 2;
							}
						}
					}
				}

				if (incomeTime % 23 < startTime) {
					if (outcomeTime > startTime) {
						incomeTimeInc += startTime - incomeTime;

						for (let i = 0; i < timesDay.length; i++) {
							if (incomeTimeInc <= outcomeTime) {
								incomeTimeInc += timesDay[i].t;
								price += timesDay[i].p;
								if (incomeTimeInc > endTime) T -= incomeTimeInc - endTime;
							}
						}
						if (incomeTimeInc <= outcomeTime && outcomeTime % 24 <= endTime && incomeTimeInc < endTime) {
							incomeTimeInc += endTime - incomeTimeInc;
							price += 2;
						}
						if (outcomeTime >= endTime) {
							incomeTimeInc += T;
							price += 3;
						}
					} else {
						incomeTimeInc = outcomeTime;
					}
					price += 3;
				}

				price += _dayDecimal * every_24_hours;
			}
		}
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}

	return { price, income_time };
};

const convertToDecimalTime = (_datetime: Date): number => {
	let timeArray: string[] = [...new Date(_datetime).toLocaleTimeString('it-IT').split(':')];
	const timeInt: number = Number(timeArray[0]) + Number(timeArray[1]) / 60 + Number(timeArray[2]) / 60 / 60;
	return timeInt;
};

function logResult(time1: number, price1: number, outcome: number, T: number) {
	console.log(`time inc.: ${time1}\nprice Sum: ${price1}\noutcome: ${outcome}\noutcome Mod.: ${outcome % 24}\nNight Time Inc.: ${T}`);
}

export default WebSocketController;
