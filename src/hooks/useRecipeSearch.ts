import { useState, useEffect, useCallback } from 'react'
import type { Meal } from '../types'
import { searchMeals, filterByCategory, filterByArea, getMealById } from '../services/api'
import type { MealSummary } from '../types'

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
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedArea, setSelectedArea] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const fetchFullMeals = useCallback(async (summaries: MealSummary[]): Promise<Meal[]> => {
        const mealPromises = summaries.slice(0, 40).map(s => getMealById(s.idMeal))
        const results = await Promise.all(mealPromises)
        return results.filter((m): m is Meal => m !== null)
    }, [])

    const performSearch = useCallback(async () => {
        setLoading(true)
        setError(null)
        setCurrentPage(1)

        try {
            let results: Meal[]

            if (selectedCategory && selectedArea) {
                const catSummaries = await filterByCategory(selectedCategory)
                const catMeals = await fetchFullMeals(catSummaries)
                results = catMeals.filter(m => m.strArea === selectedArea)
            } else if (selectedCategory) {
                const summaries = await filterByCategory(selectedCategory)
                results = await fetchFullMeals(summaries)
            } else if (selectedArea) {
                const summaries = await filterByArea(selectedArea)
                results = await fetchFullMeals(summaries)
            } else if (searchQuery.trim()) {
                results = await searchMeals(searchQuery.trim())
            } else {
                results = await searchMeals('a')
            }

            if (searchQuery.trim() && (selectedCategory || selectedArea)) {
                results = results.filter(m =>
                    m.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
                )
            }

            setMeals(results)
        } catch (err) {
            setError('Une erreur est survenue lors de la recherche. Veuillez reessayer.')
            setMeals([])
        } finally {
            setLoading(false)
        }
    }, [searchQuery, selectedCategory, selectedArea, fetchFullMeals])

    useEffect(() => {
        performSearch()
    }, [selectedCategory, selectedArea])

    const totalPages = Math.max(1, Math.ceil(meals.length / ITEMS_PER_PAGE))
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedMeals = meals.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return {
        meals,
        loading,
        error,
        searchQuery,
        selectedCategory,
        selectedArea,
        currentPage,
        totalPages,
        paginatedMeals,
        setSearchQuery,
        setSelectedCategory: (c: string) => { setSelectedCategory(c); setCurrentPage(1) },
        setSelectedArea: (a: string) => { setSelectedArea(a); setCurrentPage(1) },
        setCurrentPage,
        performSearch,
    }
}
