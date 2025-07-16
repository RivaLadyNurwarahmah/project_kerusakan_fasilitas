import api from './index';
import Cookies from 'js-cookie';

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
        email,
        sandi: password
    });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
    Cookies.remove('token');
    Cookies.remove('userRole');
};
export const register = async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};