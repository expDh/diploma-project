// src/stores/authStore.js
import { makeAutoObservable, runInAction } from 'mobx';
import axiosInstance from '../api/axiosInstance';

class AuthStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  async loadUser() {
    try {
      const res = await axiosInstance.get('/users/myProfile');
      runInAction(() => { this.user = res.data; });
    } catch (err) {
      runInAction(() => { this.user = null; });
    }
  }

  async login(email, password) {
    await axiosInstance.post('/auth/login', { email, password });
    await this.loadUser(); // загрузка пользователя после успешного логина
  }

  async register(email, password, firstName, lastName,patronymic) {
    await axiosInstance.post('/auth/register', { email, password,firstName, lastName,patronymic });
    await this.loadUser(); // загрузка пользователя после регистрации
  }

  async logout() {
    await axiosInstance.post('/auth/logout'); // сервер очистит куки
    runInAction(() => { this.user = null; });
  }

  get isAuthenticated() {
    return !!this.user;
  }
}


const authStore = new AuthStore();
export default authStore;
