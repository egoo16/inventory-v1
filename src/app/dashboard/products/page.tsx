'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useInventoryStore } from '@/stores/inventory.store';
import { useEffect } from 'react';

const columns: GridColDef[] = [
  { field: 'sku', headerName: 'SKU', width: 150 },
  { field: 'name', headerName: 'Nombre', width: 200 },
  { field: 'category', headerName: 'Categoría', width: 150 },
  { field: 'stock', headerName: 'Stock', type: 'number' },
  { field: 'price', headerName: 'Precio', type: 'number' },
];

export default function ProductsPage() {
  const { products, loading, loadProducts } = useInventoryStore();
  
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
}