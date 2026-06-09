import { makeAutoObservable, runInAction } from 'mobx';
import axiosInstance from '../api/axiosInstance';

class UsersStore {
  users = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.loading = true;
    try {
      const res = await axiosInstance.get('/users/getAllUsers');
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

  async deleteUser(id) {
    await axiosInstance.delete(`/users/${id}`);
    runInAction(() => {
      this.users = this.users.filter(u => u.id_users !== id);
    });
  }

  async getUserById(id) {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data;
  }

  async updateUser(id, data) {
    await axiosInstance.patch(`/users/updateUser/${id}`, data);
  }
}

const usersStore = new UsersStore();
export default usersStore;
