import type {Meal} from "../types";
import {useCallback, useState} from "react";

interface UseRecipeSearchReturn {
    meals: Meal[]
    loading: boolean
    error: string | null
    searchQuery: string
    selectedCategory: string
    selectedArea: string
    currentPage: number
    totalPages: number
    paginatedMeals: Meal[]
    setSearchQuery: (q: string) => void
    setSelectedCategory: (c: string) => void
    setSelectedArea: (a: string) => void
    setCurrentPage: (p: number) => void
    performSearch: () => void
}
export function useRecipeSearch(): UseRecipeSearchReturn {
    const [meals, setMeals] = useState<Meal[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const performSearch = useCallback( async () => {}, [])

    return {
        meals,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        performSearch
    }
}