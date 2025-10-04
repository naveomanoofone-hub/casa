import { Sidebar } from "@/components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { recipes } from "@/data/recipes";
import { Clock, Users, ChefHat, Heart, ArrowLeft, Lock, Share2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaymentModal } from "@/components/PaymentModal";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === id);
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!recipe) return;
    
    // Check favorites
    const favorites = JSON.parse(localStorage.getItem("msreceitas_favorites") || "[]");
    setIsFavorite(favorites.includes(recipe.id));
    
    // Check if unlocked
    const unlocked = JSON.parse(localStorage.getItem("msreceitas_unlocked") || "[]");
    setIsUnlocked(unlocked.includes(recipe.id) || !recipe.isPremium);

    // Load progress
    const progress = JSON.parse(localStorage.getItem(`msreceitas_recipe_progress_${recipe.id}`) || '{"ingredients":[],"steps":[]}');
    setCheckedIngredients(progress.ingredients || []);
    setCheckedSteps(progress.steps || []);
  }, [recipe]);

  // Save progress whenever checkboxes change
  useEffect(() => {
    if (!recipe) return;
    localStorage.setItem(`msreceitas_recipe_progress_${recipe.id}`, JSON.stringify({
      ingredients: checkedIngredients,
      steps: checkedSteps
    }));
  }, [checkedIngredients, checkedSteps, recipe]);

  if (!recipe) {
    return (
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 lg:ml-64 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl mb-4">Receita não encontrada</h1>
            <Button onClick={() => navigate("/produtos")}>
              Ver todas as receitas
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("msreceitas_favorites") || "[]");
    if (isFavorite) {
      const updated = favorites.filter((fid: string) => fid !== recipe.id);
      localStorage.setItem("msreceitas_favorites", JSON.stringify(updated));
      setIsFavorite(false);
      toast.success("Removido dos favoritos");
    } else {
      favorites.push(recipe.id);
      localStorage.setItem("msreceitas_favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success("Adicionado aos favoritos ❤️");
      // Haptic feedback simulation
      if (navigator.vibrate) navigator.vibrate(50);
    }
  };

  const handleUnlock = () => {
    const unlocked = JSON.parse(localStorage.getItem("msreceitas_unlocked") || "[]");
    unlocked.push(recipe.id);
    localStorage.setItem("msreceitas_unlocked", JSON.stringify(unlocked));
    setIsUnlocked(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Confira esta receita: ${recipe.title}`,
          url: window.location.href
        });
        toast.success("Receita compartilhada!");
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado!");
    }
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
    if (navigator.vibrate) navigator.vibrate(30);
  };

  const toggleStep = (index: number) => {
    setCheckedSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
    if (navigator.vibrate) navigator.vibrate(30);
  };

  const copyShoppingList = () => {
    const list = recipe.ingredients.join("\n");
    navigator.clipboard.writeText(list);
    toast.success("Lista de compras copiada! 📋");
  };

  const resetProgress = () => {
    setCheckedIngredients([]);
    setCheckedSteps([]);
    toast.success("Progresso resetado!");
  };

  const stepsProgress = recipe.instructions.length > 0 
    ? (checkedSteps.length / recipe.instructions.length) * 100 
    : 0;

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {/* Recipe Header */}
          <div className="bg-card rounded-2xl overflow-hidden shadow-card mb-8">
            <div className="relative h-64 md:h-96 bg-muted">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              {recipe.isPremium && !isUnlocked && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Lock className="w-20 h-20 text-premium mx-auto" />
                    <p className="text-white text-xl font-bold">Receita Premium Bloqueada</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl mb-4">
                {recipe.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{recipe.servings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  <span>{recipe.difficulty}</span>
                </div>
              </div>

              <div className="flex gap-3">
                {recipe.isPremium && !isUnlocked ? (
                  <Button
                    onClick={() => setShowPaymentModal(true)}
                    className="gradient-premium border-0 flex-1 shadow-premium"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Desbloquear por R$ {recipe.price?.toFixed(2)}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant={isFavorite ? "default" : "outline"}
                      onClick={handleFavorite}
                      className="flex-1"
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                      {isFavorite ? "Favoritado" : "Favoritar"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          {isUnlocked ? (
            <>
              {/* Ingredients */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-card mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl flex items-center gap-2">
                    🛒 Ingredientes
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyShoppingList}
                  >
                    Copiar lista
                  </Button>
                </div>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <Checkbox
                        id={`ingredient-${index}`}
                        checked={checkedIngredients.includes(index)}
                        onCheckedChange={() => toggleIngredient(index)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={`ingredient-${index}`}
                        className={`flex-1 cursor-pointer select-none transition-all ${
                          checkedIngredients.includes(index)
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {ingredient}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-card mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl flex items-center gap-2">
                    👨‍🍳 Modo de Preparo
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetProgress}
                  >
                    Resetar
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">{Math.round(stepsProgress)}%</span>
                  </div>
                  <Progress value={stepsProgress} className="h-2" />
                </div>

                <ol className="space-y-4">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex gap-4 group">
                      <div className="flex-shrink-0 relative">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                            checkedSteps.includes(index)
                              ? "bg-primary/20 text-primary"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {checkedSteps.includes(index) ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            index + 1
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={`step-${index}`}
                            checked={checkedSteps.includes(index)}
                            onCheckedChange={() => toggleStep(index)}
                            className="mt-1"
                          />
                          <label
                            htmlFor={`step-${index}`}
                            className={`flex-1 pt-1 cursor-pointer select-none transition-all ${
                              checkedSteps.includes(index)
                                ? "text-muted-foreground"
                                : ""
                            }`}
                          >
                            {step}
                          </label>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              {recipe.tips.length > 0 && (
                <div className="bg-accent/20 border border-accent/30 rounded-xl p-6 md:p-8 mb-6">
                  <h2 className="font-display text-2xl mb-4 text-accent">Dicas Especiais</h2>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-accent mt-1">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutrition */}
              {recipe.nutrition.calories !== "-" && (
                <div className="bg-card rounded-xl p-6 md:p-8 shadow-card">
                  <h2 className="font-display text-2xl mb-4">Informações Nutricionais</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{recipe.nutrition.calories}</p>
                      <p className="text-sm text-muted-foreground">Calorias</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{recipe.nutrition.protein}</p>
                      <p className="text-sm text-muted-foreground">Proteínas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{recipe.nutrition.carbs}</p>
                      <p className="text-sm text-muted-foreground">Carboidratos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{recipe.nutrition.fat}</p>
                      <p className="text-sm text-muted-foreground">Gorduras</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-card rounded-xl p-12 text-center shadow-card">
              <Lock className="w-16 h-16 text-premium mx-auto mb-4" />
              <h3 className="font-display text-2xl mb-2">Conteúdo Premium</h3>
              <p className="text-muted-foreground mb-6">
                Desbloqueie esta receita para ver todos os ingredientes, modo de preparo e dicas exclusivas.
              </p>
              <Button
                onClick={() => setShowPaymentModal(true)}
                className="gradient-premium border-0 shadow-premium"
              >
                Desbloquear Agora por R$ {recipe.price?.toFixed(2)}
              </Button>
            </div>
          )}
        </div>
      </main>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        recipeName={recipe.title}
        price={recipe.price || 0}
        onSuccess={handleUnlock}
      />
    </div>
  );
};

export default RecipeDetail;
