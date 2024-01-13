export interface IRecipeAPIResponse {
    recipes: IRecipe[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export interface IRecipe {
    id: number;
    name: string;
    difficulty: string;
    userId: number;
    caloriesPerServing: number;
    servings: number;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    rating: number;
    reviewCount: number;
    cuisine: string;
    image: string;
    ingredients: string[];
    instructions: string[];
    tags: string[];
    mealType: string[];
  }
  