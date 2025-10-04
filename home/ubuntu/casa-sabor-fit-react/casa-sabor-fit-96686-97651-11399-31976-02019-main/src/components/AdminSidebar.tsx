import { BarChart, Package, Bell, Settings, LogOut, Home } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("msreceitas_admin_auth");
    toast.success("Logout realizado");
    navigate("/admin/login");
  };

  const menuItems = [
    { icon: BarChart, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Package, label: "Gerenciar Produtos", path: "/admin/produtos" },
    { icon: Bell, label: "Notificações", path: "/admin/notificacoes" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="font-display font-bold">Admin Panel</h2>
            <p className="text-xs text-muted-foreground">Marina Santos</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 border-t border-border mt-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Voltar ao Site</span>
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </aside>
  );
};
