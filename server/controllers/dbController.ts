import mariadb from 'mariadb';
import mysql from 'mysql';
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const mariadbPoolConfig: mariadb.PoolConfig = {
	host: DB_HOST,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASSWORD,
	multipleStatements: true,
	insertIdAsNumber: true,
};

const mysqlPoolConfig: mysql.PoolConfig = {
	host: DB_HOST,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASSWORD,
};

const mariadbPool: mariadb.Pool = mariadb.createPool(mariadbPoolConfig);

export const createConnection = async (): Promise<mariadb.PoolConnection> => {
	return mariadbPool
		.getConnection()
		.then((connection: mariadb.PoolConnection) => {
			return connection;
		})
		.catch((err) => {
			console.log('Error establishing a database connection', err);
			throw err;
		});
};

const mysqlPool: mysql.Pool = mysql.createPool(mysqlPoolConfig);
export const sessionStore = new MySQLStore({}, mysqlPool as any);
