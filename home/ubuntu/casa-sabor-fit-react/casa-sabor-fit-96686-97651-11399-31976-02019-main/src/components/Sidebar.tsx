import { Home, BookOpen, User, Menu, X, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border flex items-center justify-between px-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        <div className="flex items-center gap-2">
          <img src="/logo.jpeg" alt="Marina Santos" className="w-8 h-8 rounded-full object-cover" />
          <h1 className="font-display text-base font-bold hidden xs:block">Marina Santos</h1>
        </div>
        
        <button className="p-2 hover:bg-accent rounded-lg transition-colors relative" aria-label="Notificações">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:left-0
      `}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Marina Santos" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h1 className="font-display text-lg font-bold">Marina Santos</h1>
              <p className="text-xs text-muted-foreground">Receitas Saudáveis</p>
            </div>
          </div>
        </div>
      
        <nav className="p-4 space-y-2" onClick={() => setIsOpen(false)}>
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/') 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Início</span>
          </Link>
          
          <Link
            to="/produtos"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/produtos') 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Produtos</span>
          </Link>
          
          <Link
            to="/perfil"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/perfil') 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Perfil</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">v1.0.0</p>
          <div className="flex gap-2 justify-center mt-2 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary">Termos</a>
            <span>•</span>
            <a href="#" className="hover:text-primary">Privacidade</a>
          </div>
        </div>
      </aside>

      {/* Bottom Navigation (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-40 flex items-center justify-around pb-safe">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            isActive('/') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Início</span>
        </Link>
        
        <Link
          to="/produtos"
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            isActive('/produtos') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs font-medium">Produtos</span>
        </Link>
        
        <Link
          to="/perfil"
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            isActive('/perfil') ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Perfil</span>
        </Link>
      </nav>
    </>
  );
};
