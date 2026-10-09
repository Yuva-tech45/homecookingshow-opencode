export type RecipeCategory =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Snacks"
  | "Desserts";

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  note?: string;
}

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  category: RecipeCategory;
  vegetarian: boolean;
  veganOption?: boolean;
  glutenFree?: boolean;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Comfort";
  spiceLevel: "Mild" | "Medium" | "Warming";
  image: string;
  imageAlt: string;
  tags: string[];
  ingredients: RecipeIngredient[];
  instructions: string[];
  tips: string[];
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const RECIPES: Recipe[] = [
  {
    slug: "masala-dosa-with-coconut-chutney",
    title: "Crisp Masala Dosa with Coconut Chutney",
    description:
      "Golden, crisp rice-and-lentil crepes wrapped around a softly spiced potato masala. A weekend breakfast worth waking up for, with chutney and sambar on the side.",
    category: "Breakfast",
    vegetarian: true,
    veganOption: true,
    glutenFree: true,
    prepMinutes: 20,
    cookMinutes: 30,
    servings: 4,
    difficulty: "Medium",
    spiceLevel: "Mild",
    image: img("photo-1606491956689-2ea866880c84"),
    imageAlt: "Crisp masala dosa served with chutneys",
    tags: ["dosa", "potato", "coconut", "chutney", "south indian", "fermented", "tiffin"],
    ingredients: [
      { name: "Dosa batter (fermented)", quantity: 4, unit: "cups" },
      { name: "Potatoes, boiled & cubed", quantity: 500, unit: "g" },
      { name: "Onion, thinly sliced", quantity: 2, unit: "medium" },
      { name: "Green chillies, slit", quantity: 2, unit: "pieces" },
      { name: "Fresh ginger, grated", quantity: 1, unit: "tbsp" },
      { name: "Mustard seeds", quantity: 1, unit: "tsp" },
      { name: "Turmeric powder", quantity: 0.5, unit: "tsp" },
      { name: "Curry leaves", quantity: 10, unit: "leaves" },
      { name: "Fresh coconut, grated", quantity: 1, unit: "cup" },
      { name: "Roasted chana dal", quantity: 2, unit: "tbsp" },
      { name: "Sesame oil or ghee", quantity: 3, unit: "tbsp" },
      { name: "Salt", quantity: 1.5, unit: "tsp", note: "to taste" },
    ],
    instructions: [
      "Warm 1 tablespoon oil in a kadai. Splutter mustard seeds and curry leaves, then soften onion, green chillies and ginger for 4 minutes.",
      "Add turmeric and boiled potatoes with salt. Mash lightly so some chunks remain. Add a splash of water, simmer 3 minutes and keep warm.",
      "Grind coconut, roasted chana dal, green chilli, ginger and salt with warm water into a smooth chutney. Temper with mustard seeds if you like.",
      "Heat a cast-iron tawa until medium-hot. Sprinkle water, wipe, then ladle and spiral the batter thin.",
      "Drizzle oil around the edges. Cook 2–3 minutes until deep golden and crisp.",
      "Spoon potato masala down the centre, fold and serve immediately with chutney.",
    ],
    tips: [
      "The tawa must be hot but not smoking — test with a few drops of water that sizzle and vanish.",
      "Keep finished dosas on a wire rack, not stacked, so they stay crisp.",
      "Leftover masala makes excellent sandwich filling the next day.",
    ],
  },
  {
    slug: "paneer-butter-masala",
    title: "Paneer Butter Masala",
    description:
      "Soft paneer folded into a silky tomato-cashew makhani gravy. Restaurant comfort made gently at home — mild, creamy and perfect with naan or jeera rice.",
    category: "Dinner",
    vegetarian: true,
    glutenFree: true,
    prepMinutes: 15,
    cookMinutes: 25,
    servings: 4,
    difficulty: "Easy",
    spiceLevel: "Mild",
    image: img("photo-1631452180519-c014fe946bc7"),
    imageAlt: "Creamy paneer butter masala in a bowl",
    tags: ["paneer", "makhani", "tomato", "cashew", "gravy", "north indian", "curry"],
    ingredients: [
      { name: "Paneer, cubed", quantity: 400, unit: "g" },
      { name: "Tomatoes, roughly chopped", quantity: 500, unit: "g" },
      { name: "Cashews, soaked", quantity: 0.33, unit: "cup" },
      { name: "Butter", quantity: 3, unit: "tbsp" },
      { name: "Fresh cream", quantity: 0.25, unit: "cup" },
      { name: "Ginger-garlic paste", quantity: 1, unit: "tbsp" },
      { name: "Kashmiri chilli powder", quantity: 1.5, unit: "tsp" },
      { name: "Garam masala", quantity: 1, unit: "tsp" },
      { name: "Kasuri methi", quantity: 1, unit: "tsp" },
      { name: "Honey or sugar", quantity: 1, unit: "tsp" },
      { name: "Salt", quantity: 1.25, unit: "tsp", note: "to taste" },
    ],
    instructions: [
      "Simmer tomatoes, cashews and half the butter with 1 cup water for 10 minutes until soft. Cool and blend silky-smooth.",
      "Melt remaining butter, sauté ginger-garlic paste 1 minute, then add chilli powder off the heat so it blooms without burning.",
      "Pour in the blended gravy, add salt and honey. Simmer 8 minutes until it coats a spoon.",
      "Add paneer cubes and garam masala. Simmer gently 4 minutes — avoid boiling hard so the paneer stays soft.",
      "Crush kasuri methi between palms, stir in with cream. Rest 5 minutes before serving.",
    ],
    tips: [
      "Soak shop-bought paneer in warm salted water for 10 minutes for a softer bite.",
      "For a vegan version, swap paneer for tofu, butter for oil and cream for cashew cream.",
      "Kashmiri chilli gives colour without fierce heat — use it for that makhani glow.",
    ],
  },
  {
    slug: "hyderabadi-chicken-biryani",
    title: "Hyderabadi Chicken Dum Biryani",
    description:
      "Layered basmati and saffron-kissed chicken, sealed and slow-steamed on dum. A celebration dish with crispy onions, mint and real Sunday-special energy.",
    category: "Lunch",
    vegetarian: false,
    glutenFree: true,
    prepMinutes: 40,
    cookMinutes: 50,
    servings: 6,
    difficulty: "Comfort",
    spiceLevel: "Warming",
    image: img("photo-1589302168068-964664d93dc0"),
    imageAlt: "Chicken dum biryani topped with fried onions",
    tags: ["biryani", "chicken", "basmati", "dum", "saffron", "hyderabadi", "rice"],
    ingredients: [
      { name: "Chicken, bone-in pieces", quantity: 750, unit: "g" },
      { name: "Basmati rice, soaked", quantity: 500, unit: "g" },
      { name: "Yogurt, whisked", quantity: 1, unit: "cup" },
      { name: "Fried onions (birista)", quantity: 1.5, unit: "cups" },
      { name: "Mint leaves, chopped", quantity: 0.5, unit: "cup" },
      { name: "Coriander leaves, chopped", quantity: 0.5, unit: "cup" },
      { name: "Biryani masala", quantity: 2, unit: "tbsp" },
      { name: "Saffron soaked in warm milk", quantity: 0.25, unit: "cup" },
      { name: "Ghee", quantity: 3, unit: "tbsp" },
      { name: "Whole spices (bay, cardamom, cloves)", quantity: 1, unit: "tbsp" },
      { name: "Lemon juice", quantity: 2, unit: "tbsp" },
      { name: "Salt", quantity: 2, unit: "tsp", note: "to taste" },
    ],
    instructions: [
      "Marinate chicken with yogurt, biryani masala, half the fried onions, mint, coriander, lemon and salt for at least 30 minutes.",
      "Parboil rice with whole spices and salt until 70% done — grains should still bite. Drain immediately.",
      "Layer marinated chicken in a heavy pot, top with rice, remaining onions, saffron milk and ghee.",
      "Seal with a tight lid or dough. Cook on high 5 minutes, then low 35 minutes on dum.",
      "Rest sealed for 10 minutes. Open, fluff gently from the sides and serve with raita.",
    ],
    tips: [
      "70% rice is the whole secret — fully cooked rice turns mushy on dum.",
      "A tawa under the pot diffuses heat and prevents the bottom layer catching.",
      "Serve with simple onion-tomato raita to balance the warmth.",
    ],
  },
  {
    slug: "sambar-vegetable-lentil-stew",
    title: "Homestyle Vegetable Sambar",
    description:
      "Toor dal simmered with drumstick, carrots and pumpkin in tangy tamarind-sambar broth. Everyday comfort that pairs with rice, idli or dosa.",
    category: "Lunch",
    vegetarian: true,
    veganOption: true,
    glutenFree: true,
    prepMinutes: 15,
    cookMinutes: 30,
    servings: 5,
    difficulty: "Easy",
    spiceLevel: "Medium",
    image: img("photo-1546833999-b9f581a1996d"),
    imageAlt: "Lentil and vegetable sambar bowl",
    tags: ["sambar", "dal", "lentils", "tamarind", "vegetables", "south indian", "stew"],
    ingredients: [
      { name: "Toor dal, rinsed", quantity: 1, unit: "cup" },
      { name: "Mixed vegetables (carrot, pumpkin, beans)", quantity: 3, unit: "cups" },
      { name: "Tamarind pulp", quantity: 2, unit: "tbsp" },
      { name: "Sambar powder", quantity: 2.5, unit: "tbsp" },
      { name: "Turmeric powder", quantity: 0.5, unit: "tsp" },
      { name: "Shallots, halved", quantity: 8, unit: "pieces" },
      { name: "Tomato, chopped", quantity: 1, unit: "large" },
      { name: "Mustard seeds", quantity: 1, unit: "tsp" },
      { name: "Curry leaves", quantity: 12, unit: "leaves" },
      { name: "Sesame oil", quantity: 2, unit: "tbsp" },
      { name: "Salt", quantity: 1.5, unit: "tsp", note: "to taste" },
    ],
    instructions: [
      "Pressure-cook toor dal with turmeric until completely soft. Mash until creamy.",
      "Simmer vegetables, shallots and tomato in 3 cups water with salt for 10 minutes.",
      "Stir in tamarind, sambar powder and mashed dal. Simmer 10 minutes to marry flavours.",
      "Temper mustard seeds, curry leaves and dried red chillies in sesame oil; pour over sambar.",
      "Rest 10 minutes before serving so the tempering perfumes the dal.",
    ],
    tips: [
      "Add vegetables in order of density — carrots first, pumpkin later.",
      "A pinch of jaggery rounds out tamarind sharpness.",
      "Sambar thickens on standing; loosen with hot water when reheating.",
    ],
  },
  {
    slug: "chole-amritsari-with-bhature",
    title: "Amritsari Chole",
    description:
      "Dark, tangy chickpeas brewed with tea, anardana and hand-pounded spices. Bold dhaba flavour for a slow weekend lunch with bhature or jeera rice.",
    category: "Lunch",
    vegetarian: true,
    veganOption: true,
    prepMinutes: 15,
    cookMinutes: 40,
    servings: 5,
    difficulty: "Medium",
    spiceLevel: "Warming",
    image: img("photo-1626132647523-66f5bf380027"),
    imageAlt: "Amritsari chole chickpea curry",
    tags: ["chole", "chickpeas", "punjabi", "dhaba", "amritsari", "curry"],
    ingredients: [
      { name: "Kabuli chana, soaked overnight", quantity: 2, unit: "cups" },
      { name: "Onions, finely chopped", quantity: 2, unit: "large" },
      { name: "Tomato puree", quantity: 1, unit: "cup" },
      { name: "Ginger, julienned", quantity: 2, unit: "tbsp" },
      { name: "Chole masala", quantity: 2.5, unit: "tbsp" },
      { name: "Anardana (pomegranate) powder", quantity: 1, unit: "tsp" },
      { name: "Tea bag (for colour)", quantity: 1, unit: "piece" },
      { name: "Ghee or mustard oil", quantity: 3, unit: "tbsp" },
      { name: "Green chillies", quantity: 2, unit: "pieces" },
      { name: "Salt", quantity: 1.5, unit: "tsp", note: "to taste" },
    ],
    instructions: [
      "Pressure-cook soaked chana with salt and a tea bag for 5–6 whistles until tender but intact. Discard tea bag.",
      "Brown onions deeply in ghee — 12 minutes of patience builds the base.",
      "Add ginger, chole masala and tomato puree. Cook until oil glistens at the edges.",
      "Add chickpeas with their cooking liquor plus anardana. Simmer 15 minutes, lightly mashing a few for body.",
      "Finish with ginger juliennes, green chillies and a spoon of ghee.",
    ],
    tips: [
      "The tea bag is only for that deep Amritsari colour — it adds no tea flavour.",
      "Day-two chole tastes even better as the spices settle.",
      "Freeze soaked-and-cooked chana in portions for fast weeknight chole.",
    ],
  },
  {
    slug: "crispy-punjabi-samosa",
    title: "Crispy Punjabi Samosa",
    description:
      "Flaky, bubbled pastry around tangy potato-pea filling with ajwain warmth. The 4pm snack that never misses, with mint and tamarind chutneys.",
    category: "Snacks",
    vegetarian: true,
    veganOption: true,
    prepMinutes: 30,
    cookMinutes: 35,
    servings: 6,
    difficulty: "Comfort",
    spiceLevel: "Medium",
    image: img("photo-1601050690597-df0568f70950"),
    imageAlt: "Crispy punjabi samosas with chutneys",
    tags: ["samosa", "potato", "peas", "snack", "punjabi", "tea-time", "fried"],
    ingredients: [
      { name: "All-purpose flour (maida)", quantity: 3, unit: "cups" },
      { name: "Ajwain (carom seeds)", quantity: 1, unit: "tsp" },
      { name: "Ghee or oil (for moyan)", quantity: 6, unit: "tbsp" },
      { name: "Potatoes, boiled", quantity: 500, unit: "g" },
      { name: "Green peas", quantity: 0.5, unit: "cup" },
      { name: "Cumin seeds", quantity: 1, unit: "tsp" },
      { name: "Amchur (dry mango) powder", quantity: 1.5, unit: "tsp" },
      { name: "Garam masala", quantity: 1, unit: "tsp" },
      { name: "Green chillies, minced", quantity: 2, unit: "pieces" },
      { name: "Oil for deep-frying", quantity: 1, unit: "litre" },
      { name: "Salt", quantity: 1.5, unit: "tsp", note: "divided" },
    ],
    instructions: [
      "Rub flour with salt, ajwain and warm ghee until breadcrumb-like. Knead a stiff dough with water; rest 30 minutes.",
      "Temper cumin, chillies and peas. Add crumbled potatoes, amchur, garam masala and salt. Cool completely.",
      "Roll ovals, halve, form cones and seal with water. Fill two-thirds, pleat and seal tightly.",
      "Fry in medium-low oil (150–160°C) for 12–15 minutes until deep golden — low and slow keeps them crisp.",
      "Drain upright on a rack. Serve warm with both chutneys.",
    ],
    tips: [
      "Stiff dough and cool filling prevent soggy, bursting samosas.",
      "Never fry on high heat — the shell browns before the inside crisps.",
      "Freeze shaped, unfried samosas; fry straight from frozen adding 3 minutes.",
    ],
  },
  {
    slug: "tomato-rasam-pepper-comfort",
    title: "Pepper Tomato Rasam",
    description:
      "Thin, peppery tomato-tamarind broth that fixes rainy evenings and tired throats. Light, fiery and deeply comforting with hot rice and ghee.",
    category: "Dinner",
    vegetarian: true,
    veganOption: true,
    glutenFree: true,
    prepMinutes: 10,
    cookMinutes: 20,
    servings: 4,
    difficulty: "Easy",
    spiceLevel: "Warming",
    image: img("photo-1547592166-23ac45744acd"),
    imageAlt: "Hot tomato rasam soup",
    tags: ["rasam", "tomato", "pepper", "soup", "tamarind", "comfort", "south indian"],
    ingredients: [
      { name: "Ripe tomatoes, crushed", quantity: 4, unit: "medium" },
      { name: "Tamarind pulp", quantity: 1.5, unit: "tbsp" },
      { name: "Black peppercorns, crushed", quantity: 1.5, unit: "tsp" },
      { name: "Cumin seeds, crushed", quantity: 1, unit: "tsp" },
      { name: "Garlic cloves, crushed", quantity: 5, unit: "pieces" },
      { name: "Rasam powder", quantity: 1.5, unit: "tsp" },
      { name: "Mustard seeds", quantity: 1, unit: "tsp" },
      { name: "Curry leaves", quantity: 10, unit: "leaves" },
      { name: "Ghee", quantity: 1.5, unit: "tbsp" },
      { name: "Coriander leaves", quantity: 0.25, unit: "cup" },
      { name: "Salt", quantity: 1.25, unit: "tsp", note: "to taste" },
    ],
    instructions: [
      "Simmer tomatoes, tamarind, salt, rasam powder and 4 cups water for 8 minutes.",
      "Add crushed pepper, cumin and garlic. Simmer 5 more minutes until garlicky and fragrant.",
      "Temper mustard and curry leaves in ghee; stir into rasam.",
      "Bring just to a frothy boil — then switch off. Never hard-boil rasam.",
      "Garnish with coriander and serve steaming hot.",
    ],
    tips: [
      "Frothy-top, not rolling boil — overboiling dulls rasam's brightness.",
      "Add a ladle of cooked dal for a heartier version.",
      "Sip like soup when nursing a cold; pour over rice for dinner.",
    ],
  },
  {
    slug: "vegetable-khichdi-ghee-tadka",
    title: "Moong Dal Vegetable Khichdi",
    description:
      "One-pot rice and moong dal with carrots, beans and a ghee-cumin tadka. The gentlest weeknight reset — soft, nourishing and ready in 30 minutes.",
    category: "Dinner",
    vegetarian: true,
    glutenFree: true,
    prepMinutes: 10,
    cookMinutes: 25,
    servings: 4,
    difficulty: "Easy",
    spiceLevel: "Mild",
    image: img("photo-1512058564366-18510be2db19"),
    imageAlt: "Vegetable khichdi rice bowl",
    tags: ["khichdi", "dal", "rice", "one-pot", "comfort", "weeknight"],
    ingredients: [
      { name: "Basmati or short-grain rice", quantity: 1, unit: "cup" },
      { name: "Moong dal, rinsed", quantity: 0.75, unit: "cup" },
      { name: "Mixed vegetables, chopped", quantity: 2, unit: "cups" },
      { name: "Turmeric powder", quantity: 0.5, unit: "tsp" },
      { name: "Cumin seeds", quantity: 1, unit: "tsp" },
      { name: "Ginger, grated", quantity: 1, unit: "tbsp" },
      { name: "Ghee", quantity: 2, unit: "tbsp" },
      { name: "Asafoetida (hing)", quantity: 0.25, unit: "tsp" },
      { name: "Salt", quantity: 1.5, unit: "tsp", note: "to taste" },
    ],
    instructions: [
      "Rinse rice and dal together. Sauté in 1 tablespoon ghee with turmeric 1 minute for nuttiness.",
      "Add vegetables, ginger, salt and 4.5 cups hot water.",
      "Pressure-cook 3 whistles (or simmer covered 22 minutes) until soft and porridgy.",
      "Temper cumin and hing in remaining ghee until fragrant; pour over khichdi.",
      "Rest 5 minutes. Serve with yogurt, pickle and papad.",
    ],
    tips: [
      "Adjust water for your texture — 4 cups for separate grains, 5 for soft comfort.",
      "A squeeze of lemon at the table lifts the whole bowl.",
      "Great next-day tiffin: loosen with water and reheat gently.",
    ],
  },
  {
    slug: "rava-upma-fluffy-breakfast",
    title: "Fluffy Rava Upma",
    description:
      "Roasted semolina steamed with onions, ginger, carrots and peas — light yet satisfying. A 20-minute tiffin that tastes like a calm morning.",
    category: "Breakfast",
    vegetarian: true,
    veganOption: true,
    prepMinutes: 10,
    cookMinutes: 15,
    servings: 3,
    difficulty: "Easy",
    spiceLevel: "Mild",
    image: img("photo-1589301760014-d929f3979dbc"),
    imageAlt: "Rava upma breakfast bowl",
    tags: ["upma", "rava", "semolina", "tiffin", "breakfast", "south indian"],
    ingredients: [
      { name: "Fine rava (semolina)", quantity: 1, unit: "cup" },
      { name: "Onion, chopped", quantity: 1, unit: "large" },
      { name: "Mixed vegetables (carrot, peas, beans)", quantity: 1, unit: "cup" },
      { name: "Green chillies, slit", quantity: 2, unit: "pieces" },
      { name: "Ginger, minced", quantity: 1, unit: "tbsp" },
      { name: "Mustard seeds", quantity: 1, unit: "tsp" },
      { name: "Urad dal", quantity: 1, unit: "tsp" },
      { name: "Curry leaves", quantity: 8, unit: "leaves" },
      { name: "Ghee or oil", quantity: 2, unit: "tbsp" },
      { name: "Lemon juice", quantity: 1, unit: "tbsp" },
      { name: "Salt", quantity: 1, unit: "tsp", note: "to taste" },
    ],
    instructions: [
      "Dry-roast rava on medium heat 5 minutes until fragrant and pale gold. Set aside.",
      "Temper mustard, urad dal and curry leaves in ghee. Soften onion, chillies and ginger.",
      "Add vegetables with salt and 2.5 cups water. Bring to a rolling boil.",
      "Rain in roasted rava while stirring to avoid lumps. Cover and steam 3 minutes on low.",
      "Fluff, add lemon juice and serve with coconut chutney or sugar.",
    ],
    tips: [
      "Roasting rava is non-negotiable — it keeps upma fluffy, not gummy.",
      "Water ratio 1:2.5 (rava:water) gives soft, spoonable upma.",
      "Stir in a spoon of ghee at the end for aroma.",
    ],
  },
  {
    slug: "palak-paneer-homestyle",
    title: "Homestyle Palak Paneer",
    description:
      "Vibrant spinach simmered with garlic, green chilli and soft paneer — fresh, iron-rich and weeknight-fast. No cream needed for a luscious finish.",
    category: "Dinner",
    vegetarian: true,
    glutenFree: true,
    prepMinutes: 12,
    cookMinutes: 20,
    servings: 4,
    difficulty: "Easy",
    spiceLevel: "Medium",
    image: img("photo-1565557623262-b51c2513a641"),
    imageAlt: "Palak paneer spinach curry",
    tags: ["palak", "paneer", "spinach", "curry", "north indian", "healthy"],
    ingredients: [
      { name: "Fresh spinach, washed", quantity: 500, unit: "g" },
      { name: "Paneer, cubed", quantity: 250, unit: "g" },
      { name: "Onion, chopped", quantity: 1, unit: "medium" },
      { name: "Tomato, chopped", quantity: 1, unit: "medium" },
      { name: "Garlic cloves", quantity: 5, unit: "pieces" },
      { name: "Green chillies", quantity: 2, unit: "pieces" },
      { name: "Ginger", quantity: 1, unit: "inch piece" },
      { name: "Cumin seeds", quantity: 1, unit: "tsp" },
      { name: "Garam masala", quantity: 0.5, unit: "tsp" },
      { name: "Mustard oil or ghee", quantity: 2, unit: "tbsp" },
      { name: "Salt", quantity: 1.25, unit: "tsp", note: "to taste" },
    ],
    instructions: [
      "Blanch spinach 2 minutes, shock in cold water and blend with green chillies into a coarse puree.",
      "Soften cumin, onion, garlic and ginger in oil. Add tomato and cook until jammy.",
      "Pour in spinach puree with salt. Simmer 6 minutes — keep the green vivid, don't overcook.",
      "Add paneer and garam masala. Simmer 3 minutes and rest before serving.",
      "Finish with a thread of cream or ghee if you like, plus a squeeze of lemon.",
    ],
    tips: [
      "Blanch-and-shock keeps palak bright green instead of swampy.",
      "Blend coarse, not baby-food smooth — texture matters.",
      "Lightly sear paneer first if you prefer golden edges.",
    ],
  },
  {
    slug: "gulab-jamun-soft-festival",
    title: "Soft Gulab Jamun",
    description:
      "Melt-in-mouth khoya dumplings soaked in rose-cardamom syrup. The festival sweet that makes any dinner feel like Diwali — best served warm.",
    category: "Desserts",
    vegetarian: true,
    glutenFree: false,
    prepMinutes: 20,
    cookMinutes: 30,
    servings: 8,
    difficulty: "Medium",
    spiceLevel: "Mild",
    image: img("photo-1551024506-0bccd828d307"),
    imageAlt: "Gulab jamun dessert",
    tags: ["gulab jamun", "dessert", "festival", "sweet", "khoya", "diwali"],
    ingredients: [
      { name: "Khoya (mawa), grated", quantity: 250, unit: "g" },
      { name: "Paneer, grated", quantity: 60, unit: "g" },
      { name: "All-purpose flour", quantity: 3, unit: "tbsp" },
      { name: "Baking soda", quantity: 0.25, unit: "tsp" },
      { name: "Sugar", quantity: 2, unit: "cups" },
      { name: "Water", quantity: 2, unit: "cups" },
      { name: "Green cardamom, crushed", quantity: 4, unit: "pods" },
      { name: "Rose water", quantity: 1, unit: "tbsp" },
      { name: "Ghee or oil for frying", quantity: 750, unit: "ml" },
      { name: "Pistachios, slivered", quantity: 2, unit: "tbsp" },
    ],
    instructions: [
      "Simmer sugar, water and cardamom 8 minutes into a sticky (not one-string) syrup. Add rose water; keep warm.",
      "Knead khoya, paneer, flour and soda into a smooth, crack-free dough. Rest 10 minutes.",
      "Roll smooth, crack-free balls — any crack will split in oil.",
      "Fry on low-medium, stirring gently, 8–10 minutes until deep golden throughout.",
      "Soak hot jamuns in warm syrup at least 1 hour. Serve warm with pistachios.",
    ],
    tips: [
      "Syrup must be warm, not boiling, when jamuns go in — boiling syrup makes them shrivel.",
      "Fry low and slow; high heat browns the outside while the centre stays raw.",
      "Use milk powder + cream dough if khoya is unavailable (1.5 cups milk powder, 0.5 cup cream).",
    ],
  },
  {
    slug: "kheer-rice-pudding-cardamom",
    title: "Slow-Simmered Rice Kheer",
    description:
      "Creamy basmati pudding reduced low and slow with cardamom and saffron. A spoon-licking payasam for pujas, potlucks and quiet nights alike.",
    category: "Desserts",
    vegetarian: true,
    glutenFree: true,
    prepMinutes: 10,
    cookMinutes: 45,
    servings: 6,
    difficulty: "Easy",
    spiceLevel: "Mild",
    image: img("photo-1488477181946-6428a029e0d1"),
    imageAlt: "Creamy rice kheer with pistachios",
    tags: ["kheer", "payasam", "rice pudding", "cardamom", "saffron", "dessert"],
    ingredients: [
      { name: "Full-cream milk", quantity: 1.5, unit: "litres" },
      { name: "Basmati rice, soaked", quantity: 0.33, unit: "cup" },
      { name: "Sugar", quantity: 0.5, unit: "cup" },
      { name: "Green cardamom powder", quantity: 0.5, unit: "tsp" },
      { name: "Saffron strands", quantity: 1, unit: "pinch" },
      { name: "Mixed nuts, toasted", quantity: 0.25, unit: "cup" },
      { name: "Rose water (optional)", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Bring milk to a boil in a heavy pot, add drained rice and lower to a gentle simmer.",
      "Stir every few minutes for 35–40 minutes, scraping the sides for that malai richness.",
      "When rice is soft and milk reduced by a third, add sugar, saffron and cardamom.",
      "Simmer 5 more minutes. Cool slightly — kheer thickens as it rests.",
      "Serve warm or chilled with toasted nuts and rose water.",
    ],
    tips: [
      "Heavy-bottomed pot plus frequent stirring prevents scorching.",
      "Add sugar only after rice is fully soft — early sugar toughens grains.",
      "For kesar-badam kheer, blend a few soaked almonds into the milk.",
    ],
  },
];

export const CATEGORIES: RecipeCategory[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Desserts",
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return RECIPES.find((r) => r.slug === slug);
}

export function formatQuantity(qty: number): string {
  if (qty === 0) return "0";
  const rounded = Math.round(qty * 4) / 4;
  const whole = Math.floor(rounded);
  const frac = rounded - whole;
  const fracStr =
    frac === 0
      ? ""
      : frac === 0.25
        ? "¼"
        : frac === 0.5
          ? "½"
          : frac === 0.75
            ? "¾"
            : ` ${frac.toFixed(2)}`;
  if (whole === 0) return fracStr.trim() || "0";
  return fracStr ? `${whole}${fracStr}` : `${whole}`;
}

export function scaleQuantity(qty: number, baseServings: number, targetServings: number): number {
  if (baseServings <= 0) return qty;
  return (qty * targetServings) / baseServings;
}

export function totalMinutes(recipe: Recipe): number {
  return recipe.prepMinutes + recipe.cookMinutes;
}
