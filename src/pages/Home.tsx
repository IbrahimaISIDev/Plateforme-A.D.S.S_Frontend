import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    FileClock,
    CheckCircle2,
    CreditCard,
    Calendar,
    Eye,
    Download,
    Plus,
    Printer,
    ArrowRight,
    ShieldCheck,
    RefreshCw,
    Info,
    TrendingUp,
    Award,
    Bell,
    Settings,
    Mail,
    Phone,
    MapPin,
    Clock,
    AlertTriangle,
    Users,
    Building,
    BarChart3,
    FileText,
    UserCheck,
    Activity
} from 'lucide-react';
import { FadeIn, StaggerChildren } from '@/components/ui/transitions';
import { useToast } from '@/components/ui/notifications';
import { useAsyncState } from '@/hooks/useAsyncState';
import { useResponsiveLayout } from '@/hooks/useResponsive';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  club: string;
  role: string;
  memberSince: string;
  rank: string;
  nextRank: string;
  progress: number;
}

export default function Home() {
  const { success, info } = useToast();
  const { statsGridCols } = useResponsiveLayout();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Données utilisateur basées sur le rôle
  const getUserProfile = () => {
    if (!user) return null;

    switch (user.role) {
      case 'admin':
        return {
          name: user.name,
          email: user.email,
          phone: '+221 77 123 45 67',
          club: 'Administration A.D.S.S.',
          role: 'Super Administrateur',
          memberSince: 'Janvier 2020',
          rank: 'Ceinture Noire 5ème Dan',
          nextRank: 'Maître',
          progress: 90
        };
      case 'club_manager':
        return {
          name: user.name,
          email: user.email,
          phone: '+221 77 234 56 78',
          club: user.club || 'Shaolin Sport Club',
          role: 'Gestionnaire de Club',
          memberSince: 'Mars 2021',
          rank: 'Ceinture Noire 2ème Dan',
          nextRank: 'Ceinture Noire 3ème Dan',
          progress: 60
        };
      case 'member':
        return {
          name: user.name,
          email: user.email,
          phone: '+221 77 345 67 89',
          club: user.club || 'Shaolin Sport Club',
          role: 'Membre Actif',
          memberSince: 'Janvier 2022',
          rank: 'Ceinture Bleue',
          nextRank: 'Ceinture Verte',
          progress: 40
        };
      default:
        return null;
    }
  };

  const userProfile = getUserProfile();

  // Mock activities
  const { data: activities } = useAsyncState(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        id: '1',
        type: 'demand',
        title: 'Affiliation Club Zen',
        date: '14/05/2024',
        status: 'pending',
        description: 'En attente de validation par l\'administration'
      },
      {
        id: '2',
        type: 'license',
        title: 'Licence Compétiteur 2024',
        date: '10/05/2024',
        status: 'completed',
        description: 'Licence validée jusqu\'au 31/12/2024'
      },
      {
        id: '3',
        type: 'payment',
        title: 'Cotisation Annuelle',
        date: '02/05/2024',
        status: 'completed',
        description: 'Paiement de 45,000 FCFA traité avec succès'
      },
      {
        id: '4',
        type: 'training',
        title: 'Stage International',
        date: '28/04/2024',
        status: 'processing',
        description: 'Inscription en cours de traitement'
      }
    ];
  });

  // Données utilisateur basées sur le rôle
  const getUserStats = () => {
    if (!user) return [];

    switch (user.role) {
      case 'admin':
        return [
          { 
            title: 'TOTAL CLUBS', 
            value: '24', 
            icon: Building, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50',
            trend: '+3 ce mois',
            trendUp: true
          },
          { 
            title: 'UTILISATEURS', 
            value: '1,247', 
            icon: Users, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            trend: '+127 ce mois',
            trendUp: true
          },
          { 
            title: 'LICENCES ACTIVES', 
            value: '892', 
            icon: CheckCircle2, 
            color: 'text-green-500', 
            bg: 'bg-green-50',
            trend: '+45 vs 2023',
            trendUp: true
          },
          { 
            title: 'DEMANDES EN ATTENTE', 
            value: '18', 
            icon: FileClock, 
            color: 'text-amber-500', 
            bg: 'bg-amber-50',
            trend: '-5 cette semaine',
            trendUp: false
          },
          { 
            title: 'REVENUS ANNÉE', 
            value: '12.5M', 
            icon: CreditCard, 
            color: 'text-indigo-500', 
            bg: 'bg-indigo-50',
            trend: '+2.3M vs 2023',
            trendUp: true
          },
          { 
            title: 'TAUX CONVERSION', 
            value: '87%', 
            icon: TrendingUp, 
            color: 'text-orange-500', 
            bg: 'bg-orange-50',
            trend: '+5% ce mois',
            trendUp: true
          }
        ];
      case 'club_manager':
        return [
          { 
            title: 'MEMBRES ACTIFS', 
            value: '45', 
            icon: Users, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            trend: '+3 ce mois',
            trendUp: true
          },
          { 
            title: 'LICENCES VALIDÉES', 
            value: '38', 
            icon: CheckCircle2, 
            color: 'text-green-500', 
            bg: 'bg-green-50',
            trend: 'Stable',
            trendUp: null
          },
          { 
            title: 'DEMANDES EN COURS', 
            value: '7', 
            icon: FileClock, 
            color: 'text-amber-500', 
            bg: 'bg-amber-50',
            trend: '+2 cette semaine',
            trendUp: true
          },
          { 
            title: 'PAIEMENTS REÇUS', 
            value: '42', 
            icon: CreditCard, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50',
            trend: '+8 vs 2023',
            trendUp: true
          }
        ];
      case 'member':
        return [
          { 
            title: 'DEMANDES EN COURS', 
            value: '2', 
            icon: FileClock, 
            color: 'text-amber-500', 
            bg: 'bg-amber-50',
            trend: '+1 ce mois',
            trendUp: true
          },
          { 
            title: 'LICENCES ACTIVES', 
            value: '3', 
            icon: CheckCircle2, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            trend: 'Stable',
            trendUp: null
          },
          { 
            title: 'PAIEMENTS ANNÉE', 
            value: '5', 
            icon: CreditCard, 
            color: 'text-green-500', 
            bg: 'bg-green-50',
            trend: '+2 vs 2023',
            trendUp: true
          },
          { 
            title: 'PROCHAIN RENOUV', 
            value: '12 Oct.', 
            icon: Calendar, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50',
            trend: 'Dans 5 mois',
            trendUp: null
          },
          { 
            title: 'HEURES ENTRAÎNEMENT', 
            value: '342h', 
            icon: Clock, 
            color: 'text-indigo-500', 
            bg: 'bg-indigo-50',
            trend: '+45h ce mois',
            trendUp: true
          },
          { 
            title: 'RANG PROGRESSION', 
            value: '75%', 
            icon: TrendingUp, 
            color: 'text-orange-500', 
            bg: 'bg-orange-50',
            trend: 'En progression',
            trendUp: true
          }
        ];
      default:
        return [];
    }
  };

  const userStats = getUserStats();

  const quickActions = [
    { 
      title: "Nouvelle demande d'affiliation", 
      description: "Enregistrez votre nouveau club à l'association.", 
      icon: Plus, 
      bg: "bg-orange-100", 
      hover: "hover:bg-orange-200",
      action: () => info('Redirection', 'Page d\'affiliation bientôt disponible')
    },
    { 
      title: "Demander une licence", 
      description: "Obtenez votre accréditation officielle de saison.", 
      icon: ShieldCheck, 
      bg: "bg-blue-600", 
      text: "text-white", 
      hover: "hover:bg-blue-700",
      action: () => info('Redirection', 'Formulaire de licence bientôt disponible')
    },
    { 
      title: "Renouveler ma licence", 
      description: "Prolongez votre validité en quelques clics.", 
      icon: RefreshCw, 
      bg: "bg-green-600", 
      text: "text-white", 
      hover: "hover:bg-green-700",
      action: () => info('Redirection', 'Renouvellement bientôt disponible')
    },
    { 
      title: "Voir mes documents", 
      description: "Accédez à tous vos certificats et documents.", 
      icon: Eye, 
      bg: "bg-purple-100", 
      hover: "hover:bg-purple-200",
      action: () => success('Documents', 'Votre espace documents est en préparation')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'demand': return FileClock;
      case 'license': return CheckCircle2;
      case 'payment': return CreditCard;
      case 'training': return Award;
      default: return Info;
    }
  };

  // Ajouter une vérification au début du return
  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chargement...</h2>
          <p className="text-gray-600">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Header */}
      <FadeIn duration={0.6}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight">
              Bonjour, {userProfile.name.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground font-medium">
              Voici le récapitulatif de votre activité sportive Shaolin.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-12 px-6 rounded-xl font-bold bg-white border-on-surface/10 hover:bg-surface-container-low transition-colors">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer Reçu
            </Button>
            <Button className="h-12 px-6 rounded-xl font-bold">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* User Profile Card */}
      <FadeIn duration={0.8} delay={0.2}>
        <Card className="border-none bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold text-xl">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-on-surface">{userProfile.name}</h3>
                    <p className="text-muted-foreground">{userProfile.role}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{userProfile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{userProfile.club}</span>
                  </div>
                </div>
              </div>

              {/* Rank Progress */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-black text-on-surface mb-2">Progression du Rang</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{userProfile.rank}</span>
                      <span>{userProfile.nextRank}</span>
                    </div>
                    <Progress value={userProfile.progress} className="h-3" />
                    <p className="text-xs text-muted-foreground">
                      {userProfile.progress}% complété • Membre depuis {userProfile.memberSince}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <h4 className="font-black text-on-surface">Accès Rapide</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="h-10">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" size="sm" className="h-10">
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Stats Grid */}
      <StaggerChildren staggerDelay={0.05}>
        <div className={`grid ${statsGridCols} gap-4 sm:gap-6`}>
          {userStats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Card className="border-none bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                      {stat.title}
                    </p>
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.bg)}>
                      <stat.icon className={cn("w-4 h-4", stat.color)} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl sm:text-2xl font-black text-on-surface">{stat.value}</p>
                    {stat.trendUp !== null && (
                      <div className="flex items-center text-[10px] font-bold">
                        {stat.trendUp ? (
                          <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1 text-amber-500" />
                        )}
                        <span className={stat.trendUp ? "text-green-500" : "text-amber-500"}>
                          {stat.trend}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </StaggerChildren>

      {/* Main Content Tabs */}
      <FadeIn duration={0.8} delay={0.4}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="activities">Mes activités</TabsTrigger>
            <TabsTrigger value="actions">Actions rapides</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="border-none">
                <CardHeader>
                  <h3 className="text-lg font-black text-on-surface">Activités récentes</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activities?.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container transition-colors">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", getStatusColor(activity.status))}>
                        {React.createElement(getStatusIcon(activity.type), { className: "w-5 h-5" })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-on-surface truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status === 'completed' ? 'Terminé' : 
                         activity.status === 'pending' ? 'En attente' : 'En cours'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="border-none">
                <CardHeader>
                  <h3 className="text-lg font-black text-on-surface">Événements à venir</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Stage International Shaolin</p>
                        <p className="text-xs text-blue-700">15-17 Juin 2024 • Dakar</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-purple-900">Examen de passage de grade</p>
                        <p className="text-xs text-purple-700">30 Juin 2024 • Thiès</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card className="border-none">
              <CardHeader>
                <h3 className="text-lg font-black text-on-surface">Toutes mes activités</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities?.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", getStatusColor(activity.status))}>
                          {React.createElement(getStatusIcon(activity.type), { className: "w-5 h-5" })}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-on-surface">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status === 'completed' ? 'Terminé' : 
                           activity.status === 'pending' ? 'En attente' : 'En cours'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {quickActions.map((action, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <Card className="border-none group cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", action.bg, action.text)}>
                          <action.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-on-surface mb-1">{action.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                          <Button 
                            size="sm" 
                            className={cn(action.bg, action.text, action.hover, "rounded-lg")}
                            onClick={action.action}
                          >
                            Commencer
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
}
