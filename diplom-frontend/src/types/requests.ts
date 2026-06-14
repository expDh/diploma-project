export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface EquipmentRequest {
  id: number;
  equipmentId: number;
  quantity: number;
  comment?: string;

  status: RequestStatus;

  createdAt: string;
  updatedAt: string;

  user?: {
    id: number;
    firstName: string;
    lastName: string;
  };

  equipment?: {
    id: number;
    name: string;
  };
}


export type AdminEquipmentRequest = {
  id: number;
  store_id: number;
  created_by: number;
  type: 'PURCHASE' | 'REPAIR';
  equipment_id: number | null;
  quantity: number;
  comment: string | null;
  status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  handled_by: number | null;
  created_at: string;
  updated_at: string;

  store?: {
    id_store: number;
    address: string;
  };
  creator?: {
    id_users: number;
    firstName: string | null;
    lastName: string | null;
  };
  equipment?: {
    id_equipment: number;
    name: string;
    model: string | null;
  };
  handler?: {
    id_users: number;
    firstName: string | null;
    lastName: string | null;
  };
};