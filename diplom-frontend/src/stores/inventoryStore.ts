import { makeAutoObservable, runInAction } from 'mobx';
import { inventoryApi } from '../api/api';

export interface InventoryItem {
  id: number;
  equipment_id: number;
  count_system: number;
  count_fact: number | null;
  status_fact?: string;
  comment?: string;

  equipment?: {
    id_equipment: number;
    name: string;
    model: string;
    count: number;
    status: string;
  };
}

export interface Inventory {
  id_inventory: number;
  store_id: number;
  created_by: number;
  inventory_date: string;
  status: string;
  comment?: string;

  store?: {
    id_store: number;
    address: string;
  };

  creator?: {
    firstName: string;
    lastName: string;
  };

  inventoryItems?: InventoryItem[];
}

class InventoryStore {
  inventories: Inventory[] = [];
  currentInventory: Inventory | null = null;

  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchInventories() {
    this.loading = true;
    this.error = null;

    try {
      const response = await inventoryApi.getAllInventories();

      runInAction(() => {
        this.inventories = response.data;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.response?.data?.message || 'Ошибка загрузки актов';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchInventoryById(id: number) {
    this.loading = true;
    this.error = null;

    try {
      const response = await inventoryApi.getInventoryById(id);

      runInAction(() => {
        this.currentInventory = response.data;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.response?.data?.message || 'Ошибка загрузки акта';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async createInventory(storeId: number, comment?: string) {
    this.loading = true;
    this.error = null;

    try {
      const response = await inventoryApi.createInventory({
        storeId,
        comment,
      });

      runInAction(() => {
        this.inventories.unshift(response.data);
      });

      return response.data;
    } catch (e: any) {
      runInAction(() => {
        this.error = e.response?.data?.message || 'Ошибка создания акта';
      });

      throw e;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async updateInventoryItem(
    inventoryId: number,
    itemId: number,
    countFact: number,
    comment?: string,
  ) {
    this.loading = true;
    this.error = null;

    try {
      const response = await inventoryApi.updateInventoryItem(inventoryId, itemId, {
        countFact,
        comment,
      });

      runInAction(() => {
        if (!this.currentInventory?.inventoryItems) return;

        const index = this.currentInventory.inventoryItems.findIndex((x) => x.id === itemId);

        if (index !== -1) {
          this.currentInventory.inventoryItems[index] = response.data;
        }
      });

      return response.data;
    } catch (e: any) {
      runInAction(() => {
        this.error = e.response?.data?.message || 'Ошибка обновления строки инвентаризации';
      });

      throw e;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async finishInventory(id: number) {
    this.loading = true;
    this.error = null;

    try {
      const response = await inventoryApi.finishInventory(id);

      runInAction(() => {
        if (this.currentInventory) {
          this.currentInventory.status = 'Проведена';
        }

        const inventory = this.inventories.find((x) => x.id_inventory === id);

        if (inventory) {
          inventory.status = 'Проведена';
        }
      });

      return response.data;
    } catch (e: any) {
      runInAction(() => {
        this.error = e.response?.data?.message || 'Ошибка проведения инвентаризации';
      });

      throw e;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  clearCurrentInventory() {
    this.currentInventory = null;
  }
}

const inventoryStore = new InventoryStore();

export default inventoryStore;
