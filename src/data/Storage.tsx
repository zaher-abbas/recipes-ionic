import {Preferences} from "@capacitor/preferences";
import {useEffect} from "react";

const STORAGE_KEY = 'recipes:v1';

export type Recipe = {
    id: number,
    title: string,
    image: string,
    duration: number,
    difficulty: string,
    ingredients: string[],
    steps: string[],
};

export const initialRecipes: Recipe[] = [
    {
        id: 1,
        title: "French Onion Soup",
        image: "https://thetoastedpinenut.com/wp-content/uploads/2021/02/french-onion-soup-5-650x975.jpg",
        duration: 60,
        difficulty: "medium",
        ingredients: [
            "600g onions",
            "50g butter",
            "2L white stock",
            "1 bouquet garni",
            "16 baguette slices",
            "140g Gruyère cheese",
            "Salt and pepper"
        ],
        steps: [
            "Slice onions and sweat in butter.",
            "Add stock, bouquet garni, and salt. Simmer 45–60 minutes.",
            "Pour into ovenproof bowls, add croutons and cheese.",
            "Broil until cheese is melted and bubbly."
        ]
    },
    {
        id: 2,
        title: "Ratatouille",
        image: "https://www.onceuponachef.com/images/2024/05/ratatouille-760x1132.jpg",
        duration: 75,
        difficulty: "easy",
        ingredients: [
            "1 eggplant",
            "1 zucchini",
            "1 bell pepper",
            "2 tomatoes",
            "1 onion",
            "2 cloves garlic",
            "Olive oil",
            "Herbes de Provence",
            "Salt and pepper"
        ],
        steps: [
            "Slice vegetables thinly.",
            "Sauté onion and garlic in olive oil.",
            "Layer vegetables in a baking dish, season with herbs.",
            "Bake at 180°C for 45 minutes."
        ]
    },
    {
        id: 3,
        title: "Poulet à la Moutarde (Mustard Chicken)",
        image: "https://topassiette.com/cdn-cgi/image/fit=contain,width=1024,format=auto/assets/images/1739992681412-n70jk5o0.webp",
        duration: 45,
        difficulty: "medium",
        ingredients: [
            "4 chicken breasts",
            "2 tbsp Dijon mustard",
            "200ml crème fraîche",
            "1 onion",
            "2 cloves garlic",
            "Olive oil",
            "Salt and pepper",
            "Fresh thyme"
        ],
        steps: [
            "Sear chicken in olive oil until golden.",
            "Sauté onion and garlic, add mustard and crème fraîche.",
            "Return chicken to pan, simmer 20 minutes.",
            "Garnish with thyme and serve."
        ]
    },
    {
        id: 4,
        title: "Tarte Tatin",
        image: "https://www.panierdesaison.com/wp-content/uploads/2021/02/tarte-tatin-recette-780x1170.jpg.webp",
        duration: 90,
        difficulty: "difficult",
        ingredients: [
            "6 apples",
            "100g butter",
            "150g sugar",
            "1 sheet puff pastry",
            "Lemon juice",
            "Vanilla extract"
        ],
        steps: [
            "Peel and slice apples, toss with lemon juice.",
            "Caramelize sugar and butter in a pan.",
            "Add apples, cook until soft.",
            "Cover with puff pastry and bake at 190°C for 40 minutes.",
            "Invert onto plate and serve warm."
        ]
    }
];

export async function saveRecipe(items: Recipe[]): Promise<void> {
    await Preferences.set({
        key: STORAGE_KEY,
        value: JSON.stringify(items)
    })
}

export async function getRecipes(): Promise<Recipe[]> {
    const {value} = await Preferences.get({key: STORAGE_KEY});
    return value ? JSON.parse(value) : [];
}