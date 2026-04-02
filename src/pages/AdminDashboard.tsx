import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { ApiError } from '@/components/ui/error-boundary';
import { useAsyncState } from '@/hooks/useAsyncState';

import { StaggerChildren, FadeIn } from '@/components/ui/transitions';
import {
    AlertTriangle,
    Clock,
    ShieldCheck,
    TrendingUp,
    TrendingDown,
    Plus,
    CheckCircle2,
    XCircle,
    Banknote,
    Users,
    Shield,
    RefreshCw,
    Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock API calls
const fetchDashboardData = async () => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simuler une erreur aléatoire pour démonstration
    if (Math.random() > 0.8) {
        throw new Error('Impossible de charger les données du tableau de bord');
    }

    return {
        alerts: [
            { icon: AlertTriangle, title: "42 Licences expirent", subtitle: "Action requise avant le 15 du mois.", color: "text-red-500", bg: "bg-red-50", border: "border-red-500" },
            { icon: Clock, title: "12 Demandes en attente", subtitle: "Temps de réponse moyen : 4h.", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-500" },
            { icon: ShieldCheck, title: "Sauvegarde terminée", subtitle: "Dernière archive : Aujourd'hui, 04:00.", color: "text-green-500", bg: "bg-green-50", border: "border-green-500" },
        ],
        stats: [
            { label: 'CLUBS ACTIFS', value: '150', trend: '+12%', up: true, icon: Users },
            { label: 'LICENCES VALIDES', value: '3,500', trend: '+5%', up: true, icon: Shield },
            { label: 'REVENUS (M)', value: '25.4', trend: '+8%', up: true, icon: Banknote },
            { label: 'EN ATTENTE', value: '12', trend: '-2%', up: false, icon: Clock },
            { label: 'PAIEMENTS REÇUS', value: '18', trend: '+22%', up: true, icon: CheckCircle2 },
            { label: 'SATISFACTION', value: '95%', trend: '+1%', up: true, icon: ShieldCheck },
        ],
        payments: [
            { ref: 'REF-98231-FR', method: 'CB', time: 'Il y a 5 min', amount: '€450.00', status: 'SUCCÈS', statusColor: 'text-green-600', bg: 'bg-blue-50', icon: Banknote },
            { ref: 'REF-98229-FR', method: 'Virement', time: 'Il y a 2h', amount: '€1,200.00', status: 'EN ATTENTE', statusColor: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
            { ref: 'REF-98225-FR', method: 'PayPal', time: 'Hier', amount: '€85.00', status: 'ECHOUÉ', statusColor: 'text-red-600', bg: 'bg-red-50', icon: XCircle },
        ]
    };
};

export default function AdminDashboard() {
    const { data: dashboardData, loading, error, retry } = useAsyncState(fetchDashboardData, {
        retryCount: 3,
        onError: (error) => {
            console.error('Dashboard data loading failed:', error);
        }
    });

    const statsGridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

    if (loading) {
        return (
            <div className="space-y-10 pb-20">
                {/* Alert Banners Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="p-6 rounded-[2rem] border-l-4 border-surface-container bg-surface-container-low">
                            <div className="flex items-center space-x-5">
                                <Skeleton variant="circular" className="w-12 h-12" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton width="60%" height="16px" />
                                    <Skeleton width="80%" height="12px" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Grid Skeleton */}
                <div className={`grid ${statsGridCols} gap-6`}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="border-none bg-white shadow-sm">
                            <CardContent className="p-4 sm:p-6 space-y-4">
                                <Skeleton width="80%" height="12px" />
                                <Skeleton width="60%" height="24px" />
                                <Skeleton width="40%" height="12px" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Section Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 border-none bg-white p-2">
                        <CardHeader className="p-6 sm:p-8 pb-0">
                            <Skeleton width="40%" height="24px" />
                            <Skeleton width="60%" height="12px" className="mt-2" />
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8 h-64 sm:h-80">
                            <Skeleton className="w-full h-full" />
                        </CardContent>
                    </Card>
                    <Card className="border-none bg-white p-2">
                        <CardHeader className="p-6 sm:p-8 pb-0">
                            <Skeleton width="60%" height="20px" />
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8 h-64 sm:h-80">
                            <Skeleton className="w-full h-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <ApiError
                    error={error}
                    onRetry={retry}
                    className="max-w-2xl mx-auto mt-10"
                />
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-muted-foreground">Aucune donnée disponible</p>
                    <Button onClick={retry} className="mt-4">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Réessayer
                    </Button>
                </div>
            </div>
        );
    }

    const { alerts, stats, payments } = dashboardData;

    return (
        <div className="space-y-10 pb-20">
            {/* Header with actions */}
            <FadeIn duration={0.6}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight">Tableau de Bord</h1>
                        <p className="text-sm font-medium text-muted-foreground mt-1">Vue d'ensemble de la plateforme A.D.S.S</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Exporter
                        </Button>
                        <Button onClick={retry} size="sm" disabled={loading}>
                            {loading ? <Spinner size="sm" className="mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                            Actualiser
                        </Button>
                    </div>
                </div>
            </FadeIn>

            {/* Alert Banners */}
            <StaggerChildren staggerDelay={0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {alerts.map((alert, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className={cn("p-6 rounded-[2rem] border-l-4 flex items-center space-x-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer", alert.bg, alert.border)}>
                                <div className={cn("w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm", alert.color)}>
                                    <alert.icon className="w-6 h-6" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-black text-on-surface">{alert.title}</p>
                                    <p className="text-xs font-medium text-muted-foreground">{alert.subtitle}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </StaggerChildren>

            {/* Stats Grid */}
            <StaggerChildren staggerDelay={0.05}>
                <div className={`grid ${statsGridCols} gap-6`}>
                    {stats.map((s, i) => (
                        <FadeIn key={i} delay={i * 0.05}>
                            <Card className="border-none bg-white shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-4 sm:p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{s.label}</p>
                                        <s.icon className="w-3.5 h-3.5 text-blue-500/50" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xl sm:text-2xl font-black text-on-surface">{s.value}</p>
                                        <div className={cn("flex items-center text-[10px] font-bold", s.up ? "text-green-500" : "text-red-500")}>
                                            {s.up ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                            {s.trend}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </StaggerChildren>

            {/* Charts Section */}
            <FadeIn duration={0.8} delay={0.4}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Affiliation Growth */}
                    <Card className="lg:col-span-2 border-none bg-white p-2">
                        <CardHeader className="p-6 sm:p-8 pb-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-black text-on-surface tracking-tight">Croissance des Affiliations</h3>
                                    <p className="text-xs font-medium text-muted-foreground mt-1">Evolution mensuelle des nouveaux clubs</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-100" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8 h-64 sm:h-80 relative">
                            <div className="absolute inset-0 flex items-end justify-between px-6 sm:px-8 pb-12">
                                {['JAN', 'MAR', 'MAI', 'JUIL', 'SEP', 'NOV'].map(m => (
                                    <span key={m} className="text-[10px] font-bold text-muted-foreground">{m}</span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Revenue Distribution */}
                    <Card className="border-none bg-white p-2">
                        <CardHeader className="p-6 sm:p-8 pb-0">
                            <h3 className="text-lg sm:text-xl font-black text-on-surface tracking-tight">Répartition des Revenus</h3>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8 h-64 sm:h-80 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-100 relative">
                                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-lg font-black text-on-surface">25.4M</p>
                                            <p className="text-xs text-muted-foreground">Total</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </FadeIn>

            {/* Recent Payments */}
            <FadeIn duration={0.8} delay={0.6}>
                <Card className="border-none bg-white relative">
                    <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h3 className="text-lg sm:text-xl font-black text-on-surface tracking-tight">Paiements Récents</h3>
                        <Button variant="tertiary" className="text-blue-600 font-bold">Historique</Button>
                    </div>
                    <div className="px-6 sm:px-8 pb-8 space-y-4">
                        {payments.map((p: any, i: number) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[2rem] bg-surface-container-low/50 hover:bg-surface-container transition-colors group gap-4">
                                <div className="flex items-center space-x-5">
                                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", p.bg)}>
                                        <p.icon className={cn("w-6 h-6", p.statusColor)} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-black text-on-surface leading-none uppercase">{p.ref}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{p.method} • {p.time}</p>
                                    </div>
                                </div>
                                <div className="text-right sm:text-left">
                                    <p className="text-sm font-black text-on-surface leading-none">{p.amount}</p>
                                    <p className={cn("text-[9px] font-black tracking-widest mt-1 uppercase", p.statusColor)}>{p.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button className="absolute -right-4 bottom-10 w-14 h-14 rounded-2xl bg-slate-900 text-white shadow-2xl hover:scale-110 transition-transform z-20">
                        <Plus className="w-8 h-8" strokeWidth={3} />
                    </Button>
                </Card>
            </FadeIn>
        </div>
    );
}
