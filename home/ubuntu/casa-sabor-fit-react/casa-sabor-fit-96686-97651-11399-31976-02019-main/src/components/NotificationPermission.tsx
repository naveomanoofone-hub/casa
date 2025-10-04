import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, BellOff } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

export const NotificationPermission = () => {
  const { permission, supported, requestPermission } = useNotifications();

  if (!supported) {
    return null;
  }

  if (permission === "granted") {
    return (
      <Card className="p-4 bg-success/10 border-success/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-success" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-success">Notificações ativadas</p>
            <p className="text-xs text-muted-foreground">
              Você receberá alertas sobre novas receitas
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (permission === "denied") {
    return (
      <Card className="p-4 bg-destructive/10 border-destructive/20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <BellOff className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-destructive">Notificações bloqueadas</p>
              <p className="text-xs text-muted-foreground">
                Você bloqueou as notificações. Para ativar:
              </p>
            </div>
          </div>
          <div className="ml-13 text-xs text-muted-foreground space-y-1 bg-background/50 p-3 rounded-lg">
            <p className="font-medium">📱 No celular:</p>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Toque no cadeado 🔒 ao lado da URL</li>
              <li>Encontre "Notificações" ou "Permissions"</li>
              <li>Mude de "Bloquear" para "Permitir"</li>
              <li>Recarregue a página</li>
            </ol>
            <p className="font-medium mt-2">💻 No computador:</p>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Clique no cadeado 🔒 na barra de endereço</li>
              <li>Procure "Notificações"</li>
              <li>Altere para "Permitir"</li>
              <li>Recarregue a página</li>
            </ol>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-primary/10 border-primary/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Bell className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium">Ativar notificações push</p>
          <p className="text-xs text-muted-foreground mb-3">
            Receba alertas sobre novas receitas deliciosas
          </p>
          <Button
            onClick={requestPermission}
            size="sm"
            className="gradient-primary border-0"
          >
            <Bell className="w-4 h-4 mr-2" />
            Ativar Notificações
          </Button>
        </div>
      </div>
    </Card>
  );
};
