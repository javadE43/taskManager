import axios from 'axios';
// import queryString from 'query-string';

import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    // headers: {
    //     ' x-access-token':localStorage.getItem("access_token") && localStorage.getItem("access_token")
    // },
    // paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey})
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return {
            data:response.data,
            head: response.headers
        }
    }

    return response;
}, (error) => {
    throw error;
});

export default axiosClient;






