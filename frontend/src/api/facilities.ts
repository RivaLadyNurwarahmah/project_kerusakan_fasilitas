import api from './index';

export const getFacilities = async () => {
    const response = await api.get('/facilities');
    return response.data.data;
};
export const getUrgentFacilities = async () => {
    const response = await api.get('/facilities/urgent');
    return response.data.data;
};
export const deleteFacility = async (facilityId: number) => {
    const response = await api.delete(`/facilities/${facilityId}`);
    return response.data;
};
export const createFacility = async (facilityData: any) => {
    const response = await api.post('/facilities', facilityData);
    return response.data;
};