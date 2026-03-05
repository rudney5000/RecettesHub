export interface Meal {
    idMeal: string
    strMeal: string
    strCategory: string
    strArea: string
    strInstructions: string
    strMealThumb: string
    strTags: string | null
    strYoutube: string | null
    strSource: string | null
    [key: string]: string | null
}

export interface Category {
    idCategory: string
    strCategory: string
    strCategoryThumb: string
    strCategoryDescription: string
}

export interface Area {
    strArea: string
}

export interface MealSummary {
    idMeal: string
    strMeal: string
    strMealThumb: string
}

export type ApiResponse<T> =
    | { meals: T[] | null }
    | { categories: T[] }
    | { [key: string]: never };