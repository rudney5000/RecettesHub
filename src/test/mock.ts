import type {Area, Category, Meal} from "../types";

export const mockMeal: Meal = {
    idMeal: '52772',
    strMeal: 'Teriyaki Chicken Casserole',
    strCategory: 'Chicken',
    strArea: 'Japanese',
    strInstructions: 'Preheat oven to 350.\r\nSpray a 9x13 baking dish with cooking spray.\r\nCombine soy sauce and ingredients.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strTags: 'Meat,Casserole',
    strYoutube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
    strSource: null,
    strIngredient1: 'soy sauce',
    strIngredient2: 'water',
    strIngredient3: 'brown sugar',
    strIngredient4: '',
    strMeasure1: '3/4 cup',
    strMeasure2: '1/2 cup',
    strMeasure3: '1/4 cup',
    strMeasure4: '',
}

export const mockMeal2: Meal = {
    idMeal: '52773',
    strMeal: 'Honey Teriyaki Salmon',
    strCategory: 'Seafood',
    strArea: 'Japanese',
    strInstructions: 'Mix all the ingredients in the bowl.\r\nLet marinate for 30 min.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg',
    strTags: 'Fish,Healthy',
    strYoutube: null,
    strSource: null,
    strIngredient1: 'Salmon',
    strIngredient2: 'Honey',
    strIngredient3: '',
    strIngredient4: '',
    strMeasure1: '1 lb',
    strMeasure2: '2 tbsp',
    strMeasure3: '',
    strMeasure4: '',
}

export const mockCategories: Category[] = [
    { idCategory: '1', strCategory: 'Beef', strCategoryThumb: '', strCategoryDescription: '' },
    { idCategory: '2', strCategory: 'Chicken', strCategoryThumb: '', strCategoryDescription: '' },
    { idCategory: '3', strCategory: 'Seafood', strCategoryThumb: '', strCategoryDescription: '' },
]

export const mockAreas: Area[] = [
    { strArea: 'Japanese' },
    { strArea: 'French' },
    { strArea: 'Italian' },
]
