import type {Meal} from "../types";
import {createContext, type ReactNode, useCallback, useContext, useState} from "react";

interface FavoritesContextType {
    favorites: Meal[]
    addFavorite: (meal: Meal) => void
    removeFavorite: (id: string) => void
    isFavorite: (id: string) => boolean
    toggleFavorite: (meal: Meal) => void
    favoritesCount: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Meal[]>(() => {
        try {
            const stored = localStorage.getItem('recipe-favorites')
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })

    const saveFavorites = useCallback((newFavorites: Meal[]) => {
        setFavorites(newFavorites)
        localStorage.setItem('recipe-favorites', JSON.stringify(newFavorites))
    }, [])

    const addFavorite = useCallback((meal: Meal) => {
        saveFavorites([...favorites, meal])
    }, [favorites, saveFavorites])

    const removeFavorite = useCallback((id: string) => {
        saveFavorites(favorites.filter(m => m.idMeal !== id))
    }, [favorites, saveFavorites])

    const isFavorite = useCallback((id: string) => {
        return favorites.some(m => m.idMeal === id)
    }, [favorites])

    const toggleFavorite = useCallback((meal: Meal) => {
        if (isFavorite(meal.idMeal)) {
            removeFavorite(meal.idMeal)
        } else {
            addFavorite(meal)
        }
    }, [isFavorite, removeFavorite, addFavorite])

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addFavorite,
            removeFavorite,
            isFavorite,
            toggleFavorite,
            favoritesCount: favorites.length,
        }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}
