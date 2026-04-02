import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

export function Navbar() {
    const [location] = useLocation();
    return (
        <nav className="h-20 flex items-center justify-between px-12 bg-white sticky top-0 z-50">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="font-bold text-xl tracking-tight">A.D.S.S.</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
                <a href="/#accueil" className="text-sm font-medium text-secondary-blue">Accueil</a>
                <a href="/#features" className="text-sm font-medium text-muted-foreground hover:text-on-surface transition-colors">Fonctionnalités</a>
                <a href="/#pricing" className="text-sm font-medium text-muted-foreground hover:text-on-surface transition-colors">Tarifs</a>
                <Link href="/contact">
                    <a className={cn(
                        "text-sm font-medium transition-colors",
                        location === "/contact" ? "text-secondary-blue font-bold" : "text-muted-foreground hover:text-on-surface"
                    )}>Contact</a>
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                <Link href="/login">
                    <Button variant="ghost" className="text-sm font-semibold text-secondary-blue">Connexion</Button>
                </Link>
                <Link href="/register">
                    <Button className="rounded-xl px-6 font-bold tracking-tight">Inscription</Button>
                </Link>
            </div>
        </nav>
    );
}
