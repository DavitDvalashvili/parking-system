export type ResponseStatus = {
	status: 'inserted' | 'insert_exist' | 'insert_error' | 'updated' | 'update_exists' | 'update_error' | 'deleted' | 'delete_error';
	message: string;
	insert_id?: number;
};
