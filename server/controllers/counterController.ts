import { Request, Response } from 'express';
import { createConnection } from './dbController';
import { ResponseStatus } from './types';

type Variant1 = {
	counter_name: string;
	tolerance_time: number | string;
	first_hours: number | string;
	during_3_hours: number | string;
	until_23_oclock: number | string
	until_9_oclock: number | string;
	every_24_hours: number | string
};

export const addNewCounter = async (req: Request, res: Response) => {
	let conn;
	const requestBody = req.body as Variant1;
	const variant1: Variant1 = {
		counter_name: requestBody.counter_name,
		tolerance_time: requestBody.tolerance_time,
		first_hours: requestBody.first_hours,
		during_3_hours: requestBody.during_3_hours,
		until_23_oclock: requestBody.until_23_oclock,
		until_9_oclock: requestBody.until_9_oclock,
		every_24_hours: requestBody.every_24_hours,
	};

	try {
		if (req.session.Auth) {
			conn = await createConnection();
			let status: ResponseStatus = {
				status: 'insert_error',
				message: '',
			};

			await conn
				.query(
					`
            INSERT INTO counters (counter_name, tolerance_time, first_hours, during_3_hours, until_23_oclock, until_9_oclock, every_24_hours)
            VALUES (?, ?, ?, ?, ?, ?, ?)    
        `,
					[variant1.counter_name, variant1.tolerance_time, variant1.first_hours, variant1.during_3_hours, variant1.until_23_oclock, variant1.until_9_oclock, variant1.every_24_hours],
				)
				.then((resp) => {
					if (resp.insertId !== 0) {
						status = {
							status: 'inserted',
							message: 'მრიცხველი წარმატებით დაემატა',
							insert_id: resp.insertId as number,
						};
					}
				})
				.catch((err) => {
					status = {
						status: 'insert_error',
						message: 'მრიცხველის დამატება ვერ მოხერხდა, სცადეთ ხელახლა',
					};
					console.log(err.toString());
				});
			res.send(status);
		}
	} catch (err) {
		res.send(false);
	} finally {
		if (conn) conn.release();
	}
};

export const getCounters = async (req: Request, res: Response) => {
	let conn;

	try {
		conn = await createConnection();
		const counters: Variant1[] = await conn.query(`SELECT * FROM counters`);

		res.send(counters);
	} catch (err) {
		console.log(err?.toString());
	} finally {
		if (conn) conn.release();
	}
};
