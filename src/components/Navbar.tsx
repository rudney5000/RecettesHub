import {useState} from "react";
import {ChefHat, Menu, X} from "lucide-react";
import {Link, useLocation} from "react-router-dom";

export default function Navbar(){
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const isActive = (path: string) => location.pathname === path

    return(
        <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 group" aria-label="Accueil RecettesHub">
                        <div
                            className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                            <ChefHat className="w-5 h-5 text-primary-content"/>
                        </div>
                        <span className="font-serif font-bold text-xl text-base-content">RecettesHub</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        <Link
                            to="/"
                            className={`btn btn-ghost btn-sm ${isActive('/') ? 'bg-primary/10 text-primary' : ''}`}
                        >
                            Explorer
                        </Link>
                        <Link
                            to="/favorites"
                            className={`btn btn-ghost btn-sm gap-2 ${isActive('/favorites') ? 'bg-primary/10 text-primary' : ''}`}
                        >
                            {/*<Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-primary text-primary' : ''}`}/>*/}
                            Favoris
                            {/*{favoritesCount > 0 && (*/}
                            {/*    <span className="badge badge-primary badge-sm">{favoritesCount}</span>*/}
                            {/*)}*/}
                        </Link>
                    </div>

                    <button
                        className="md:hidden btn btn-ghost btn-square btn-sm"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Menu de navigation"
                    >
                        {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="md:hidden pb-4 border-t border-base-300 pt-3 flex flex-col gap-1">
                        <Link
                            to="/"
                            className={`btn btn-ghost btn-sm justify-start ${isActive('/') ? 'bg-primary/10 text-primary' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            Explorer
                        </Link>
                        <Link
                            to="/favorites"
                            className={`btn btn-ghost btn-sm justify-start gap-2 ${isActive('/favorites') ? 'bg-primary/10 text-primary' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {/*<Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-primary text-primary' : ''}`}/>*/}
                            Favoris
                            {/*{favoritesCount > 0 && (*/}
                            {/*    <span className="badge badge-primary badge-sm">{favoritesCount}</span>*/}
                            {/*)}*/}
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    )
}