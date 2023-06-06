import axios from "axios";
import axiosInstance from "./axios";

const fetcherWithRefreshToken = async (url: string) => {
    const initialResponse = await axiosInstance.get(url);
    return initialResponse.data;
};

export default fetcherWithRefreshToken;
