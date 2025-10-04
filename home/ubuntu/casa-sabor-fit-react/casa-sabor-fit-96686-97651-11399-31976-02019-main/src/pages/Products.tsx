import { Sidebar } from "@/components/Sidebar";
import { RecipeCard } from "@/components/RecipeCard";
import { NotificationModal } from "@/components/NotificationModal";
import { NotificationPermission } from "@/components/NotificationPermission";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterType = "todos" | "gratuitos" | "premium";

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  category: string;
  prep_time: string;
  servings: number | null;
  difficulty: string;
  is_premium: boolean;
  price: number | null;
  ingredients: string[];
  instructions: string[];
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("todos");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [unlockedRecipes, setUnlockedRecipes] = useState<string[]>([]);

  useEffect(() => {
    const unlocked = JSON.parse(localStorage.getItem("msreceitas_unlocked") || "[]");
    setUnlockedRecipes(unlocked);
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await (supabase as any)
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setRecipes(data);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  const filterRecipes = () => {
    let filtered = [...recipes];
    
    if (filterType === "gratuitos") {
      filtered = filtered.filter(r => !r.is_premium);
    } else if (filterType === "premium") {
      filtered = filtered.filter(r => r.is_premium);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const filteredRecipes = filterRecipes();
  const freeCount = filteredRecipes.filter(r => !r.is_premium).length;
  const premiumCount = filteredRecipes.filter(r => r.is_premium).length;

  if (loading) {
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
    <div className="flex min-h-screen w-full pb-16 lg:pb-0">
      <Sidebar />
      <NotificationModal />
      
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Notification Permission */}
          <div className="mb-8">
            <NotificationPermission />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl mb-3">
              Todas as Receitas
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Explore nossa coleção completa de receitas saudáveis
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar receitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 bg-card"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters Bar */}
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 space-y-4 sticky top-14 lg:top-0 z-10">
              <div className="flex flex-wrap gap-3">
                <Select value={filterType} onValueChange={(v) => setFilterType(v as FilterType)}>
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="gratuitos">Gratuitos</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                {filteredRecipes.length} receita{filteredRecipes.length !== 1 ? 's' : ''} encontrada{filteredRecipes.length !== 1 ? 's' : ''} 
                {freeCount > 0 && ` • ${freeCount} gratuita${freeCount !== 1 ? 's' : ''}`}
                {premiumCount > 0 && ` • ${premiumCount} premium`}
              </div>
            </div>
          </div>

          {/* Recipes Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={{
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image || "/placeholder.svg",
                    category: recipe.category,
                    prepTime: recipe.prep_time,
                    servings: recipe.servings?.toString() || "0",
                    difficulty: recipe.difficulty as "Fácil" | "Médio" | "Difícil" | "Muito Fácil",
                    isPremium: recipe.is_premium,
                    price: recipe.price || 0,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    badges: [recipe.category, recipe.difficulty],
                    tips: [],
                    nutrition: {
                      calories: "0 kcal",
                      protein: "0g",
                      carbs: "0g",
                      fat: "0g",
                    },
                  }}
                  unlocked={unlockedRecipes.includes(recipe.id) || !recipe.is_premium}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display text-2xl mb-2">Nenhuma receita encontrada</h3>
              <p className="text-muted-foreground mb-6">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("todos");
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
