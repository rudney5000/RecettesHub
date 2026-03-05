import { useEffect, useState } from 'react'
// import { getCategories, getAreas } from '../services/api'
import { Filter, X } from 'lucide-react'
import type {Area, Category} from "../types";

interface CategoryFilterProps {
    selectedCategory: string
    selectedArea: string
    onCategoryChange: (category: string) => void
    onAreaChange: (area: string) => void
}

export default function CategoryFilter({
                                           selectedCategory,
                                           selectedArea,
                                           onCategoryChange,
                                           onAreaChange,
                                       }: CategoryFilterProps) {
    const [categories, setCategories] = useState<Category[]>([])
    const [areas, setAreas] = useState<Area[]>([])
    const [isExpanded, setIsExpanded] = useState(false)

    // useEffect(() => {
    //     getCategories().then(setCategories).catch(console.error)
    //     getAreas().then(setAreas).catch(console.error)
    // }, [])

    const hasFilters = selectedCategory || selectedArea

    const clearFilters = () => {
        onCategoryChange('')
        onAreaChange('')
    }

    return (
        <div className="space-y-3">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn btn-outline btn-sm gap-2"
                aria-expanded={isExpanded}
                aria-controls="filter-panel"
            >
                <Filter className="w-4 h-4" />
                Filtres
                {hasFilters && (
                    <span className="badge badge-primary badge-sm">
            {(selectedCategory ? 1 : 0) + (selectedArea ? 1 : 0)}
          </span>
                )}
            </button>

            {isExpanded && (
                <div id="filter-panel" className="bg-base-200 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm text-base-content/70 uppercase tracking-wider">Filtres</h3>
                        {hasFilters && (
                            <button onClick={clearFilters} className="btn btn-ghost btn-xs gap-1 text-error">
                                <X className="w-3 h-3" />
                                Effacer
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <label htmlFor="category-select" className="label">
                                <span className="label-text text-sm font-medium">Categorie</span>
                            </label>
                            <select
                                id="category-select"
                                className="select select-bordered select-sm w-full bg-base-100"
                                value={selectedCategory}
                                onChange={e => onCategoryChange(e.target.value)}
                            >
                                <option value="">Toutes les categories</option>
                                {categories.map(cat => (
                                    <option key={cat.idCategory} value={cat.strCategory}>
                                        {cat.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label htmlFor="area-select" className="label">
                                <span className="label-text text-sm font-medium">Origine</span>
                            </label>
                            <select
                                id="area-select"
                                className="select select-bordered select-sm w-full bg-base-100"
                                value={selectedArea}
                                onChange={e => onAreaChange(e.target.value)}
                            >
                                <option value="">Toutes les origines</option>
                                {areas.map(area => (
                                    <option key={area.strArea} value={area.strArea}>
                                        {area.strArea}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
