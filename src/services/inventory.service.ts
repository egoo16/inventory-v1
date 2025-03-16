import { IProduct, IInventoryMovement } from "@/types/inventory";
import api from "@/services/api.service";

export const inventoryService = {
  // Obtener todos los productos
  async getProducts(): Promise<IProduct[]> {
    try {
      const response = await api.get<{ data: IProduct[] }>(
        "/inventory/products",
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  },

  // Crear un nuevo producto
  async createProduct(IProduct: Omit<IProduct, "id">): Promise<IProduct> {
    try {
      const response = await api.post<{ data: IProduct }>(
        "/inventory/products",
        {
          ...IProduct,
          tenantId: localStorage.getItem("tenantId"),
        },
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error creating IProduct: ${error.message}`);
    }
  },

  // Actualizar un producto existente
  async updateProduct(id: string, updates: Partial<IProduct>): Promise<IProduct> {
    try {
      const response = await api.patch<{ data: IProduct }>(
        `/inventory/products/${id}`,
        {
          ...updates,
          tenantId: localStorage.getItem("tenantId"),
        },
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error updating IProduct: ${error.message}`);
    }
  },

  // Eliminar un producto
  async deleteProduct(id: string): Promise<void> {
    try {
      await api.delete(`/inventory/products/${id}`, {
        data: { tenantId: localStorage.getItem("tenantId") },
      });
    } catch (error) {
      throw new Error(`Error deleting IProduct: ${error.message}`);
    }
  },

  // Registrar movimiento de inventario
  async recordMovement(
    movement: Omit<IInventoryMovement, "id" | "date">,
  ): Promise<IInventoryMovement> {
    try {
      const response = await api.post<{ data: IInventoryMovement }>(
        "/inventory/movements",
        {
          ...movement,
          date: new Date().toISOString(),
          tenantId: localStorage.getItem("tenantId"),
        },
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error recording movement: ${error.message}`);
    }
  },

  // Obtener movimientos por producto (Cardex)
  async getCardex(productId: string): Promise<IInventoryMovement[]> {
    try {
      const response = await api.get<{ data: IInventoryMovement[] }>(
        `/inventory/cardex/${productId}?tenantId=${localStorage.getItem("tenantId")}`,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Error fetching cardex: ${error.message}`);
    }
  },
};

