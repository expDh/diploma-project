import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:4200',
  // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://217.198.6.94',
  // baseURL: '//217.198.6.94',
  // baseURL: 'https://diploma-inventory.ru/api',
  // baseURL: '/api',
  // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4200',
  // baseURL: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4200') + '/api',
  baseURL: '/api',
  withCredentials: true,
  
});
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;

export const authApi = {
  getMyProfile: () =>
    axiosInstance.get('/users/myProfile', {
      params: { include: 'userStores.store' },
    }),
  login: (email: string, password: string) =>
    axiosInstance.post('/auth/login', { email, password }),
  register: (
    email: string,
    phoneNumber: string,
    password: string,
    firstName: string,
    lastName: string,
    patronymic: string,
  ) =>
    axiosInstance.post('/auth/register', {
      email,
      phoneNumber,
      password,
      firstName,
      lastName,
      patronymic,
    }),
  logout: () => axiosInstance.post('/auth/logout'),
};

export const usersApi = {
  getAllUsers: () => axiosInstance.get('/users/getAllUsers'),
  deleteUser: (id: number) => axiosInstance.delete(`/users/${id}`),
  getUserById: (id: number) => axiosInstance.get(`/users/${id}`),
  updateUser: (id: number, data: any) => axiosInstance.patch(`/users/updateUser/${id}`, data),
};

export const equipmentRequestsApi = {
  createRequest: (data: any) =>
    axiosInstance.post('/equipment-requests', data),
  // getAllRequests: () => axiosInstance.get('/equipment-requests'),
  getAllRequests: () =>
  axiosInstance.get('/equipment-requests').then(res => {
    console.log('RAW RESPONSE:', res);
    return res;
  }),
  updateRequestStatus: (
    id: number,
    data: {
      status: string;
      comment?: string;
    },
  ) => axiosInstance.patch(`/equipment-requests/${id}/status`, data),
};

export const movementsApi = {
  getAllMovements: (params?: {
    storeId?: number;
    equipmentId?: number;
    startDate?: string;
    endDate?: string;
  }) => {
    const query = new URLSearchParams();
    if (params?.storeId) query.append('storeId', params.storeId.toString());
    if (params?.equipmentId) query.append('equipmentId', params.equipmentId.toString());
    if (params?.startDate) query.append('startDate', params.startDate);
    if (params?.endDate) query.append('endDate', params.endDate);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return axiosInstance.get(`/equipments/movements${queryString}`);
  },

  getEquipmentMovements: (equipmentId: number) =>
    axiosInstance.get(`/equipments/${equipmentId}/movements`),

  getCurrentCount: (equipmentId: number) => axiosInstance.get(`/equipments/${equipmentId}/count`),
};
export const resPersonsApi = {
  getAllResPersons: () => axiosInstance.get('/users/getAllResPersons'),
  getFreeResPersons: () => axiosInstance.get('/users/free-responsibles'),
};

export const equipmentsApi = {
  getAllEquipments: () => axiosInstance.get('equipments'),
  getAllStoresForSelect: () => axiosInstance.get('/equipments/stores'),
  createEquipment: (data: any) => axiosInstance.post('/equipments', data),
  updateEquipment: (id: number, data: any) => axiosInstance.patch(`/equipments/${id}`, data),
  deleteEquipment: (id: number) => axiosInstance.delete(`/equipments/${id}`),
  writeOffEquipment: (id: number, quantity: number, comment?: string) =>
    axiosInstance.delete(`/equipments/${id}/writeoff`, {
      data: { quantity, comment },
    }),
};

export const storesApi = {
  getAllStores: () => axiosInstance.get('/stores/getAllStores'),
  updateStoreWithResponsible: (id: number, data: any) =>
    axiosInstance.patch(`/stores/updateStoreWithResponsible/${id}`, data),
  createStore: (address: string) => axiosInstance.post('/stores/createStore', { address }),
  updateStore: (id: number, address: string) =>
    axiosInstance.patch(`/stores/updateStore/${id}`, { address }),
  deleteStore: (id: number) => axiosInstance.delete(`/stores/deleteStore/${id}`),
};

export const inventoryApi = {
  createInventory: (data: { storeId: number; comment?: string }) =>
    axiosInstance.post('/inventory', data),

  getAllInventories: () => axiosInstance.get('/inventory'),

  getInventoryById: (id: number) => axiosInstance.get(`/inventory/${id}`),

  updateInventoryItem: (
    inventoryId: number,
    itemId: number,
    data: {
      countFact: number;
      comment?: string;
    },
  ) => axiosInstance.patch(`/inventory/${inventoryId}/items/${itemId}`, data),

  finishInventory: (id: number) => axiosInstance.post(`/inventory/${id}/finish`),
};
