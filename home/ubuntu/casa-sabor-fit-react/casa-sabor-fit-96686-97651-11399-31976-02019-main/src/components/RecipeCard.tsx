import { Clock, Users, Lock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Recipe } from "@/data/recipes";
import { Badge } from "./ui/badge";

interface RecipeCardProps {
  recipe: Recipe;
  unlocked?: boolean;
}

export const RecipeCard = ({ recipe, unlocked = false }: RecipeCardProps) => {
  return (
    <Link
      to={`/receita/${recipe.id}`}
      className="bg-card rounded-xl overflow-hidden hover-lift shadow-card group"
    >
      <div className="relative h-48 bg-muted">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        {recipe.isPremium && !unlocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Lock className="w-12 h-12 text-premium" />
          </div>
        )}
        {recipe.isPremium && unlocked && (
          <div className="absolute top-4 right-4 bg-premium text-premium-foreground px-3 py-1 rounded-full text-sm font-bold">
            DESBLOQUEADO
          </div>
        )}
        {recipe.isPremium && !unlocked && (
          <div className="absolute top-4 left-4 gradient-premium text-premium-foreground px-3 py-1 rounded-full text-sm font-bold shadow-premium">
            PREMIUM
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg mb-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
        </div>
        {recipe.isPremium && recipe.price && !unlocked && (
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-premium">
                R$ {recipe.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                Compra única
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
