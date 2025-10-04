import { Sidebar } from "@/components/Sidebar";
import { Heart, MessageCircle, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface FeedPost {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  type: "receita" | "dica" | "pergunta";
}

const feedPosts: FeedPost[] = [
  {
    id: "1",
    author: "Marina Santos",
    avatar: "/placeholder.svg",
    time: "há 2 horas",
    content: "Acabei de fazer o Bolo de Cenoura e ficou PERFEITO! 🥕✨ A dica de usar açúcar de coco realmente faz diferença no sabor. Quem mais já experimentou?",
    image: "/placeholder.svg",
    likes: 47,
    comments: 12,
    type: "receita"
  },
  {
    id: "2",
    author: "Carlos Mendes",
    avatar: "/placeholder.svg",
    time: "há 5 horas",
    content: "💡 DICA RÁPIDA: Ao fazer pães sem glúten, sempre deixe a massa descansar por pelo menos 1 hora. Isso ajuda o psyllium a hidratar completamente e dar melhor liga à massa!",
    likes: 89,
    comments: 23,
    type: "dica"
  },
  {
    id: "3",
    author: "Ana Paula",
    avatar: "/placeholder.svg",
    time: "há 1 dia",
    content: "Alguém tem dicas para substituir ovos em receitas de bolo? Estou tentando fazer versões 100% veganas das receitas 🌱",
    likes: 34,
    comments: 18,
    type: "pergunta"
  },
  {
    id: "4",
    author: "Roberto Silva",
    avatar: "/placeholder.svg",
    time: "há 1 dia",
    content: "Os Cookies de Aveia são viciantes! Já fiz 3 vezes essa semana 😅 Minha família adora. Alguém mais está nessa?",
    image: "/placeholder.svg",
    likes: 56,
    comments: 15,
    type: "receita"
  },
  {
    id: "5",
    author: "Juliana Costa",
    avatar: "/placeholder.svg",
    time: "há 2 dias",
    content: "🎥 Novo vídeo: Como fazer fermentação natural para pães sem glúten! Demorou 3 dias mas o resultado é INCRÍVEL. Link na bio!",
    likes: 124,
    comments: 31,
    type: "dica"
  }
];

const Feed = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl mb-3">Feed da Comunidade</h1>
            <p className="text-muted-foreground text-lg">
              Compartilhe experiências e aprenda com outros apaixonados por receitas saudáveis
            </p>
          </div>

          {/* New Post */}
          <div className="bg-card rounded-xl p-6 shadow-card mb-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary-foreground">MS</span>
              </div>
              <input
                type="text"
                placeholder="Compartilhe sua experiência com a comunidade..."
                className="flex-1 bg-background rounded-lg px-4 py-2 outline-none border border-border focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Feed Posts */}
          <div className="space-y-6">
            {feedPosts.map((post) => (
              <article key={post.id} className="bg-card rounded-xl shadow-card overflow-hidden">
                {/* Post Header */}
                <div className="p-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0">
                    <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{post.author}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{post.time}</span>
                      {post.type === "dica" && (
                        <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-medium ml-2">
                          DICA
                        </span>
                      )}
                      {post.type === "pergunta" && (
                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-medium ml-2">
                          PERGUNTA
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <p className="text-foreground leading-relaxed">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="px-6 pb-4">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full rounded-lg max-h-96 object-cover"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="px-6 py-4 border-t border-border flex items-center gap-6">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Carregar mais posts
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;
