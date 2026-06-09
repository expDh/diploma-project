import { makeAutoObservable, runInAction } from 'mobx';
import { movementsApi } from '../api/api';

export interface Movement {
  id: number;
  date: string;
  quantity: number;
  operation_type: string;
  comment?: string;
  equipment: {
    id_equipment: number;
    name: string;
    model?: string;
    inventory_number?: number;
  };
  store: {
    id_store: number;
    address: string;
  };
  creator: {
    id_users: number;
    firstName?: string;
    lastName?: string;
  };
}

class MovementsStore {
  movements: Movement[] = [];
  loading = false;
  selectedStoreId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAllMovements(
    params: {
      storeId?: number;
      startDate?: string;
    } = {},
  ) {
    this.loading = true;
    try {
      const res = await movementsApi.getAllMovements({
        storeId: params.storeId,
        startDate: params.startDate,
      });

      runInAction(() => {
        this.movements = res.data || [];
        this.selectedStoreId = params.storeId ?? null;
      });
    } catch (error) {
      console.error('Ошибка загрузки движений:', error);
      runInAction(() => {
        this.movements = [];
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchEquipmentMovements(equipmentId: number) {
    this.loading = true;
    try {
      const res = await movementsApi.getEquipmentMovements(equipmentId);
      runInAction(() => {
        this.movements = res.data || [];
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  setSelectedStore(storeId: number | null) {
    this.selectedStoreId = storeId;
    this.fetchAllMovements({ storeId: storeId ?? undefined });
  }
  getAuthorName(creator: any): string {
    if (!creator) return '—';

    const parts = [creator.firstName?.trim(), creator.lastName?.trim()].filter(Boolean);

    return parts.length > 0 ? parts.join(' ') : '—';
  }

  getMovementColor(quantity: number): string {
    return quantity >= 0 ? 'green' : 'red';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

const movementsStore = new MovementsStore();
export default movementsStore;
