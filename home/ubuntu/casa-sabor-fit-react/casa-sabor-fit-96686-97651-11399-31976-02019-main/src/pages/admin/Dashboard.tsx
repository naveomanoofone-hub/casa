import { BarChart, Users, ShoppingBag, DollarSign, TrendingUp, Package } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AdminDashboard() {
  // Mock data
  const stats = {
    totalRecipes: 20,
    freeRecipes: 12,
    premiumRecipes: 8,
    totalUsers: 1247,
    recipesSold: 89,
    monthlyRevenue: 876.00,
    conversionRate: 12,
    notificationsSent: 45
  };

  const topProducts = [
    { name: "Bolo de Aniversário 3 Camadas", sales: 15, revenue: 193.50 },
    { name: "Panettone Sem Glúten", sales: 12, revenue: 190.80 },
    { name: "E-book Completo", sales: 8, revenue: 399.20 },
    { name: "Torta Red Velvet", sales: 10, revenue: 139.00 },
    { name: "Macarons Coloridos", sales: 7, revenue: 118.30 },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-4xl mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio de receitas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total de Receitas</p>
            <Package className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">{stats.totalRecipes}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.freeRecipes} gratuitas • {stats.premiumRecipes} premium
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Usuários Cadastrados</p>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
          <p className="text-xs text-success mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% este mês
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Vendas (mês)</p>
            <ShoppingBag className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">{stats.recipesSold}</p>
          <p className="text-xs text-success mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +8% vs mês anterior
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Receita (mês)</p>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">R$ {stats.monthlyRevenue.toFixed(2)}</p>
          <p className="text-xs text-success mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +15% vs mês anterior
          </p>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-display text-lg mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-primary" />
            Produtos Mais Vendidos
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} vendas</p>
                </div>
                <p className="font-bold text-primary">R$ {product.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-display text-lg mb-4">Métricas Rápidas</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Taxa de Conversão</span>
              <span className="font-bold text-lg">{stats.conversionRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ticket Médio</span>
              <span className="font-bold text-lg">R$ {(stats.monthlyRevenue / stats.recipesSold).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Notificações Enviadas</span>
              <span className="font-bold text-lg">{stats.notificationsSent}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Taxa de Abertura</span>
              <span className="font-bold text-lg">42%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="p-6">
        <h3 className="font-display text-lg mb-4">Vendas dos Últimos 7 Dias</h3>
        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
          Gráfico de vendas (integrar com biblioteca de charts)
        </div>
      </Card>
    </div>
  );
}
