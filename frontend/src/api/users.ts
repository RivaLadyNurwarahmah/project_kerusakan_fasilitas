import api from './index';

export const getAllUsers = async () => {
    const response = await api.get('/user');
    return response.data.data;
};

export const createUser = async (userData: any) => {
    const response = await api.post('/user/create', userData);
    return response.data;
};

export const updateUser = async (userId: number, userData: any) => {
    const response = await api.put(`/user/${userId}`, userData);
    return response.data;
};

export const deleteUser = async (userId: number) => {
    const response = await api.delete(`/user/${userId}`);
    return response.data;
};
export const getTeknisi = async () => {
    const response = await api.get('/user/teknisi');
    return response.data.data;
};