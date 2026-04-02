import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "Maître",
        price: "13k",
        subtitle: "FCFA / AN",
        description: "Affiliation + Licence Maître",
        features: ["Gestion complète du Club", "Accès aux examens de grade", "Support prioritaire"],
        label: "M",
        color: "secondary-container",
    },
    {
        name: "Élève",
        price: "5k",
        subtitle: "FCFA / AN",
        description: "Licence Élève",
        features: ["Licence numérique individuelle", "Suivi des progrès personnels", "Accès aux stages nationaux"],
        label: "E",
        color: "on-surface",
    }
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-surface-container-low px-12">
            <div className="text-center space-y-4 mb-20">
                <h2 className="text-headline-md text-on-surface">Tarification Transparente</h2>
                <p className="text-muted-foreground font-medium">Des contrats adaptés à chaque niveau de pratique</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                {plans.map((plan, idx) => (
                    <Card key={idx} className="border-none bg-white p-4 relative overflow-hidden group">
                        <span className="absolute -right-8 -top-8 text-[12rem] font-black text-gray-50/50 group-hover:text-gray-100/50 transition-colors pointer-events-none">{plan.label}</span>
                        <CardHeader className="p-8 relative">
                            <p className={`text-lg font-bold text-${plan.color}`}>{plan.name}</p>
                            <div className="flex items-baseline space-x-2 mt-2">
                                <span className="text-5xl font-black text-on-surface">{plan.price}</span>
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{plan.subtitle}</span>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mt-4">{plan.description}</p>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 relative space-y-4">
                            {plan.features.map((f, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium">{f}</span>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="p-8 pt-4 relative">
                            <Button className="w-full h-12 rounded-xl bg-tertiary-fixed text-on-surface hover:bg-tertiary-fixed-dim font-bold tracking-tight">
                                Choisir cette offre
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
