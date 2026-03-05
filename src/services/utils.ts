import type {ApiResponse, Category, Meal} from "../types";
import {api} from "./axios.ts";

function extractMeals<T>(data: ApiResponse<T>): T[] {
    return 'meals' in data ? data.meals ?? [] : [];
}

function extractCategories<T>(data: ApiResponse<T>): T[] {
    return 'categories' in data ? (data as { categories: T[] }).categories : [];
}

export async function getOneMeal(endpoint: string, params?: Record<string, string>): Promise<Meal | null> {
    const { data } = await api.get<ApiResponse<Meal>>(endpoint, { params });
    return extractMeals(data)[0] ?? null;
}

export async function getMealsList<T>(
    endpoint: string,
    params?: Record<string, string>,
): Promise<T[]> {
    const { data } = await api.get<ApiResponse<T>>(endpoint, { params });
    return extractMeals(data);
}

export  async function getCategoriesList(): Promise<Category[]> {
    const { data } = await api.get<{ categories: Category[] }>('/categories.php');
    return extractCategories(data);
}