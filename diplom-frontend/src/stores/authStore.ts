import { makeAutoObservable, runInAction } from 'mobx';
import { authApi } from '../api/api';

class AuthStore {
  user: any = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  async loadUser() {
    try {
      const res = await authApi.getMyProfile();
      runInAction(() => {
        this.user = res.data;
        console.log('👤 Загружен пользователь:', this.user);
        console.log('🏪 Магазины пользователя:', this.user?.userStores);
      });
    } catch {
      runInAction(() => {
        this.user = null;
      });
    }
  }

  async login(email: string, password: string) {
    try {
      await authApi.login(email, password);
      await this.loadUser();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    patronymic: string,
  ) {
    await authApi.register(email, password, firstName, lastName, patronymic);
    await this.loadUser();
  }

  async logout() {
    await authApi.logout();
    runInAction(() => {
      this.user = null;
    });
  }

  get isAuthenticated() {
    return !!this.user;
  }
}

const authStore = new AuthStore();
export default authStore;
