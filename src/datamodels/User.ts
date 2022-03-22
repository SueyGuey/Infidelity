import { JSONData } from "./misc";

export default interface User {
	userId: string;
	email: string;
	username: string;
}

export function userToData(user: User): JSONData<User> {
	return {
		...user,
	};
}

export function dataToUser(data: JSONData<User>): User {
	return {
		...data,
	};
}

export type NewUserInfo = {
	userId: string;
	email: string;
	username: string;
}
