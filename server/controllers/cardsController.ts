import { Request, Response } from 'express';
import { createConnection } from './dbController';
import { ResponseStatus } from './types';

type card = {
	card_id: number;
	card_uid: string;
};

type Role = {
	role_id: number;
	role_name: string;
	role_name_description: string;
	role_priority: number;
};

export const addNewCard = async (req: Request, res: Response): Promise<void> => {
	let conn;
	const { card_uid, role_id } = <card & Role>req.body;
	try {
		if (req.session.Auth) {
			let status: ResponseStatus;
			conn = await createConnection();
			await conn
				.query(
					`
                INSERT INTO cards (card_uid, role_id)
                VALUES(?, ?)
                ON DUPLICATE KEY UPDATE
                card_uid = VALUES(card_uid)
            `,
					[card_uid, role_id],
				)
				.then((resp) => {
					if (resp?.insertId >= 0) {
						if (resp.insertId !== 0) {
							status = {
								status: 'inserted',
								message: 'ბარათი წარმატებით დაემატა',
								insert_id: resp.insertId as number,
							};
							res.send(status);
						} else {
							status = {
								status: 'insert_exist',
								message: 'მითითებული ბარათი უკვე არსებობს',
							};
							res.send(status);
						}
					}
				})
				.catch((err) => {
					status = {
						status: 'insert_error',
						message: 'დაფიქსირდა შეცდომა, სცადეთ ხელახლა',
					};
					res.send(status);
					console.log(err);
				});
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

export const updateCard = async (req: Request, res: Response): Promise<void> => {
	let conn;
	const { card_id, card_uid, role_id } = <card & Role>req.body;

	try {
		if (req.session.Auth) {
			conn = await createConnection();
			let status: ResponseStatus;
			const card = (await conn.query(`SELECT * FROM cards WHERE card_uid = ? AND role_id = ?`, [card_uid, role_id]))[0];
			if (card) {
				status = {
					status: 'update_exists',
					message: 'ბარათის ვერ განახლდა, მითითებული ბარათის ნომერი არსებობს',
				};
				res.send(status);
			} else {
				await conn
					.query(`UPDATE cards SET card_uid = ?, role_id = ? WHERE card_id = ?`, [card_uid, role_id, card_id])
					.then(() => {
						status = {
							status: 'updated',
							message: 'ბარათის ნომერი წარმატებით განახლდა',
						};
						res.send(status);
					})
					.catch((err) => {
						status = {
							status: 'update_error',
							message: 'დაფიქსირდა შეცდომა, სცადეთ ხელახლა',
						};
						res.send(status);
						console.log(err);
					});
			}
		} else {
			res.send(false);
		}
	} catch (err) {
		res.send(false);
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};

export const deleteCard = async (req: Request, res: Response): Promise<void> => {
	let conn;
	const { card_id } = req.params;
	try {
		if (req.session.Auth) {
			conn = await createConnection();
			let status: ResponseStatus;
			await conn
				.query(`DELETE FROM cards WHERE card_id = ?`, [card_id])
				.then(() => {
					status = {
						status: 'deleted',
						message: 'ბარათი წარმატებით წაიშალა',
					};
					res.send(status);
				})
				.catch((err) => {
					status = {
						status: 'delete_error',
						message: 'დაფიქსირდა შეცდომა, სცადეთ ხელახლა',
					};
					res.send(status);
					console.log(err);
				});
		} else {
			res.send(false);
		}
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};

export const getCards = async (req: Request, res: Response) => {
	let conn;
	try {
		if (req.session.Auth) {
			conn = await createConnection();

			const cards = await conn.query(`
				SELECT c.card_id, c.card_uid, r.role_id, r.role_name, r.role_name_description, r.role_priority
				FROM cards c
				JOIN roles r ON c.role_id = r.role_id
				ORDER BY r.role_priority DESC, -c.card_id ASC
			`);

			res.send(cards);
		} else {
			res.send(false);
		}
	} catch (err) {
		res.send(false);
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};

export const getRoles = async (req: Request, res: Response) => {
	let conn;

	try {
		conn = await createConnection();

		const roles = await conn.query(`
			SELECT * FROM roles	
		`);

		res.send(roles);
	} catch (err) {
		console.log(err);
	} finally {
		if (conn) conn.release();
	}
};
