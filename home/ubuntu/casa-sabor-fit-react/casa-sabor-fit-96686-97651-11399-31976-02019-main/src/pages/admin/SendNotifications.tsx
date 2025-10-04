import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Send, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const notificationSchema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório").max(50, "Título muito longo"),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(120, "Mensagem muito longa"),
  audience: z.enum(["all", "premium", "free"]),
});

interface Notification {
  id: string;
  title: string;
  created_at: string;
  sent_count: number;
  opened_count: number;
}

export default function SendNotifications() {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");
  const [isSending, setIsSending] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const { data, error } = await (supabase as any)
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error && data) {
      setNotifications(data);
    }
    setLoading(false);
  };

  const handleSend = async () => {
    try {
      const validatedData = notificationSchema.parse({
        title,
        message,
        audience,
      });

      setIsSending(true);

      const { error } = await (supabase as any)
        .from("notifications")
        .insert({
          title: validatedData.title,
          message: validatedData.message,
          audience: validatedData.audience,
          sent_count: estimatedReach,
        });

      if (error) throw error;

      toast.success("Notificação enviada com sucesso! 🎉");
      setTitle("");
      setMessage("");
      fetchNotifications();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Erro ao enviar notificação");
      }
    } finally {
      setIsSending(false);
    }
  };

  const estimatedReach = audience === "all" ? 1247 : audience === "premium" ? 89 : 1158;

  if (adminLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-4xl mb-2">Enviar Notificações</h1>
        <p className="text-muted-foreground">Envie notificações push para seus usuários</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <Card className="p-6 lg:col-span-2 space-y-6">
          <div>
            <Label htmlFor="title">Título da Notificação *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Nova Receita: Palha Italiana! 🍫"
              maxLength={50}
              className="mt-2 bg-background"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {title.length}/50 caracteres
            </p>
          </div>

          <div>
            <Label htmlFor="message">Mensagem *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex: Aprenda a fazer a sobremesa mais amada do Brasil! Fácil e deliciosa."
              maxLength={120}
              rows={3}
              className="mt-2 bg-background"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {message.length}/120 caracteres
            </p>
          </div>

          <div>
            <Label htmlFor="audience">Destinatários</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger id="audience" className="mt-2 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os usuários</SelectItem>
                <SelectItem value="premium">Usuários premium</SelectItem>
                <SelectItem value="free">Usuários gratuitos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSend}
            disabled={isSending}
            className="w-full gradient-primary border-0"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSending ? "Enviando..." : "Enviar Notificação"}
          </Button>
        </Card>

        {/* Preview & Stats */}
        <div className="space-y-6">
          {/* Preview */}
          <Card className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Preview
            </h3>
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <img src="/logo.jpeg" alt="Logo" className="w-6 h-6 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm mb-1">
                    {title || "Título da notificação"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {message || "Mensagem da notificação aparecerá aqui..."}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Estatísticas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Alcance estimado
                </span>
                <span className="font-bold">{estimatedReach.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Taxa de abertura média</span>
                <span className="font-bold text-success">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Melhor horário</span>
                <span className="font-bold">19h - 21h</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* History */}
      <Card className="p-6">
        <h3 className="font-display text-xl mb-4">Histórico de Notificações</h3>
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma notificação enviada ainda
            </p>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div>
                  <p className="font-medium">{notif.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notif.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{notif.opened_count}/{notif.sent_count}</p>
                  <p className="text-xs text-muted-foreground">
                    {notif.sent_count > 0 
                      ? Math.round((notif.opened_count / notif.sent_count) * 100)
                      : 0}% taxa de abertura
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
