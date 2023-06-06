import axios from "axios";

const baseUrl = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

/**
 * Add a request interceptor to handle the refresh token
 * credit: porone at stackoverflow
 *
 */
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const { response, config } = error;
//         console.log("intercepter ");
//         console.log(error);
//         if (response.status != 401 || response.status != 403) {
//             return Promise.reject(error);
//         }
//         return axios
//             .get("/auth/refresh", { withCredentials: true, baseURL: baseUrl })
//             .then((res) => {
//                 if (res.status === 200) {
//                     return axiosInstance(config);
//                 }
//             })
//             .catch((error) => {
//                 return Promise.reject(error);
//             });
//     }
// );

export default axiosInstance;
