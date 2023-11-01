import Repository from "./Repository"

const resource = '/search/users'

export interface userSearchRequestPayload {
	q: string,
	per_page?: number
}

export interface IUser {
	id: number;
	login: string
}

export default {
	async getUsers(params: userSearchRequestPayload): Promise<IUser[]> {
		const response = await Repository.get(`${resource}`, { params });
		console.log(response.data.items)
		const items = response.data.items.map((user: any) => ({ id: user.id, login: user.login }));
		return items;
	}
}
