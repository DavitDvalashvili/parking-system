import { Request, Response } from 'express';
import { createConnection } from './dbController';

export const getHistory = async (req: Request, res: Response) => {
	let conn;

	try {
		conn = await createConnection();

		const history = await conn.query(`
            SELECT acc.card_uid, DATE_FORMAT(acc.income_time, '%Y-%m-%d %H:%i') AS income_time, DATE_FORMAT(acc.outcome_time, '%Y-%m-%d %H:%i') AS outcome_time, acc.price,
            r.role_id, r.role_name, r.role_name_description, r.role_priority
            FROM accounting acc
            JOIN cards c ON c.card_uid = acc.card_uid
            JOIN roles r ON r.role_id = c.role_id
            ORDER BY acc.outcome_time ASC, r.role_priority DESC, acc.income_time DESC
        `);

		res.send(history);
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};
