import { Search } from 'lucide-react'
import type { FormEvent } from 'react'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form onSubmit={handleSubmit} className="w-full" role="search">
            <div className="join w-full">
                <input
                    type="text"
                    placeholder="Rechercher une recette..."
                    className="input input-bordered join-item flex-1 bg-base-100 focus:outline-none focus:border-primary"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    aria-label="Rechercher une recette"
                />
                <button
                    type="submit"
                    className="btn btn-primary join-item"
                    aria-label="Lancer la recherche"
                >
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">Rechercher</span>
                </button>
            </div>
        </form>
    )
}
