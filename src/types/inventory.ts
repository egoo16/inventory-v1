export interface IProduct {
    id: string;
    sku: string;
    name: string;
    description?: string;
    category: string;
    price: number;
    cost: number;
    stock: number;
    minStock: number;
    weight?: number;
    unit: string;
    presentations: string[];
    createdAt: string;
    updatedAt: string;
    tenantId: string;
  }
  
export interface IInventoryMovement {
    id: string;
    productId: string;
    type: 'entry' | 'exit' | 'adjustment';
    quantity: number;
    date: string;
    reason?: string;
    userId: string;
    tenantId: string;
  }