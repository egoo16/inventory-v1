import { create } from 'zustand';

interface SalesState {
  recentSales: any[];
  loading: boolean;
  error: string | null;
  loadRecentSales: () => Promise<void>;
}

export const useSalesStore = create<SalesState>((set) => ({
  recentSales: [],
  loading: false,
  error: null,
  
  loadRecentSales: async () => {
    set({ loading: true });
    try {
      const data = [
        { id: 1, date: '2023-10-01', customer: 'Cliente Ejemplo', total: 150.75, status: 'Completado' },
        { id: 2, date: '2023-10-02', customer: 'Otro Cliente', total: 89.99, status: 'Pendiente' },
      ];
      set({ recentSales: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));