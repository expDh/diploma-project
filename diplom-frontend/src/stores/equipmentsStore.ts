import { makeAutoObservable, runInAction } from 'mobx';
import { equipmentsApi } from '../api/api';

class EquipmentsStore {
  equipments: any[] = [];
  stores: any[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEquipments() {
    this.loading = true;
    try {
      const res = await equipmentsApi.getAllEquipments();
      runInAction(() => {
        this.equipments = res.data;
      });
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchStores() {
    try {
      const res = await equipmentsApi.getAllStoresForSelect();
      runInAction(() => {
        this.stores = res.data;
      });
    } catch (e) {
      console.error(e);
    }
  }

  async createEquipment(data: any) {
    await equipmentsApi.createEquipment(data);
    await this.fetchEquipments();
  }

  async updateEquipment(id: number, data: any) {
    await equipmentsApi.updateEquipment(id, data);
    await this.fetchEquipments();
  }

  async deleteEquipment(id: number) {
    await equipmentsApi.deleteEquipment(id);
    await this.fetchEquipments();
  }

  async writeOffEquipment(id: number, quantity: number, comment?: string) {
    try {
      console.log(`→ Запрос на списание: id=${id}, qty=${quantity}`);

      await equipmentsApi.writeOffEquipment(id, quantity, comment);

      console.log('✅ Списание прошло успешно');
      await this.fetchEquipments();
      alert(`✅ Успешно списано ${quantity} шт.`);
    } catch (error: any) {
      console.error('❌ Ошибка списания:', error);

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        'Не удалось списать оборудование';

      alert(message);
    }
  }
}

const equipmentsStore = new EquipmentsStore();
export default equipmentsStore;
