import { LucideIcon, Lock } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  locked?: boolean;
}

export const CategoryCard = ({ icon: Icon, title, description, path, locked }: CategoryCardProps) => {
  return (
    <Link
      to={locked ? "#" : path}
      className={`relative bg-card rounded-xl p-6 hover-lift shadow-card ${
        locked ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {locked && (
        <div className="absolute top-4 right-4 bg-muted rounded-full p-2">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
      <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-primary-foreground" />
      </div>
      <h3 className="font-display text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {locked && (
        <div className="mt-4 inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
          Em Breve
        </div>
      )}
    </Link>
  );
};
