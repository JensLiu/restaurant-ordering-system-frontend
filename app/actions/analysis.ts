import axiosInstance from "./axios"

export const getTrendingCategories = async () => {
    return (await axiosInstance.get('/api/v1/analysis/trending-categories')).data;
}

export const getPeakHours = async () => {
    return (await axiosInstance.get('/api/v1/analysis/peak-hours')).data;
}

export const getTrendingMenuItems = async () => {
    return (await axiosInstance.get('/api/v1/analysis/trending-items')).data;
}

export const getValuableCustomers = async () => {
    return (await axiosInstance.get('/api/v1/analysis/valuable-customers')).data;
}

