import { makeAutoObservable, runInAction } from 'mobx';
import { resPersonsApi } from '../api/api';

class ResPersonsStore {
  resPersons: any[] = [];
  freeResPersons: any[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchResPersons() {
    this.loading = true;
    try {
      const res = await resPersonsApi.getAllResPersons();
      runInAction(() => {
        this.resPersons = res.data || [];
      });
      console.log('Все ответственные загружены:', res.data);
    } catch (e) {
      console.error('Ошибка fetchResPersons:', e);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchFreeResPersons() {
    this.loading = true;
    try {
      const res = await resPersonsApi.getFreeResPersons();
      runInAction(() => {
        this.freeResPersons = res.data || [];
      });
      console.log('Свободные ответственные загружены:', this.freeResPersons);
    } catch (e) {
      console.error('Ошибка fetchFreeResPersons:', e);
      runInAction(() => {
        this.freeResPersons = [];
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const resPersonsStore = new ResPersonsStore();
export default resPersonsStore;
