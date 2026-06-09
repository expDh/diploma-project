import { makeAutoObservable, runInAction } from 'mobx';
import { usersApi } from '../api/api';

class UsersStore {
  users: any[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    
    this.loading = true;
    try {
      const res = await usersApi.getAllUsers();
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

  async fetchResPersons() {
    this.loading = true;
    try {
      const res = await usersApi.getAllUsers();
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

  async deleteUser(id: number) {
    await usersApi.deleteUser(id);
    runInAction(() => {
      this.users = this.users.filter((u) => u.id_users !== id);
    });
  }

  async getUserById(id: number) {
    const res = await usersApi.getUserById(id);
    return res.data;
  }

  async updateUser(id: number, data: any) {
    await usersApi.updateUser(id, data);
  }
}

const usersStore = new UsersStore();
export default usersStore;
