import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Jean-Pierre N'diaye",
        role: "DIRECTEUR CLUB SHAOLIN DAKAR",
        text: "L'automatisation des affiliations a changé ma vie de directeur technique. Je peux enfin me concentrer sur l'enseignement.",
        avatar: "JP"
    },
    {
        name: "Awa Diop",
        role: "TRÉSORIÈRE ASSOCIATION SHAOLIN",
        text: "L'interface est très moderne et facile à utiliser, même pour nos membres les moins technophiles.",
        avatar: "AD"
    },
    {
        name: "Marc Mensah",
        role: "ATHLÈTE COMPÉTITION",
        text: "Avoir ma licence sur mon téléphone est un vrai plus lors des déplacements pour les compétitions nationales.",
        avatar: "MM"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-surface px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {testimonials.map((t, i) => (
                    <Card key={i} className="border-none bg-surface-container-low p-2">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 text-tertiary-fixed-dim fill-tertiary-fixed-dim" />
                                ))}
                            </div>
                            <p className="text-on-surface font-medium leading-relaxed italic">
                                "{t.text}"
                            </p>
                            <div className="flex items-center space-x-4 pt-4">
                                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold text-sm">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-on-surface leading-none">{t.name}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1.5 font-bold">{t.role}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
