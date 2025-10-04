import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export default function AdminLogin() {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminLoading && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAdmin, adminLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = loginSchema.parse({ email, password });
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        toast.error("Credenciais inválidas ou usuário sem permissão de admin");
        return;
      }

      const { data: roleData } = await (supabase as any)
        .from("user_roles")
        .select("role")
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        await supabase.auth.signOut();
        toast.error("Usuário sem permissão de admin");
        return;
      }

      toast.success("Login realizado com sucesso!");
      // Wait a bit for the auth state to update
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 100);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Erro ao fazer login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupAdmin = async () => {
    setIsSettingUp(true);
    try {
      const { data, error } = await supabase.functions.invoke("setup-admin");
      
      if (error) throw error;
      
      if (data.success) {
        toast.success("Admin criado! Email: root@admin.com | Senha: root123");
        setEmail("root@admin.com");
        setPassword("root123");
      } else {
        toast.error(data.message || "Erro ao criar admin");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar admin");
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
      <Card className="w-full max-w-md p-8 shadow-premium">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4">
            <img src="/logo.jpeg" alt="Logo" className="w-full h-full rounded-full" />
          </div>
          <h1 className="font-display text-3xl mb-2">Painel Admin</h1>
          <p className="text-muted-foreground">Marina Santos Receitas</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@marinasantos.com"
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-2"
            />
          </div>

          <Button
            type="submit"
            className="w-full gradient-primary border-0"
            disabled={isLoading}
          >
            <Lock className="w-4 h-4 mr-2" />
            {isLoading ? "Entrando..." : "Entrar no Painel"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p className="mb-4">Use suas credenciais de admin para acessar</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSetupAdmin}
            disabled={isSettingUp}
          >
            {isSettingUp ? "Criando..." : "Criar Primeiro Admin"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
