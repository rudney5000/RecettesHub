import type { Meal } from '../types'
import RecipeCard from './RecipeCard'
import { UtensilsCrossed } from 'lucide-react'

interface RecipeGridProps {
    meals: Meal[]
    loading: boolean
    error: string | null
    emptyMessage?: string
}

export default function RecipeGrid({ meals, loading, error, emptyMessage }: RecipeGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="card bg-base-200 animate-pulse">
                        <div className="aspect-[4/3] bg-base-300 rounded-t-xl" />
                        <div className="p-4 space-y-3">
                            <div className="h-5 bg-base-300 rounded w-3/4" />
                            <div className="h-4 bg-base-300 rounded w-1/2" />
                            <div className="h-9 bg-base-300 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="alert alert-error">
                <span>{error}</span>
            </div>
        )
    }

    if (meals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-base-content/50">
                <UtensilsCrossed className="w-16 h-16 mb-4" />
                <p className="text-lg font-medium">{emptyMessage || 'Aucune recette trouvee'}</p>
                <p className="text-sm mt-1">Essayez de modifier vos criteres de recherche</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {meals.map(meal => (
                <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
        </div>
    )
}
