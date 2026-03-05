import type {Area, Category, Meal, MealSummary} from "../types";
import {getCategoriesList, getMealsList, getOneMeal} from "./utils.ts";

export async function searchMeals(query: string): Promise<Meal[]> {
    if (!query.trim()) return [];
    return getMealsList<Meal>('/search.php', { s: query });
}

export async function getMealById(id: string): Promise<Meal | null> {
    if (!/^\d+$/.test(id)) return null;
    return getOneMeal('/lookup.php', { i: id });
}

export async function getRandomMeal(): Promise<Meal | null> {
    return getOneMeal('/random.php');
}

export async function getCategories(): Promise<Category[]> {
    return getCategoriesList();
}

export async function getAreas(): Promise<Area[]> {
    return getMealsList<Area>('/list.php', { a: 'list' });
}

export async function filterByCategory(category: string): Promise<MealSummary[]> {
    if (!category.trim()) return [];
    return getMealsList<MealSummary>('/filter.php', { c: category });
}

export async function filterByArea(area: string): Promise<MealSummary[]> {
    if (!area.trim()) return [];
    return getMealsList<MealSummary>('/filter.php', { a: area });
}

export async function getMealsByFirstLetter(letter: string): Promise<Meal[]> {
    if (letter.length !== 1 || !/^[a-zA-Z]$/.test(letter)) return [];
    return getMealsList<Meal>('/search.php', { f: letter.toLowerCase() });
}