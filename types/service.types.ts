// /types/appointmentFlow.types.ts
/* ===========================================================
   TYPES
=========================================================== */
export interface Service {
  _id: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  bufferBefore: number;
  bufferAfter: number;
  active: boolean;
  createdAt: string;
  __v?: number;
}

export interface ServiceState {
  services: Service[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedService: Service | null;
  successMessage: string | null;
}
