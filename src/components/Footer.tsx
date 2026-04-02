import { Share2, MessageSquare, Camera, Globe, Users } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white pt-24 pb-12 px-12 border-t border-on-surface/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <span className="font-bold text-2xl tracking-tighter text-on-surface">A.D.S.S.</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        Association pour le Développement du Sport Shaolin. Excellence, Discipline et Modernité au service de la tradition.
                    </p>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-primary-gradient hover:text-white transition-all">
                            <Share2 className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-primary-gradient hover:text-white transition-all">
                            <Camera className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-primary-gradient hover:text-white transition-all">
                            <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                    </div>
                </div>

                <div className="space-y-6">
                    <p className="text-xs font-bold text-on-surface uppercase tracking-widest">Produit</p>
                    <nav className="flex flex-col space-y-4">
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-secondary-blue">Fonctionnalités</a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-secondary-blue">Tarifs</a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-secondary-blue">Application Mobile</a>
                    </nav>
                </div>

                <div className="space-y-6">
                    <p className="text-xs font-bold text-on-surface uppercase tracking-widest">Ressources</p>
                    <nav className="flex flex-col space-y-4">
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-secondary-blue">Guide d'affiliation</a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-secondary-blue">Règlement Intérieur</a>
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-secondary-blue">Support Technique</a>
                    </nav>
                </div>

                <div className="space-y-6">
                    <p className="text-xs font-bold text-on-surface uppercase tracking-widest">Contact</p>
                    <nav className="flex flex-col space-y-4">
                        <a href="mailto:contact@adss-shaolin.sn" className="text-sm font-medium text-muted-foreground hover:text-secondary-blue">contact@adss-shaolin.sn</a>
                        <a href="tel:+221000000000" className="text-sm font-medium text-muted-foreground hover:text-secondary-blue">+221 33 000 00 00</a>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-10 border-t border-on-surface/5 flex items-center justify-between text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
                <p>&copy; {new Date().getFullYear()} Association pour le Développement du Sport Shaolin. Tous droits réservés.</p>
                <div className="flex items-center space-x-6">
                    <a href="#" className="hover:text-on-surface flex items-center">
                        <Globe className="w-3 h-3 mr-2" />
                        Sénégal (FR)
                    </a>
                    <a href="#" className="hover:text-on-surface flex items-center">
                        <Users className="w-3 h-3 mr-2" />
                        Accès Clubs
                    </a>
                </div>
            </div>
        </footer>
    );
}
