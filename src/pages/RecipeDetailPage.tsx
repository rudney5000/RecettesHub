import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, MapPin, Tag, Youtube, ExternalLink, Clock } from 'lucide-react'
import { getMealById } from '../services/api'
import { useFavorites } from '../context/FavoritesContext'
import type { Meal, Ingredient } from '../types'

function extractIngredients(meal: Meal): Ingredient[] {
    const ingredients: Ingredient[] = []
    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (name && name.trim()) {
            ingredients.push({
                name: name.trim(),
                measure: measure?.trim() || '',
            })
        }
    }
    return ingredients
}

export default function RecipeDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [meal, setMeal] = useState<Meal | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { isFavorite, toggleFavorite } = useFavorites()

    useEffect(() => {
        if (!id) return
        setLoading(true)
        getMealById(id)
            .then(data => {
                setMeal(data)
                setLoading(false)
            })
            .catch(() => {
                setError('Impossible de charger la recette.')
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="animate-pulse space-y-6">
                    <div className="h-6 w-24 bg-base-300 rounded" />
                    <div className="aspect-video bg-base-300 rounded-2xl" />
                    <div className="h-10 w-2/3 bg-base-300 rounded" />
                    <div className="h-4 w-1/3 bg-base-300 rounded" />
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-4 bg-base-300 rounded" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error || !meal) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <div className="alert alert-error max-w-md mx-auto">
                    <span>{error || 'Recette introuvable.'}</span>
                </div>
                <Link to="/" className="btn btn-primary mt-6">
                    Retour a l'accueil
                </Link>
            </div>
        )
    }

    const ingredients = extractIngredients(meal)
    const favorite = isFavorite(meal.idMeal)
    const instructions = meal.strInstructions
        .split('\r\n')
        .filter(line => line.trim())

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/" className="btn btn-ghost btn-sm gap-2 mb-6 -ml-2">
                <ArrowLeft className="w-4 h-4" />
                Retour
            </Link>

            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full aspect-video object-cover"
                    crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {meal.strCategory && (
                            <span className="badge badge-primary gap-1">
                <Tag className="w-3 h-3" />
                                {meal.strCategory}
              </span>
                        )}
                        {meal.strArea && (
                            <span className="badge badge-outline border-white/40 text-white gap-1">
                <MapPin className="w-3 h-3" />
                                {meal.strArea}
              </span>
                        )}
                        {meal.strTags && meal.strTags.split(',').map(tag => (
                            <span key={tag} className="badge badge-outline border-white/40 text-white">
                {tag.trim()}
              </span>
                        ))}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-serif font-bold text-white text-balance">
                        {meal.strMeal}
                    </h1>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
                <button
                    onClick={() => toggleFavorite(meal)}
                    className={`btn gap-2 ${favorite ? 'btn-primary' : 'btn-outline'}`}
                >
                    <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
                    {favorite ? 'Dans vos favoris' : 'Ajouter aux favoris'}
                </button>
                {meal.strYoutube && (
                    <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-error gap-2"
                    >
                        <Youtube className="w-5 h-5" />
                        Video
                    </a>
                )}
                {meal.strSource && (
                    <a
                        href={meal.strSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline gap-2"
                    >
                        <ExternalLink className="w-5 h-5" />
                        Source
                    </a>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-base-200 rounded-xl p-5 sticky top-24">
                        <h2 className="font-serif font-bold text-xl mb-4 flex items-center gap-2 text-base-content">
                            <Clock className="w-5 h-5 text-primary" />
                            Ingredients
                        </h2>
                        <ul className="space-y-2">
                            {ingredients.map((ing, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm">
                                    <img
                                        src={`https://www.themealdb.com/images/ingredients/${ing.name}-Small.png`}
                                        alt={ing.name}
                                        className="w-8 h-8 rounded object-cover flex-shrink-0 bg-base-300"
                                        loading="lazy"
                                        crossOrigin="anonymous"
                                    />
                                    <div>
                                        <span className="font-medium text-base-content">{ing.name}</span>
                                        {ing.measure && (
                                            <span className="text-base-content/50 ml-1">- {ing.measure}</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <h2 className="font-serif font-bold text-xl mb-4 text-base-content">Instructions</h2>
                    <div className="space-y-4">
                        {instructions.map((step, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                                    {idx + 1}
                                </div>
                                <p className="text-base-content/80 leading-relaxed pt-1">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
