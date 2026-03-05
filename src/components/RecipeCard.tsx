import { Link } from 'react-router-dom'
import { MapPin, Tag } from 'lucide-react'
import type { Meal } from '../types'

interface RecipeCardProps {
    meal: Meal
}

export default function RecipeCard({ meal }: RecipeCardProps) {
    // const { isFavorite, toggleFavorite } = useFavorites()
    // const favorite = isFavorite(meal.idMeal)

    return (
        <article className="card bg-base-100 shadow-md recipe-card-hover border border-base-300/50 overflow-hidden">
            <figure className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    crossOrigin="anonymous"
                />
                {/*<button*/}
                {/*    onClick={(e) => {*/}
                {/*        e.preventDefault()*/}
                {/*        e.stopPropagation()*/}
                {/*        // toggleFavorite(meal)*/}
                {/*    }}*/}
                {/*    className={`absolute top-3 right-3 btn btn-circle btn-sm border-0 shadow-lg ${*/}
                {/*        favorite*/}
                {/*            ? 'bg-primary text-primary-content hover:bg-primary/90'*/}
                {/*            : 'bg-base-100/80 backdrop-blur-sm text-base-content hover:bg-base-100'*/}
                {/*    }`}*/}
                {/*    aria-label={favorite ? `Retirer ${meal.strMeal} des favoris` : `Ajouter ${meal.strMeal} aux favoris`}*/}
                {/*>*/}
                {/*    <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />*/}
                {/*</button>*/}
                {meal.strCategory && (
                    <span className="absolute bottom-3 left-3 badge badge-sm bg-base-100/90 backdrop-blur-sm text-base-content border-0 gap-1">
                        <Tag className="w-3 h-3" />
                        {meal.strCategory}
                    </span>
                )}
            </figure>
            <div className="card-body p-4">
                <h3 className="card-title text-base font-semibold line-clamp-1 text-base-content">
                    {meal.strMeal}
                </h3>
                {meal.strArea && (
                    <p className="flex items-center gap-1 text-sm text-base-content/60">
                        <MapPin className="w-3.5 h-3.5" />
                        {meal.strArea}
                    </p>
                )}
                <div className="card-actions mt-2">
                    <Link
                        to={`/recipe/${meal.idMeal}`}
                        className="btn btn-primary btn-sm w-full"
                    >
                        Voir la recette
                    </Link>
                </div>
            </div>
        </article>
    )
}
