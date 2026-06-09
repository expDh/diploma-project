import { makeAutoObservable, runInAction } from "mobx";

// import { axiosInstance } from "../api/axiosInstance"; // твой pre-configured axios
// если нет, можно просто import axios from "axios";
import axiosInstance from '../api/axiosInstance';

// export interface User {
//   id: number;
//   name: string;
//   email: string;
// }

export interface ResPerson {
  id: number;
  email:string;
  firstName:string;
  lastName:string;
  patronymic:string;
  role:string;
  position:string;
  address:string;
  
}

export interface Responsible {
  id_users: number;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  position: string;
}

export interface Equipment {
  id_equipment: number;
  inventory_number: number;
  name: string;
  model: string;
  store_id: number;
  status: string;
}

export interface ResPersonWithEquipment {
  address: string;
  responsible: Responsible;
  equipments: Equipment[];
}


export class AdminStore {
  // users: User[] = [];
  
  resPersons: ResPersonWithEquipment[] = [];
  equipments: Equipment[] = [];

  loadingUsers = false;
  loadingResPersons = false;
  loadingEquipments = false;

  constructor() {
    makeAutoObservable(this);
  }

  // async fetchUsers() {
  //   this.loadingUsers = true;
  //   try {
  //     const res = await axiosInstance.get<User[]>("/admin/users");
  //     runInAction(() => {
  //       this.users = res.data;
  //     });
  //   } catch (e) {
  //     console.error("fetchUsers error:", e);
  //   } finally {
  //     runInAction(() => {
  //       this.loadingUsers = false;
  //     });
  //   }
  // }

  async fetchResPersons() {
    this.loadingResPersons = true;
    try {
      const res = await axiosInstance.get<ResPersonWithEquipment[]>("/admin/getAllResPerson");
      runInAction(() => {
        this.resPersons = res.data;
      });
    } catch (e) {
      console.error("Ошибка fetchResPersons:", e);
    } finally {
      runInAction(() => {
        this.loadingResPersons = false;
      });
    }
  }

  async fetchEquipments() {
    this.loadingEquipments = true;
    try {
      const res = await axiosInstance.get<Equipment[]>("/admin/getAllEquipments");
      runInAction(() => {
        this.equipments = res.data;
      });
    } catch (e) {
      console.error("Ошибка fetchEquipments:", e);
    } finally {
      runInAction(() => {
        this.loadingEquipments = false;
      });
    }
  }
}

export const adminStore = new AdminStore();
