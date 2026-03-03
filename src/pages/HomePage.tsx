import {Flame} from "lucide-react";

export function HomePage(){
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
                        Search Bar
                    </div>
                </div>
            </section>
        </div>
    )
}