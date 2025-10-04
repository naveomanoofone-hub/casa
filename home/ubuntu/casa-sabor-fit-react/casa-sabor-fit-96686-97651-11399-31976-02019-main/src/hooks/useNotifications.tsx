import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // Check if browser supports notifications
    if ("Notification" in window) {
      setSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!supported) {
      toast.error("Seu navegador não suporta notificações push");
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === "granted") {
        toast.success("Notificações ativadas! 🔔");
      } else if (result === "denied") {
        toast.error("Permissão de notificações negada");
      }
      
      return result;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast.error("Erro ao solicitar permissão de notificações");
    }
  };

  const sendNotification = (title: string, message: string) => {
    if (!supported || permission !== "granted") {
      return;
    }

    try {
      const notification = new Notification(title, {
        body: message,
        icon: "/logo.jpeg",
        badge: "/logo.jpeg",
        tag: "marina-santos-receitas",
        requireInteraction: false,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto close after 5 seconds
      setTimeout(() => notification.close(), 5000);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // Listen for new notifications from database
  useEffect(() => {
    if (permission !== "granted") return;

    const channel = (supabase as any)
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload: any) => {
          console.log("New notification received:", payload);
          const { title, message } = payload.new;
          sendNotification(title, message);
          
          // Also show a toast
          toast.success(`Nova notificação: ${title}`);
        }
      )
      .subscribe();

    return () => {
      (supabase as any).removeChannel(channel);
    };
  }, [permission, supported]);

  return {
    permission,
    supported,
    requestPermission,
    sendNotification,
  };
};
