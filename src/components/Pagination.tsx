import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null

    const getVisiblePages = () => {
        const pages: (number | string)[] = []
        const delta = 1

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i)
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...')
            }
        }
        return pages
    }

    return (
        <nav className="flex items-center justify-center" aria-label="Pagination">
            <div className="join">
                <button
                    className="join-item btn btn-sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Page precedente"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {getVisiblePages().map((page, idx) =>
                    typeof page === 'string' ? (
                        <button key={`ellipsis-${idx}`} className="join-item btn btn-sm btn-disabled" aria-hidden="true">
                            {'...'}
                        </button>
                    ) : (
                        <button
                            key={page}
                            className={`join-item btn btn-sm ${
                                page === currentPage ? 'btn-primary' : ''
                            }`}
                            onClick={() => onPageChange(page)}
                            aria-label={`Page ${page}`}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className="join-item btn btn-sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Page suivante"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </nav>
    )
}
