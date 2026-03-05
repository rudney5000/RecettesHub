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

const ITEMS_PER_PAGE = 8

export function useRecipeSearch(): UseRecipeSearchReturn {
    const [meals, setMeals] = useState<Meal[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const performSearch = useCallback( async () => {}, [])

    const totalPages = Math.max(1, Math.ceil(meals.length / ITEMS_PER_PAGE))
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedMeals = meals.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return {
        meals,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        totalPages,
        paginatedMeals,
        currentPage,
        performSearch
    }
}