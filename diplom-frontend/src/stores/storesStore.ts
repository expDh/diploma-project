import { makeAutoObservable, runInAction } from 'mobx';
import { storesApi } from '../api/api';   

class StoresStore {
  stores: any[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

 async fetchStores() {
  this.loading = true;
  try {
    const res = await storesApi.getAllStores();
    
    console.log('Магазины от сервера (полный ответ):', JSON.stringify(res.data, null, 2));

    runInAction(() => {
      this.stores = res.data || [];
    });
  } catch (e) {
    console.error('Ошибка fetchStores:', e);
  } finally {
    runInAction(() => { this.loading = false; });
  }
}

  async createStore(address: string) {
    await storesApi.createStore(address);
    await this.fetchStores();
  }

  async updateStore(id: number, address: string) {
    await storesApi.updateStore(id, address);
    await this.fetchStores();
  }

  async deleteStore(id: number) {
    await storesApi.deleteStore(id);
    await this.fetchStores();
  }

  async updateStoreWithResponsible(id: number, data: { address: string; responsibleId: number | null }) {
    try {
      const res = await storesApi.updateStoreWithResponsible(id, data);
      console.log('Ответ сервера updateStoreWithResponsible:', res.data);
      return res.data;
    } catch (error: any) {
      console.error('Ошибка API updateStoreWithResponsible:', error.response?.data || error.message);
      throw error;
    }
  }
}

const storesStore = new StoresStore();
export default storesStore;