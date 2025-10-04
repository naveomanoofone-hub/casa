import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  category: string;
  prep_time: string;
  is_premium: boolean;
  price: number | null;
  difficulty: string;
  image: string | null;
}

export default function ManageProducts() {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const { data, error } = await (supabase as any)
      .from("recipes")
      .select("id, title, category, prep_time, is_premium, price, difficulty, image")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRecipes(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta receita?")) return;

    const { error } = await (supabase as any)
      .from("recipes")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Erro ao excluir receita");
    } else {
      toast.success("Receita excluída com sucesso!");
      fetchRecipes();
    }
  };

  const filteredRecipes = recipes.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl mb-2">Gerenciar Produtos</h1>
          <p className="text-muted-foreground">Gerencie todas as receitas do site</p>
        </div>
        <Button 
          className="gradient-primary border-0"
          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
        >
          Adicionar Nova Receita
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar receitas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card"
        />
      </div>

      {/* Recipes Table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Receita</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Preço</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Dificuldade</th>
                <th className="px-6 py-4 text-right text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRecipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                        <img 
                          src={recipe.image || "/placeholder.svg"} 
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{recipe.title}</p>
                        <p className="text-xs text-muted-foreground">{recipe.prep_time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{recipe.category}</td>
                  <td className="px-6 py-4">
                    <Badge variant={recipe.is_premium ? "default" : "secondary"}>
                      {recipe.is_premium ? "Premium" : "Gratuito"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {recipe.is_premium ? `R$ ${recipe.price?.toFixed(2)}` : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm">{recipe.difficulty}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Editar"
                        onClick={() => toast.info("Funcionalidade em desenvolvimento")}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Excluir"
                        onClick={() => handleDelete(recipe.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            Nenhuma receita encontrada. Tente outro termo de busca.
          </p>
        </div>
      )}
    </div>
  );
}
