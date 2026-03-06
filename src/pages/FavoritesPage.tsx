import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowLeft } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import RecipeGrid from '../components/RecipeGrid'
import Pagination from '../components/Pagination'

const ITEMS_PER_PAGE = 8

export default function FavoritesPage() {
    const { favorites } = useFavorites()
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.max(1, Math.ceil(favorites.length / ITEMS_PER_PAGE))
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedFavorites = favorites.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-2">
                <Link to="/" className="btn btn-ghost btn-sm btn-circle">
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-primary fill-primary" />
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-base-content">
                        Mes Favoris
                    </h1>
                </div>
            </div>

            <p className="text-base-content/50 mb-8 ml-12">
                {favorites.length > 0
                    ? `${favorites.length} recette${favorites.length > 1 ? 's' : ''} sauvegardee${favorites.length > 1 ? 's' : ''}`
                    : 'Vous n\'avez pas encore de favoris'}
            </p>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <Heart className="w-20 h-20 text-base-300 mb-6" />
                    <h2 className="text-xl font-semibold text-base-content mb-2">Aucun favori pour le moment</h2>
                    <p className="text-base-content/50 mb-6 text-center max-w-md">
                        Explorez nos recettes et cliquez sur le coeur pour les sauvegarder ici.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Explorer les recettes
                    </Link>
                </div>
            ) : (
                <>
                    <RecipeGrid
                        meals={paginatedFavorites}
                        loading={false}
                        error={null}
                        emptyMessage="Aucun favori ne correspond"
                    />
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
