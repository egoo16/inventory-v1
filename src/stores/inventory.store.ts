import { create } from 'zustand';
import { IProduct, IInventoryMovement } from '@/types/inventory';
import { inventoryService } from '@/services/inventory.service';

const PRS = [
  {
    "id": "b2a86d4f-1789-4ac6-85d5-8d0cb8f883ed",
    "sku": "PDT12345",
    "name": "Camiseta deportiva",
    "description": "Camiseta de algodón para actividades deportivas.",
    "category": "Ropa",
    "price": 25.99,
    "cost": 15.00,
    "stock": 120,
    "minStock": 20,
    "weight": 0.25,
    "unit": "unidad",
    "presentations": ["S", "M", "L", "XL"],
    "createdAt": "2025-03-01T10:00:00Z",
    "updatedAt": "2025-03-14T12:30:00Z",
    "tenantId": "13d6c608-5afc-40aa-9e9f-6fcf0600d2ca"
  },
  {
    "id": "d65a7f48-5bbd-4c36-9d0f-21217d4c8d8d",
    "sku": "PDT67890",
    "name": "Zapatillas deportivas",
    "description": "Zapatillas cómodas para correr.",
    "category": "Calzado",
    "price": 59.99,
    "cost": 35.00,
    "stock": 200,
    "minStock": 30,
    "weight": 1.2,
    "unit": "par",
    "presentations": ["36", "37", "38", "39", "40", "41", "42"],
    "createdAt": "2025-02-20T09:30:00Z",
    "updatedAt": "2025-03-10T15:00:00Z",
    "tenantId": "13d6c608-5afc-40aa-9e9f-6fcf0600d2ca"
  },
  {
    "id": "a7a92c3b-f56f-4fc0-b55a-bbf53d0e0709",
    "sku": "PDT11223",
    "name": "Reloj inteligente",
    "description": "Reloj inteligente con monitor de ritmo cardíaco y GPS.",
    "category": "Electrónica",
    "price": 150.00,
    "cost": 90.00,
    "stock": 50,
    "minStock": 10,
    "weight": 0.4,
    "unit": "unidad",
    "presentations": ["Negro", "Blanco", "Azul"],
    "createdAt": "2025-03-05T14:00:00Z",
    "updatedAt": "2025-03-14T13:45:00Z",
    "tenantId": "13d6c608-5afc-40aa-9e9f-6fcf0600d2ca"
  }
]



interface InventoryState {
  products: IProduct[];
  lowStockProducts: IProduct[];
  movements: IInventoryMovement[];
  loading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<IProduct, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<IProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  recordMovement: (movement: Omit<IInventoryMovement, 'id' | 'date'>) => Promise<void>;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  products: PRS,
  lowStockProducts: PRS,
  movements: [],
  loading: false,
  error: null,
  
  loadProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await inventoryService.getProducts();
      set({ products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addProduct: async (product) => {
    const newProduct = await inventoryService.createProduct(product);
    set((state) => ({ products: [...state.products, newProduct] }));
  },

  updateProduct: async (id, updates) => {
    const updatedProduct = await inventoryService.updateProduct(id, updates);
    set((state) => ({
      products: state.products.map(p => p.id === id ? updatedProduct : p)
    }));
  },

  deleteProduct: async (id) => {
    await inventoryService.deleteProduct(id);
    set((state) => ({
      products: state.products.filter(p => p.id !== id)
    }));
  },

  recordMovement: async (movement) => {
    const newMovement = await inventoryService.recordMovement({
      ...movement,
      date: new Date().toISOString()
    });
    set((state) => ({ movements: [...state.movements, newMovement] }));
  }
}));