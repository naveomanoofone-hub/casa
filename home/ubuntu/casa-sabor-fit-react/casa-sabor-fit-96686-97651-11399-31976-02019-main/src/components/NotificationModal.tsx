import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const NotificationModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const permission = localStorage.getItem("msreceitas_notification_permission");
    const hasVisited = localStorage.getItem("msreceitas_visited_products");
    
    if (!permission && !hasVisited) {
      setTimeout(() => setShowModal(true), 1500);
      localStorage.setItem("msreceitas_visited_products", "true");
    }
  }, []);

  const handleAccept = async () => {
    localStorage.setItem("msreceitas_notification_permission", "granted");
    setShowModal(false);
    
    if ("Notification" in window) {
      await Notification.requestPermission();
    }
    
    toast({
      title: "Notificações ativadas! 🎉",
      description: "Você receberá atualizações das melhores receitas",
      className: "bg-success text-white",
      duration: 3000,
    });
  };

  const handleDeny = () => {
    localStorage.setItem("msreceitas_notification_permission", "denied");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleDeny}
      />
      
      <div className="relative bg-card rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
        <button 
          onClick={handleDeny}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-lg transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 animate-[bounce_2s_ease-in-out_infinite]">
            <Bell className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-2xl font-bold mb-3">
            Receba Novas Receitas!
          </h2>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            Quer ser notificado quando novas receitas deliciosas forem adicionadas? 
            Prometemos enviar apenas conteúdo relevante e nunca fazer spam! 😊
          </p>

          <Button 
            onClick={handleAccept}
            className="w-full h-14 text-base font-bold mb-2 bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70"
          >
            Sim, quero receber! 🎉
          </Button>

          <button
            onClick={handleDeny}
            className="w-full h-12 text-muted-foreground hover:text-foreground transition-colors"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
};
