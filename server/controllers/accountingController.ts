import { createConnection } from './dbController';
import net from 'net';

export const nextStep = async (socket: net.Socket) => {
	const res = new Uint8Array([1]);

	socket.write(res);
};
