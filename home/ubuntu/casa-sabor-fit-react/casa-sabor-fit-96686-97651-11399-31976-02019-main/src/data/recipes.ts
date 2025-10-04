export interface Recipe {
  id: string;
  title: string;
  category: string;
  isPremium: boolean;
  price?: number;
  prepTime: string;
  servings: string;
  difficulty: "Muito Fácil" | "Fácil" | "Médio" | "Difícil";
  ingredients: string[];
  instructions: string[];
  tips: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  badges: string[];
  image: string;
}

export const recipes: Recipe[] = [
  // Receitas Gratuitas
  {
    id: "bolo-cenoura",
    title: "Bolo de Cenoura com Cobertura de Chocolate",
    category: "Bolos",
    isPremium: false,
    prepTime: "40 min",
    servings: "12 fatias",
    difficulty: "Fácil",
    ingredients: [
      "3 cenouras médias",
      "3 ovos",
      "1/2 xícara de óleo de coco",
      "1 xícara de açúcar de coco",
      "2 xícaras de farinha de arroz",
      "1 colher (sopa) de fermento em pó",
      "1 pitada de sal",
      "Para a cobertura: 200g chocolate 70% cacau, 3 colheres creme de coco"
    ],
    instructions: [
      "Preaqueça o forno a 180°C e unte uma forma com óleo de coco",
      "Bata no liquidificador as cenouras, ovos e óleo até ficar homogêneo",
      "Em uma tigela, misture a farinha de arroz, açúcar de coco, fermento e sal",
      "Adicione a mistura líquida aos ingredientes secos e mexa delicadamente",
      "Despeje na forma e asse por 30-35 minutos",
      "Para a cobertura, derreta o chocolate com o creme de coco em banho-maria",
      "Cubra o bolo ainda morno e deixe esfriar antes de servir"
    ],
    tips: [
      "Para um bolo mais úmido, adicione 2 colheres de sopa de mel",
      "Teste o ponto com um palito - deve sair limpo",
      "A cobertura fica mais firme ao refrigerar por 1 hora"
    ],
    nutrition: {
      calories: "245 kcal",
      protein: "4g",
      carbs: "32g",
      fat: "12g"
    },
    badges: ["SEM GLÚTEN", "SEM LACTOSE", "SEM AÇÚCAR REFINADO"],
    image: "/placeholder.svg"
  },
  {
    id: "bolo-chocolate",
    title: "Bolo de Chocolate Fofinho",
    category: "Bolos",
    isPremium: false,
    prepTime: "50 min",
    servings: "10 fatias",
    difficulty: "Fácil",
    ingredients: [
      "2 xícaras de farinha de amêndoas",
      "1/2 xícara de cacau em pó 100%",
      "3 ovos",
      "1 xícara de açúcar de coco",
      "1/2 xícara de óleo de coco derretido",
      "1 xícara de leite de amêndoas",
      "1 colher (sopa) de fermento em pó",
      "1 colher (chá) de essência de baunilha"
    ],
    instructions: [
      "Preaqueça o forno a 180°C",
      "Misture os ingredientes secos (farinha, cacau, fermento)",
      "Em outra tigela, bata os ovos com o açúcar até ficar cremoso",
      "Adicione o óleo, leite e baunilha aos ovos",
      "Junte as misturas e mexa suavemente",
      "Despeje em forma untada e asse por 35-40 minutos"
    ],
    tips: [
      "Use cacau 100% para melhor sabor",
      "Não abra o forno nos primeiros 20 minutos",
      "Pode adicionar gotas de chocolate 70% na massa"
    ],
    nutrition: {
      calories: "220 kcal",
      protein: "6g",
      carbs: "24g",
      fat: "14g"
    },
    badges: ["SEM GLÚTEN", "SEM LACTOSE", "LOW CARB"],
    image: "/placeholder.svg"
  },
  {
    id: "pao-caseiro",
    title: "Pão Caseiro Integral",
    category: "Pães",
    isPremium: false,
    prepTime: "2 horas",
    servings: "16 fatias",
    difficulty: "Médio",
    ingredients: [
      "3 xícaras de farinha de arroz integral",
      "1 xícara de fécula de batata",
      "2 colheres (sopa) de psyllium",
      "1 colher (sopa) de fermento biológico seco",
      "1 colher (chá) de sal",
      "1 colher (sopa) de mel",
      "2 xícaras de água morna",
      "3 colheres (sopa) de azeite"
    ],
    instructions: [
      "Misture o fermento com a água morna e o mel, deixe descansar 10 minutos",
      "Em uma tigela grande, misture as farinhas, psyllium e sal",
      "Adicione o fermento ativado e o azeite",
      "Sove por 10 minutos até obter uma massa lisa",
      "Deixe descansar por 1 hora em local morno coberto com pano",
      "Modele o pão e coloque em forma untada",
      "Deixe crescer por mais 30 minutos",
      "Asse a 200°C por 35-40 minutos até dourar"
    ],
    tips: [
      "O psyllium ajuda a dar liga à massa sem glúten",
      "Para casca crocante, coloque uma forma com água no forno",
      "Deixe esfriar completamente antes de cortar"
    ],
    nutrition: {
      calories: "165 kcal",
      protein: "3g",
      carbs: "28g",
      fat: "4g"
    },
    badges: ["SEM GLÚTEN", "INTEGRAL", "VEGANO"],
    image: "/placeholder.svg"
  },
  {
    id: "pao-queijo",
    title: "Pão de Queijo Sem Glúten",
    category: "Pães",
    isPremium: false,
    prepTime: "30 min",
    servings: "20 unidades",
    difficulty: "Fácil",
    ingredients: [
      "2 xícaras de polvilho azedo",
      "1 xícara de polvilho doce",
      "1/2 xícara de óleo de coco",
      "1 xícara de leite de coco",
      "2 ovos",
      "1 colher (chá) de sal",
      "1 xícara de queijo vegano ralado (ou queijo de castanhas)"
    ],
    instructions: [
      "Ferva o leite de coco com o óleo e o sal",
      "Despeje sobre os polvilhos e misture bem",
      "Deixe amornar e adicione os ovos batidos",
      "Acrescente o queijo vegano e misture",
      "Faça bolinhas e coloque em assadeira untada",
      "Asse a 200°C por 25-30 minutos até dourar"
    ],
    tips: [
      "A massa fica muito grudenta, unte as mãos com óleo",
      "Pode congelar cru e assar direto do freezer",
      "Para versão sem lactose, use queijo vegano de castanhas"
    ],
    nutrition: {
      calories: "95 kcal",
      protein: "2g",
      carbs: "12g",
      fat: "5g"
    },
    badges: ["SEM GLÚTEN", "SEM LACTOSE", "VEGETARIANO"],
    image: "/placeholder.svg"
  },
  {
    id: "palha-italiana",
    title: "Palha Italiana Irresistível",
    category: "Doces",
    isPremium: false,
    prepTime: "20 min",
    servings: "12 porções",
    difficulty: "Muito Fácil",
    ingredients: [
      "200g de biscoito Maria sem glúten triturado",
      "1 lata de leite condensado de coco",
      "2 colheres (sopa) de manteiga de cacau",
      "3 colheres (sopa) de cacau em pó 100%",
      "1 colher (chá) de essência de baunilha",
      "Chocolate 70% picado para decorar"
    ],
    instructions: [
      "Em uma panela, misture o leite condensado, manteiga de cacau e cacau em pó",
      "Leve ao fogo médio, mexendo sempre até engrossar (cerca de 5 minutos)",
      "Adicione a baunilha e misture bem",
      "Desligue o fogo e adicione o biscoito triturado, misturando até incorporar",
      "Transfira para uma forma quadrada forrada com papel manteiga",
      "Alise a superfície e polvilhe o chocolate picado por cima",
      "Leve à geladeira por pelo menos 2 horas",
      "Corte em quadrados e sirva gelado"
    ],
    tips: [
      "Para um sabor mais intenso, use cacau 100%",
      "Conserve na geladeira por até 5 dias em pote fechado",
      "Pode congelar por até 1 mês"
    ],
    nutrition: {
      calories: "180 kcal",
      protein: "4g",
      carbs: "28g",
      fat: "6g"
    },
    badges: ["SEM GLÚTEN", "SEM LACTOSE", "DESTAQUE"],
    image: "/placeholder.svg"
  },
  {
    id: "cookies-aveia",
    title: "Cookies de Aveia",
    category: "Doces",
    isPremium: false,
    prepTime: "25 min",
    servings: "15 cookies",
    difficulty: "Fácil",
    ingredients: [
      "2 xícaras de aveia sem glúten",
      "1 banana madura amassada",
      "1/4 xícara de pasta de amendoim",
      "1/4 xícara de mel",
      "1/2 xícara de gotas de chocolate 70%",
      "1 colher (chá) de canela em pó",
      "1 pitada de sal"
    ],
    instructions: [
      "Preaqueça o forno a 180°C",
      "Amasse a banana e misture com pasta de amendoim e mel",
      "Adicione a aveia, canela e sal",
      "Por último, acrescente as gotas de chocolate",
      "Faça bolinhas e achate levemente em assadeira",
      "Asse por 12-15 minutos até dourar nas bordas"
    ],
    tips: [
      "Para cookies mais crocantes, asse por mais 2-3 minutos",
      "Pode substituir as gotas de chocolate por cranberries",
      "Guardar em pote fechado por até 1 semana"
    ],
    nutrition: {
      calories: "110 kcal",
      protein: "3g",
      carbs: "18g",
      fat: "4g"
    },
    badges: ["SEM GLÚTEN", "SEM LACTOSE", "NATURAL"],
    image: "/placeholder.svg"
  },
  {
    id: "brownie-fit",
    title: "Brownie Fit",
    category: "Doces",
    isPremium: false,
    prepTime: "35 min",
    servings: "12 quadrados",
    difficulty: "Fácil",
    ingredients: [
      "1 batata doce média cozida",
      "3 ovos",
      "1/2 xícara de cacau em pó 100%",
      "1/3 xícara de mel",
      "1/4 xícara de óleo de coco",
      "1 colher (chá) de essência de baunilha",
      "1/2 colher (chá) de fermento em pó",
      "1/4 xícara de chocolate 70% picado"
    ],
    instructions: [
      "Preaqueça o forno a 180°C",
      "Bata no liquidificador a batata doce, ovos, mel e óleo",
      "Adicione o cacau, baunilha e fermento, bata novamente",
      "Misture o chocolate picado",
      "Despeje em forma quadrada untada",
      "Asse por 25-30 minutos (centro deve ficar cremoso)",
      "Deixe esfriar completamente antes de cortar"
    ],
    tips: [
      "A batata doce deixa o brownie úmido e cremoso",
      "Não asse demais para manter a textura fudgy",
      "Fica ainda melhor no dia seguinte"
    ],
    nutrition: {
      calories: "135 kcal",
      protein: "4g",
      carbs: "16g",
      fat: "7g"
    },
    badges: ["SEM GLÚTEN", "SEM LACTOSE", "PROTEICO"],
    image: "/placeholder.svg"
  },
  {
    id: "substituicoes",
    title: "Guia de Substituições de Ingredientes",
    category: "Guias",
    isPremium: false,
    prepTime: "-",
    servings: "-",
    difficulty: "Fácil",
    ingredients: [
      "SUBSTITUTOS DE LEITE:",
      "- Leite de amêndoas, coco, aveia ou castanhas",
      "",
      "SUBSTITUTOS DE AÇÚCAR:",
      "- Açúcar de coco, tâmaras, mel, xilitol ou eritritol",
      "",
      "SUBSTITUTOS DE FARINHA DE TRIGO:",
      "- Farinha de arroz, amêndoas, coco ou mix sem glúten",
      "",
      "SUBSTITUTOS DE OVOS:",
      "- 1 ovo = 1 colher sopa de linhaça + 3 colheres água",
      "- 1 ovo = 1/4 xícara de purê de maçã",
      "",
      "SUBSTITUTOS DE MANTEIGA:",
      "- Óleo de coco, azeite, pasta de amendoim ou abacate"
    ],
    instructions: [
      "Use este guia como referência rápida",
      "Experimente diferentes combinações",
      "Ajuste proporções conforme necessário",
      "Anote suas preferências"
    ],
    tips: [
      "Comece com pequenas quantidades ao testar",
      "Nem toda substituição funciona em todas as receitas",
      "O sabor pode variar - isso é normal e delicioso!"
    ],
    nutrition: {
      calories: "-",
      protein: "-",
      carbs: "-",
      fat: "-"
    },
    badges: ["GUIA", "DICAS", "ESSENCIAL"],
    image: "/placeholder.svg"
  },

  // Receitas Premium
  {
    id: "bolo-aniversario",
    title: "Bolo de Aniversário 3 Camadas",
    category: "Bolos",
    isPremium: true,
    price: 9.90,
    prepTime: "2 horas",
    servings: "20 fatias",
    difficulty: "Difícil",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Esta receita premium contém técnicas avançadas de confeitaria"],
    tips: ["Desbloqueie para ver todas as dicas profissionais"],
    nutrition: {
      calories: "280 kcal",
      protein: "5g",
      carbs: "36g",
      fat: "14g"
    },
    badges: ["SEM GLÚTEN", "SEM LACTOSE", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "torta-limao",
    title: "Torta de Limão Vegana",
    category: "Doces",
    isPremium: true,
    price: 9.90,
    prepTime: "90 min",
    servings: "12 fatias",
    difficulty: "Médio",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Aprenda a fazer a massa crocante e o recheio cremoso perfeitos"],
    tips: ["Desbloqueie para técnicas secretas"],
    nutrition: {
      calories: "195 kcal",
      protein: "3g",
      carbs: "28g",
      fat: "9g"
    },
    badges: ["SEM GLÚTEN", "VEGANO", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "pao-fermentacao",
    title: "Pão de Fermentação Natural",
    category: "Pães",
    isPremium: true,
    price: 9.90,
    prepTime: "3 dias",
    servings: "20 fatias",
    difficulty: "Difícil",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Domine a arte da fermentação natural sem glúten"],
    tips: ["Inclui guia completo de cultivo de starter"],
    nutrition: {
      calories: "155 kcal",
      protein: "4g",
      carbs: "26g",
      fat: "3g"
    },
    badges: ["SEM GLÚTEN", "ARTESANAL", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "croissant",
    title: "Croissant Sem Glúten",
    category: "Pães",
    isPremium: true,
    price: 9.90,
    prepTime: "4 horas",
    servings: "12 unidades",
    difficulty: "Difícil",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Técnica francesa adaptada para sem glúten"],
    tips: ["Tutorial com fotos passo a passo"],
    nutrition: {
      calories: "215 kcal",
      protein: "4g",
      carbs: "24g",
      fat: "12g"
    },
    badges: ["SEM GLÚTEN", "FRANCÊS", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "brigadeiro",
    title: "Brigadeiro Gourmet Fit",
    category: "Doces",
    isPremium: true,
    price: 9.90,
    prepTime: "45 min",
    servings: "30 unidades",
    difficulty: "Médio",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["5 variações gourmet incluídas"],
    tips: ["Técnicas de modelagem profissional"],
    nutrition: {
      calories: "45 kcal",
      protein: "1g",
      carbs: "6g",
      fat: "2g"
    },
    badges: ["SEM GLÚTEN", "SEM AÇÚCAR", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "cheesecake",
    title: "Cheesecake Proteico",
    category: "Doces",
    isPremium: true,
    price: 9.90,
    prepTime: "6 horas",
    servings: "16 fatias",
    difficulty: "Médio",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Versão high protein com cobertura de frutas vermelhas"],
    tips: ["Segredos para textura cremosa perfeita"],
    nutrition: {
      calories: "165 kcal",
      protein: "12g",
      carbs: "18g",
      fat: "6g"
    },
    badges: ["SEM GLÚTEN", "PROTEICO", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "panettone",
    title: "Panettone Sem Glúten",
    category: "Bolos",
    isPremium: true,
    price: 9.90,
    prepTime: "8 horas",
    servings: "24 fatias",
    difficulty: "Difícil",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Tradicional italiano adaptado"],
    tips: ["Guia completo de fermentação e crescimento"],
    nutrition: {
      calories: "235 kcal",
      protein: "5g",
      carbs: "32g",
      fat: "11g"
    },
    badges: ["SEM GLÚTEN", "ITALIANO", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "pavlova-fit",
    title: "Pavlova Fit",
    category: "Sobremesas",
    isPremium: true,
    price: 9.90,
    prepTime: "2h",
    servings: "8 fatias",
    difficulty: "Médio",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Merengue crocante com frutas vermelhas frescas"],
    tips: ["Desbloqueie para técnicas secretas"],
    nutrition: {
      calories: "125 kcal",
      protein: "3g",
      carbs: "18g",
      fat: "5g"
    },
    badges: ["SEM GLÚTEN", "SEM LACTOSE", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "quindim-sem-acucar",
    title: "Quindim Sem Açúcar",
    category: "Sobremesas",
    isPremium: true,
    price: 8.90,
    prepTime: "1h",
    servings: "12 unidades",
    difficulty: "Fácil",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Versão saudável do clássico brasileiro"],
    tips: ["Desbloqueie para o segredo da textura perfeita"],
    nutrition: {
      calories: "95 kcal",
      protein: "4g",
      carbs: "12g",
      fat: "4g"
    },
    badges: ["SEM GLÚTEN", "SEM AÇÚCAR", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "mousse-maracuja",
    title: "Mousse de Maracujá Proteico",
    category: "Sobremesas",
    isPremium: true,
    price: 9.90,
    prepTime: "3h",
    servings: "6 porções",
    difficulty: "Fácil",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Mousse cremoso com proteína whey"],
    tips: ["Desbloqueie para variações de sabor"],
    nutrition: {
      calories: "110 kcal",
      protein: "15g",
      carbs: "8g",
      fat: "3g"
    },
    badges: ["SEM GLÚTEN", "PROTEICO", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "petit-gateau",
    title: "Petit Gateau Fitness",
    category: "Sobremesas",
    isPremium: true,
    price: 11.90,
    prepTime: "40 min",
    servings: "4 unidades",
    difficulty: "Médio",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Bolo de chocolate com interior cremoso"],
    tips: ["Desbloqueie para o timing perfeito"],
    nutrition: {
      calories: "185 kcal",
      protein: "8g",
      carbs: "20g",
      fat: "9g"
    },
    badges: ["SEM GLÚTEN", "SEM LACTOSE", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "torta-red-velvet",
    title: "Torta Red Velvet",
    category: "Bolos",
    isPremium: true,
    price: 13.90,
    prepTime: "2h",
    servings: "12 fatias",
    difficulty: "Médio",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Bolo vermelho aveludado com cobertura de cream cheese vegano"],
    tips: ["Desbloqueie para técnicas profissionais"],
    nutrition: {
      calories: "240 kcal",
      protein: "5g",
      carbs: "32g",
      fat: "11g"
    },
    badges: ["SEM GLÚTEN", "VEGANO", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "macarons",
    title: "Macarons Coloridos",
    category: "Doces",
    isPremium: true,
    price: 16.90,
    prepTime: "3h",
    servings: "20 unidades",
    difficulty: "Difícil",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Técnica francesa adaptada para sem glúten"],
    tips: ["Tutorial com fotos passo a passo incluído"],
    nutrition: {
      calories: "75 kcal",
      protein: "2g",
      carbs: "10g",
      fat: "3g"
    },
    badges: ["SEM GLÚTEN", "FRANCÊS", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "tiramisu-fit",
    title: "Tiramisu Fit",
    category: "Sobremesas",
    isPremium: true,
    price: 11.90,
    prepTime: "4h",
    servings: "8 porções",
    difficulty: "Médio",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Versão italiana saudável com café e cream cheese proteico"],
    tips: ["Desbloqueie para o segredo da cremosidade"],
    nutrition: {
      calories: "155 kcal",
      protein: "10g",
      carbs: "16g",
      fat: "6g"
    },
    badges: ["SEM GLÚTEN", "PROTEICO", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "profiteroles",
    title: "Profiteroles",
    category: "Doces",
    isPremium: true,
    price: 14.90,
    prepTime: "2h30",
    servings: "15 unidades",
    difficulty: "Difícil",
    ingredients: ["Receita bloqueada - Faça upgrade para acessar"],
    instructions: ["Massa choux sem glúten com recheio de creme"],
    tips: ["Desbloqueie para técnicas avançadas"],
    nutrition: {
      calories: "125 kcal",
      protein: "4g",
      carbs: "14g",
      fat: "6g"
    },
    badges: ["SEM GLÚTEN", "FRANCÊS", "PREMIUM"],
    image: "/placeholder.svg"
  },
  {
    id: "ebook-completo",
    title: "E-book Completo: 50 Receitas Premium",
    category: "E-books",
    isPremium: true,
    price: 49.90,
    prepTime: "-",
    servings: "50 receitas",
    difficulty: "Médio",
    ingredients: ["50 receitas premium exclusivas"],
    instructions: [
      "Todas as receitas premium desbloqueadas",
      "Guias completos de técnicas",
      "Planos de refeições semanais",
      "Listas de compras organizadas"
    ],
    tips: [
      "Economize R$ 445 comprando o pacote completo",
      "Acesso vitalício a todas as atualizações",
      "Suporte prioritário"
    ],
    nutrition: {
      calories: "-",
      protein: "-",
      carbs: "-",
      fat: "-"
    },
    badges: ["PREMIUM", "E-BOOK", "MELHOR VALOR"],
    image: "/placeholder.svg"
  }
];
