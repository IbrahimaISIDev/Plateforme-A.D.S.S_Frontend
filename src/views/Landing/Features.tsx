import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, CreditCard, Users, BarChart3 } from 'lucide-react';

const features = [
    {
        title: "Affiliation Simplifiée",
        description: "Gérez les inscriptions de vos élèves en quelques clics. Interface intuitive pour les directeurs de clubs.",
        icon: Users,
    },
    {
        title: "Licences Numériques",
        description: "Accédez à votre carte de membre numérique partout. Fini les pertes de licences papier lors des compétitions.",
        icon: ShieldCheck,
    },
    {
        title: "Paiement Sécurisé",
        description: "Transactions cryptées pour vos cotisations et licences via Mobile Money ou carte bancaire.",
        icon: CreditCard,
    },
    {
        title: "Rapports Détaillés",
        description: "Suivez l'évolution de votre club avec des statistiques précises sur vos effectifs et vos finances.",
        icon: BarChart3,
    }
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-surface px-12">
            <div className="text-center space-y-4 mb-20">
                <p className="text-label-md uppercase tracking-[0.3em] font-bold text-secondary-blue">Excellence & Discipline</p>
                <h2 className="text-headline-md text-on-surface">Nos Fonctionnalités</h2>
                <div className="w-24 h-1.5 bg-tertiary-fixed mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                {features.map((feature, idx) => (
                    <Card key={idx} featured className="group hover:-translate-y-2 transition-transform duration-500 border-none bg-white">
                        <CardContent className="p-10 text-center lg:text-left">
                            <div className="w-14 h-14 bg-surface-container-low rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-gradient group-hover:text-white transition-colors duration-500">
                                <feature.icon className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-on-surface mb-4">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
