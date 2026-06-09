export interface Equipment {
  id_equipment: number;
  inventory_number: number;
  name: string;
  model: string;
  store_id: number;
  status: string;
}

export interface Responsible {
  id_users: number;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  position: string;
}

export interface StoreEquipments {
  address: string;
  responsible: Responsible;
  equipments: Equipment[];
}
