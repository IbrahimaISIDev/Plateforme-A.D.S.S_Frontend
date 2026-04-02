import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
    Check,
    User,
    FileText,
    ChevronRight,
    ChevronLeft,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
    { id: 1, label: '1. Info club', status: 'completed' },
    { id: 2, label: '2. Horaires', status: 'completed' },
    { id: 3, label: '3. Maître', status: 'active', icon: User },
    { id: 4, label: '4. Documents', status: 'pending', icon: FileText },
    { id: 5, label: '5. Confirmation', status: 'pending', icon: Check },
];

export default function AffiliationForm() {
    return (
        <div className="flex flex-col min-h-screen bg-surface">
            <Navbar />

            <main className="flex-1 container mx-auto px-12 py-16">
                {/* Header Section */}
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black text-on-surface tracking-tight">Nouvelle affiliation de club</h1>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Étape 3/5 : Maître Instructeur</p>
                    </div>

                    <div className="flex items-center space-x-6 w-full md:w-auto">
                        <div className="flex space-x-1 flex-1 md:flex-none">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <div
                                    key={s}
                                    className={cn(
                                        "h-1.5 w-12 rounded-full",
                                        s <= 3 ? "bg-secondary-blue" : "bg-surface-container-high"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-black text-secondary-blue">60%</span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Left Stepper */}
                    <div className="lg:col-span-1 space-y-4">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={cn(
                                    "flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300",
                                    step.status === 'active'
                                        ? "bg-blue-50 text-secondary-blue shadow-sm"
                                        : "text-muted-foreground"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                    step.status === 'completed' ? "bg-secondary-blue text-white" :
                                        step.status === 'active' ? "bg-white text-secondary-blue border-2 border-secondary-blue" :
                                            "bg-surface-container-high text-gray-400"
                                )}>
                                    {step.status === 'completed' ? <Check className="w-4 h-4" strokeWidth={3} /> : <span className="text-xs font-bold">{step.id}</span>}
                                </div>
                                <span className={cn("text-xs font-bold uppercase tracking-widest", step.status === 'active' ? "text-on-surface" : "")}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Main Form Content */}
                    <div className="lg:col-span-3 space-y-8">
                        <Card className="border-none bg-white p-4 shadow-ambient relative overflow-hidden">
                            <div className="absolute left-0 top-12 bottom-12 w-1.5 bg-tertiary-fixed rounded-full" />
                            <CardContent className="p-10 space-y-10">
                                <div className="space-y-2">
                                    <h2 className="text-xl font-black text-on-surface tracking-tight">Informations du Maître Instructeur</h2>
                                    <p className="text-sm font-medium text-muted-foreground">Veuillez renseigner les détails du responsable technique du club.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-bold text-on-surface uppercase tracking-widest px-1">Nom Complet</label>
                                        <Input placeholder="ex: Jean Dupont" className="h-14 rounded-xl border-none bg-surface-container-low focus-visible:bg-white transition-all text-sm font-medium shadow-sm" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-bold text-on-surface uppercase tracking-widest px-1">Date de Naissance</label>
                                        <Input type="date" className="h-14 rounded-xl border-none bg-surface-container-low focus-visible:bg-white transition-all text-sm font-medium shadow-sm" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-bold text-on-surface uppercase tracking-widest px-1">Téléphone</label>
                                        <Input placeholder="+212 ..." className="h-14 rounded-xl border-none bg-surface-container-low focus-visible:bg-white transition-all text-sm font-medium shadow-sm" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-bold text-on-surface uppercase tracking-widest px-1">Email</label>
                                        <Input type="email" placeholder="maitre@club.com" className="h-14 rounded-xl border-none bg-surface-container-low focus-visible:bg-white transition-all text-sm font-medium shadow-sm" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-bold text-on-surface uppercase tracking-widest px-1">Grade (Duan)</label>
                                        <div className="relative group">
                                            <select className="flex h-14 w-full rounded-xl border-none bg-surface-container-low px-3 py-2 text-sm font-medium outline-none focus:bg-white transition-all appearance-none cursor-pointer shadow-sm">
                                                <option>1er Duan</option>
                                                <option>2ème Duan</option>
                                                <option>3ème Duan</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-focus-within:text-on-surface transition-colors">
                                                <ChevronRight className="w-4 h-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-bold text-on-surface uppercase tracking-widest px-1">Expérience (Années)</label>
                                        <Input placeholder="ex: 15" className="h-14 rounded-xl border-none bg-surface-container-low focus-visible:bg-white transition-all text-sm font-medium shadow-sm" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-10 border-t border-on-surface/5">
                                    <Button variant="ghost" className="h-14 px-8 rounded-xl font-bold text-on-surface hover:bg-surface-container-low transition-colors">
                                        <ChevronLeft className="w-5 h-5 mr-3" />
                                        Précédent
                                    </Button>
                                    <Button className="h-14 px-10 rounded-xl bg-secondary-blue text-white font-black tracking-tight shadow-lg hover:scale-105 transition-transform">
                                        Suivant
                                        <ChevronRight className="ml-3 w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 rounded-3xl bg-blue-50 border-l-4 border-secondary-blue flex items-center space-x-6">
                            <div className="w-10 h-10 rounded-full bg-secondary-blue/10 flex items-center justify-center text-secondary-blue shrink-0">
                                <Info className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-medium text-on-surface">
                                Besoin d'aide ? Contactez notre support technique à <span className="font-bold underline decoration-secondary-blue decoration-2 underline-offset-4">support@adss.ma</span> ou consultez le guide d'affiliation.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
