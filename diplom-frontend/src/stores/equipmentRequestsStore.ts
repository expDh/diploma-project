import { makeAutoObservable, runInAction } from 'mobx';
import { equipmentRequestsApi } from '@/api/api';
import { AdminEquipmentRequest } from '@/types/requests';

export class EquipmentRequestsStore {
  requests: AdminEquipmentRequest[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (value: boolean) => {
    this.loading = value;
  };

  fetchRequests = async () => {
    this.setLoading(true);

    try {
      const { data } = await equipmentRequestsApi.getAllRequests();
      console.log('📡 Ответ от API /equipment-requests:', data);
      runInAction(() => {
        this.requests = data;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  createRequest = async (payload: any) => {
    const { data } = await equipmentRequestsApi.createRequest(payload);

    runInAction(() => {
      this.requests.unshift(data);
    });

    return data;
  };

  updateStatus = async (id: number, status: string, comment?: string) => {
    try {
      const { data } = await equipmentRequestsApi.updateRequestStatus(id, {
        status,
        comment,
      });
      console.log('PATCH RESPONSE', data);
      runInAction(() => {
        const index = this.requests.findIndex((r) => r.id === id);
        if (index !== -1) this.requests[index] = data;
      });

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

const equipmentRequestsStore = new EquipmentRequestsStore();
export default equipmentRequestsStore;

// import { makeAutoObservable, runInAction } from 'mobx';
// import { equipmentRequestsApi } from '@/api/api';
// import { AdminEquipmentRequest, EquipmentRequest } from '@/types/requests';

// type CreateRequestPayload = {
//   storeId: number;
//   type: 'REPAIR' | 'PURCHASE';
//   equipmentId?: number;
//   quantity?: number;
//   comment?: string;
// };

// export class EquipmentRequestsStore {
// //   requests: EquipmentRequest[] = [];
//   requests: AdminEquipmentRequest[] = [];
//   loading = false;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   setLoading(value: boolean) {
//     this.loading = value;
//   }

//   async fetchRequests() {
//     this.setLoading(true);

//     try {
//       const { data } = await equipmentRequestsApi.getAllRequests();

//       runInAction(() => {
//         this.requests = data;
//       });
//     } finally {
//       runInAction(() => {
//         this.loading = false;
//       });
//     }
//   }

//   async createRequest(payload: CreateRequestPayload) {
//     const { data } = await equipmentRequestsApi.createRequest(payload);

//     runInAction(() => {
//       this.requests.unshift(data);
//     });

//     return data;
//   }

//   async updateStatus(id: number, status: string, comment?: string) {
//     try {
//       const { data } = await equipmentRequestsApi.updateRequestStatus(id, {
//         status,
//         comment,
//       });

//       runInAction(() => {
//         const index = this.requests.findIndex(r => r.id === id);
//         if (index !== -1) this.requests[index] = data;
//       });

//       return data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// }

// const equipmentRequestsStore = new EquipmentRequestsStore();
// export default equipmentRequestsStore;
