import { JSONData } from "./misc";

export default interface User {
	username: string;
	email: string;
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
	username: string;
	email: string;
}
