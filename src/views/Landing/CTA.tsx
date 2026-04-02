import { Button } from '@/components/ui/button';

export function CTA() {
    return (
        <section className="py-24 px-12">
            <div className="max-w-7xl mx-auto">
                <div className="bg-primary-gradient rounded-[2.5rem] p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-secondary-blue opacity-10 skew-x-12 translate-x-1/2" />
                    <h2 className="text-display-lg text-white leading-tight relative z-10">
                        Prêt à commencer <br />
                        l'aventure numérique ?
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto relative z-10 font-medium">
                        Rejoignez des centaines de pratiquants et modernisez votre gestion dès aujourd'hui.
                    </p>
                    <div className="relative z-10 pt-4">
                        <Button className="h-16 px-12 rounded-2xl bg-tertiary-fixed text-on-surface hover:bg-tertiary-fixed-dim font-bold tracking-tight text-lg shadow-xl hover:scale-105 transition-transform">
                            Créer mon compte club
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
