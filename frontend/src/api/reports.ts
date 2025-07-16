import api from './index';

export async function getReportStatistics() {
    const response = await api.get('/report/statistics');
    return response.data.data;
}

export async function getReportsByStatus(status: string) {
    const response = await api.get(`/report/by-status/${status}`);
    return response.data.data;
}

export async function updateReportStatus(
    reportId: number,
    status: string,
    catatan: string
) {
    const response = await api.put(`/report/${reportId}/status`, {
        status,
        catatan,
    });
    return response.data;
}
export async function getAssignedReports() {
    const response = await api.get('/report/assigned');
    return response.data.data;
}
export async function getMyReports() {
    const response = await api.get('/report/my-reports');
    return response.data.data;
}
export const getAllReports = async () => {
    const response = await api.get('/report');
    return response.data.data;
};

export const deleteReport = async (reportId: number) => {
    const response = await api.delete(`/report/${reportId}`);
    return response.data;
};

export const assignReportToTechnician = async (reportId: number, teknisiId: number) => {
    const response = await api.patch(`/report/${reportId}/assign`, { id_teknisi: teknisiId });
    return response.data;
};
export const getReportById = async (reportId: number) => {
    const response = await api.get(`/report/${reportId}`);
    return response.data.data;
};
export const createReport = async (reportData: FormData) => {
    const response = await api.post('/report', reportData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};