import axios from 'axios';
/**
 * a common interface for axios
 */

export const HTTP = axios.create({
    baseURL: `https://5ea5bcaa2d86f00016b461d1.mockapi.io/api/v1/`,
    //......... Other configs here
})