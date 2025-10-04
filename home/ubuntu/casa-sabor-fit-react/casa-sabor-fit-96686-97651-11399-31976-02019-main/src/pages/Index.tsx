import { Sidebar } from "@/components/Sidebar";
import { RecipeCard } from "@/components/RecipeCard";
import { NotificationPermission } from "@/components/NotificationPermission";
import { recipes } from "@/data/recipes";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

const Index = () => {
  const [unlockedRecipes, setUnlockedRecipes] = useState<string[]>([]);
  // Initialize notifications hook
  useNotifications();

  useEffect(() => {
    const unlocked = JSON.parse(localStorage.getItem("msreceitas_unlocked") || "[]");
    setUnlockedRecipes(unlocked);
  }, []);

  const featuredRecipes = recipes.filter(r => !r.isPremium).slice(0, 3);
  const premiumRecipes = recipes.filter(r => r.isPremium).slice(0, 3);

  return (
    <div className="flex min-h-screen w-full pb-16 lg:pb-0">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Copy Section */}
          <section className="mb-8 text-center max-w-4xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-accent mb-4">
              Receitas Saudáveis para Comer Sem Culpa! 🌱
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Descubra receitas deliciosas, práticas e saborosas que transformam qualquer refeição em um momento especial. 
              Comer bem nunca foi tão fácil e delicioso! Todas as receitas são sem glúten, sem açúcar refinado e sem lactose 
              — feitas com ingredientes inteligentes que nutrem o corpo e permitem comer sem culpa.
            </p>
          </section>

          {/* Hero Banner */}
          <section className="mb-12 rounded-3xl overflow-hidden shadow-card">
            <img 
              src="/hero-banner.png" 
              alt="Palha Italiana - A sobremesa que derrete na boca!"
              className="w-full h-[250px] md:h-[400px] object-cover"
              loading="eager"
            />
          </section>

          {/* Notification Permission */}
          <section className="mb-12">
            <NotificationPermission />
          </section>

          {/* Featured Recipes Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl md:text-3xl mb-2">Receitas em Destaque</h2>
                <p className="text-muted-foreground">Comece por aqui! Receitas gratuitas e deliciosas</p>
              </div>
              <Link 
                to="/produtos" 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Ver todas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} unlocked />
              ))}
            </div>
          </section>

          {/* Premium Recipes Preview */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl md:text-3xl mb-2">Receitas Premium</h2>
                <p className="text-muted-foreground">Receitas exclusivas com técnicas profissionais</p>
              </div>
              <Link 
                to="/produtos" 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Ver todas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  unlocked={unlockedRecipes.includes(recipe.id)}
                />
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥗</span>
              </div>
              <h3 className="font-display text-lg mb-2">100% Saudável</h3>
              <p className="text-muted-foreground text-sm">
                Todas as receitas são aprovadas por nutricionistas
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="font-display text-lg mb-2">Rápido & Fácil</h3>
              <p className="text-muted-foreground text-sm">
                Receitas práticas para o dia a dia
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="font-display text-lg mb-2">Sabor Garantido</h3>
              <p className="text-muted-foreground text-sm">
                Receitas testadas e aprovadas
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
