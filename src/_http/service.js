import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL_API;


export default function httpRequest(
    {
        url,
        method = 'get',
        headers,
        data,
        params,
    },
    accessToken = null,
) {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;

    if (accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    return axios.request({
        url,
        method,
        ...headers,
        data,
        params,
        // withCredentials: true,
    });
}
