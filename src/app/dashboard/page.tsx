'use client';

import { Grid, Card, CardContent, Typography, useTheme, Stack, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ArrowUpward, ArrowDownward, Inventory, AttachMoney, ShoppingCart, Warning } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useInventoryStore } from '@/stores/inventory.store';
import { formatCurrency } from '../../utils/helpers';
import { useSalesStore } from '../../stores/sales.store';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { DashboardLayout } from '../../components/dashboard/Layout';

// Datos de ejemplo para el gráfico (deberías reemplazarlos con datos reales)
const salesData = [
  { date: '01/01', sales: 4000 },
  { date: '02/01', sales: 3000 },
  { date: '03/01', sales: 5000 },
  { date: '04/01', sales: 2780 },
  { date: '05/01', sales: 1890 },
  { date: '06/01', sales: 2390 },
];

const KpiCard = ({ title, value, trend }: { title: string; value: string; trend: number }) => {
  const theme = useTheme();
  const TrendIcon = trend >= 0 ? ArrowUpward : ArrowDownward;
  const color = trend >= 0 ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4">{value}</Typography>
          <TrendIcon sx={{ color, fontSize: 32 }} />
          <Typography variant="body1" color={color}>
            {trend}%
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const { lowStockProducts } = useInventoryStore();
  const { recentSales } = useSalesStore();
  const theme = useTheme();

  const stockColumns: GridColDef[] = [
    // {
    //   field: 'name',
    //   headerName: 'Producto',
    //   flex: 2,
    //   renderCell: (params: { value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
    //     <Stack direction="row" alignItems="center" spacing={1}>
    //       <Warning color="error" />
    //       <span>{params.value}</span>
    //     </Stack>
    //   )
    // },
    { field: 'stock', headerName: 'Stock Actual', flex: 1 },
    { field: 'minStock', headerName: 'Stock Mínimo', flex: 1 },
    {
      field: 'progress',
      headerName: 'Nivel',
      flex: 2,
      renderCell: (params: { row: { stock: number; minStock: number; }; }) => (
        <LinearProgress
          variant="determinate"
          value={(params.row.stock / params.row.minStock) * 100}
          sx={{ width: '100%', height: 8 }}
          color={params.row.stock < params.row.minStock ? 'error' : 'primary'}
        />
      )
    }
  ];

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        {/* Sección de KPIs */}
        <Grid item xs={12} md={6} lg={3}>
          <KpiCard
            title="Ventas del Mes"
            value={formatCurrency(25000)}
            trend={12.5}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KpiCard
            title="Productos en Stock"
            value="1,234"
            trend={-2.4}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KpiCard
            title="Clientes Nuevos"
            value="45"
            trend={8.1}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <KpiCard
            title="Margen de Ganancia"
            value="32%"
            trend={4.2}
          />
        </Grid>

        {/* Gráfico de Ventas */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tendencia de Ventas (Últimos 30 días)
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Stock Bajo */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Productos con Stock Bajo
              </Typography>
              <DataGrid
                rows={lowStockProducts}
                columns={stockColumns}
                density="compact"
                hideFooter
                disableRowSelectionOnClick
                sx={{
                  '& .MuiDataGrid-cell': {
                    border: 'none',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Últimas Ventas */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Últimas Transacciones
              </Typography>
              <DataGrid
                rows={recentSales}
                columns={[
                  { field: 'date', headerName: 'Fecha', flex: 1 },
                  { field: 'customer', headerName: 'Cliente', flex: 2 },
                  // { field: 'total', headerName: 'Total', flex: 1, renderCell: (params: { value: number; }) => formatCurrency(params.value) },
                  { field: 'status', headerName: 'Estado', flex: 1 },
                ]}
                autoHeight
                pageSizeOptions={[5, 10]}
              //   initialState={{ pagination: { paginationModel: { pageSize: 5 } } }
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>

  );
}