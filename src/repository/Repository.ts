import axios, { AxiosInstance } from "axios";

const baseDomain = 'https://api.github.com/';

const Repository: AxiosInstance = axios.create({
	baseURL: baseDomain,
	headers: {
		"Content-type": "application/json",
	},
});

export default Repository;
