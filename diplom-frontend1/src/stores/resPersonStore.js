import { makeAutoObservable, runInAction } from 'mobx';
import axiosInstance from '../api/axiosInstance';

class ResPersonStore {
  users = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.loading = true;
    try {
      const res = await axiosInstance.get('/admin/getAllResPerson');
      runInAction(() => {
        this.users = res.data;
      });
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  
}

const resPersonStore = new ResPersonStore();
export default resPersonStore;
