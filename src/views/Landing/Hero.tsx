import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section id="accueil" className="relative min-h-[600px] flex items-center overflow-hidden bg-primary-gradient">
            <div className="container mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 animate-in slide-in-from-left duration-1000">
                    <h1 className="text-display-lg text-white leading-[1.1] tracking-tight">
                        Gérez vos <br />
                        <span className="text-tertiary-fixed-dim underline decoration-tertiary-fixed decoration-8 underline-offset-12">affiliations</span> <br />
                        en ligne
                    </h1>
                    <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-medium">
                        Plateforme complète pour les clubs et membres. Simplifiez la gestion administrative de votre pratique martiale avec nos outils numériques modernes.
                    </p>
                    <div className="flex items-center space-x-6">
                        <Button className="h-14 px-8 rounded-2xl bg-white text-black hover:bg-gray-100 font-bold tracking-tight text-lg shadow-ambient">
                            Commencer maintenant
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/20 text-white hover:bg-white/10 font-bold border-2">
                            En savoir plus
                        </Button>
                    </div>
                </div>

                <div className="relative h-[500px] lg:h-[600px] animate-in slide-in-from-right duration-1000">
                    <div className="absolute inset-0 bg-secondary-blue opacity-10 rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-500" />
                    <img
                        src="/hero-martial-artist.png"
                        alt="Shaolin Martial Artist"
                        className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 border-8 border-white/10"
                    />
                </div>
            </div>

            {/* Decorative patterns */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary-blue/5 skew-x-12 translate-x-1/2" />
        </section>
    );
}
