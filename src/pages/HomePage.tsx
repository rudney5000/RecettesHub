import {Flame} from "lucide-react";
import SearchBar from "../components/SearchBar.tsx";
import {useRecipeSearch} from "../hooks/useRecipeSearch.ts";
import CategoryFilter from "../components/CategoryFilter.tsx";
import RecipeGrid from "../components/RecipeGrid.tsx";
import Pagination from "../components/Pagination.tsx";

export function HomePage(){

    const {
        paginatedMeals,
        loading,
        error,
        searchQuery,
        selectedCategory,
        selectedArea,
        meals,
        setSearchQuery,
        setSelectedCategory,
        setSelectedArea,
        currentPage,
        totalPages,
        setCurrentPage,
        performSearch,
    } = useRecipeSearch()

    return (
        <div>
            <section className="hero-pattern bg-base-200 border-b border-base-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Flame className="w-6 h-6 text-primary"/>
                            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                                Explorer les saveurs
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-base-content mb-3 text-balance">
                            Decouvrez des recettes du monde entier
                        </h1>
                        <p className="text-base-content/60 text-lg">
                            Des milliers de recettes a portee de main. Recherchez, filtrez et sauvegardez vos coups de
                            coeur.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSubmit={performSearch}
                        />
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        selectedArea={selectedArea}
                        onCategoryChange={setSelectedCategory}
                        onAreaChange={setSelectedArea}
                    />
                    {!loading && meals.length > 0 && (
                        <p className="text-sm text-base-content/50">
                            {meals.length} recette{meals.length > 1 ? 's' : ''} trouvee{meals.length > 1 ? 's' : ''}
                        </p>
                    )}
                </div>
                <RecipeGrid
                    meals={paginatedMeals}
                    loading={loading}
                    error={error}
                />

                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </section>
        </div>
    )
}