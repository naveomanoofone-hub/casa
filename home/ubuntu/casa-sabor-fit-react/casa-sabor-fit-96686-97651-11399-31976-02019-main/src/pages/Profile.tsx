import { Sidebar } from "@/components/Sidebar";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";
import { useState, useEffect } from "react";
import { User, Heart, Lock, History, Settings, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  const [unlockedRecipes, setUnlockedRecipes] = useState<string[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("msreceitas_favorites") || "[]");
    const unlocked = JSON.parse(localStorage.getItem("msreceitas_unlocked") || "[]");
    setFavoriteRecipes(favorites);
    setUnlockedRecipes(unlocked);
  }, []);

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const permission = localStorage.getItem("msreceitas_notification_permission");
    return permission === "granted";
  });

  const handleNotificationToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
    localStorage.setItem("msreceitas_notification_permission", checked ? "granted" : "denied");
  };

  const favoritesList = recipes.filter(r => favoriteRecipes.includes(r.id));
  const unlockedList = recipes.filter(r => unlockedRecipes.includes(r.id));

  return (
    <div className="flex min-h-screen w-full pb-16 lg:pb-0">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="gradient-hero rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                <img 
                  src="/logo.jpeg" 
                  alt="Marina Santos" 
                  className="w-full h-full rounded-full object-cover border-4 border-white/20"
                />
              </div>
              <h1 className="font-display text-2xl md:text-3xl text-white mb-2">Marina Santos</h1>
              <p className="text-white/80">Apaixonada por receitas saudáveis! 👩‍🍳</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-xl p-4 text-center shadow-card">
              <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{favoriteRecipes.length}</p>
              <p className="text-sm text-muted-foreground">Favoritos</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center shadow-card">
              <Lock className="w-8 h-8 text-premium mx-auto mb-2" />
              <p className="text-2xl font-bold">{unlockedRecipes.length}</p>
              <p className="text-sm text-muted-foreground">Premium</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center shadow-card">
              <History className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Avaliações</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="favorites" className="space-y-6">
            <TabsList className="bg-card w-full grid grid-cols-3">
              <TabsTrigger value="favorites">
                <Heart className="w-4 h-4 mr-2" />
                Favoritos
              </TabsTrigger>
              <TabsTrigger value="unlocked">
                <Lock className="w-4 h-4 mr-2" />
                Premium
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Config
              </TabsTrigger>
            </TabsList>

            <TabsContent value="favorites">
              <div className="mb-6">
                <h2 className="font-display text-2xl mb-2">Receitas Favoritas</h2>
                <p className="text-muted-foreground">
                  {favoriteRecipes.length} receita{favoriteRecipes.length !== 1 ? 's' : ''} salva{favoriteRecipes.length !== 1 ? 's' : ''}
                </p>
              </div>
              {favoritesList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritesList.map((recipe) => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe}
                      unlocked={unlockedRecipes.includes(recipe.id) || !recipe.isPremium}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-xl p-12 text-center shadow-card">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl mb-2">Nenhuma receita favoritada</h3>
                  <p className="text-muted-foreground mb-6">
                    Comece a favoritar suas receitas preferidas! ❤️
                  </p>
                  <Button onClick={() => window.location.href = "/produtos"}>
                    Explorar Receitas
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="unlocked">
              <div className="mb-6">
                <h2 className="font-display text-2xl mb-2">Receitas Premium</h2>
                <p className="text-muted-foreground">
                  {unlockedRecipes.length} receita{unlockedRecipes.length !== 1 ? 's' : ''} desbloqueada{unlockedRecipes.length !== 1 ? 's' : ''}
                </p>
              </div>
              {unlockedList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {unlockedList.map((recipe) => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe}
                      unlocked={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-xl p-12 text-center shadow-card">
                  <Lock className="w-16 h-16 text-premium mx-auto mb-4" />
                  <h3 className="font-display text-xl mb-2">Nenhuma receita premium</h3>
                  <p className="text-muted-foreground mb-6">
                    Desbloqueie receitas exclusivas! 🔓
                  </p>
                  <Button 
                    onClick={() => window.location.href = "/produtos"}
                    className="bg-premium text-primary-foreground hover:bg-premium/90"
                  >
                    Ver Receitas Premium
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-display text-xl mb-4">Notificações</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <Label htmlFor="notifications" className="text-base">Receber notificações</Label>
                        <p className="text-sm text-muted-foreground">Novas receitas e atualizações</p>
                      </div>
                    </div>
                    <Switch 
                      id="notifications" 
                      checked={notificationsEnabled}
                      onCheckedChange={handleNotificationToggle}
                    />
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-display text-xl mb-4">Conta</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors">
                      🌙 Modo Escuro (Ativo)
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors">
                      📏 Unidades de Medida
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors">
                      🗣️ Idioma: Português
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors">
                      🔐 Privacidade
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors">
                      ℹ️ Sobre o App
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-accent rounded-lg transition-colors">
                      📧 Contato/Suporte
                    </button>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Marina Santos Receitas v1.0.0</p>
                  <div className="flex gap-2 justify-center mt-2">
                    <a href="#" className="hover:text-primary">Termos de Uso</a>
                    <span>•</span>
                    <a href="#" className="hover:text-primary">Privacidade</a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
