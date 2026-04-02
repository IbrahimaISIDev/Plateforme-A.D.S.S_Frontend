import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';
import { FadeIn, SlideIn } from '@/components/ui/transitions';
import { 
  Users, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Calendar,
  Edit,
  FileText,
  Settings,
  CreditCard,
  BarChart3
} from 'lucide-react';

interface DashboardLayoutProps {
  role: 'admin' | 'treasurer' | 'secretary' | 'club_responsible';
  children: React.ReactNode;
}

const roleConfig = {
  admin: { 
    color: 'bg-gradient-to-r from-blue-600 to-purple-600',
    title: 'Administration A.D.S.S',
    description: 'Gestion complète de la plateforme'
  },
  treasurer: { 
    color: 'bg-gradient-to-r from-green-600 to-emerald-600',
    title: 'Trésorerie',
    description: 'Gestion financière et paiements'
  },
  secretary: { 
    color: 'bg-gradient-to-r from-orange-600 to-red-600',
    title: 'Secrétariat',
    description: 'Gestion administrative et documents'
  },
  club_responsible: { 
    color: 'bg-gradient-to-r from-indigo-600 to-blue-600',
    title: 'Responsable de Club',
    description: 'Gestion des membres et activités'
  }
};

const stats = {
  admin: [
    { label: 'Total Clubs', value: '156', trend: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Licences Actives', value: '2,890', trend: '+8%', icon: Award, color: 'text-green-600' },
    { label: 'Revenus Année', value: '45.2M', trend: '+15%', icon: CreditCard, color: 'text-purple-600' },
    { label: 'Taux Conversion', value: '87%', trend: '+3%', icon: TrendingUp, color: 'text-orange-600' }
  ],
  treasurer: [
    { label: 'Revenus Mensuel', value: '3.8M', trend: '+12%', icon: CreditCard, color: 'text-green-600' },
    { label: 'Dépenses', value: '1.2M', trend: '-5%', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Profit Net', value: '2.6M', trend: '+18%', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Transactions', value: '1,245', trend: '+8%', icon: BarChart3, color: 'text-purple-600' }
  ],
  secretary: [
    { label: 'Licences Actives', value: '2,890', trend: '+12%', icon: Award, color: 'text-green-600' },
    { label: 'Nouvelles Demandes', value: '45', trend: '-5%', icon: AlertTriangle, color: 'text-orange-600' },
    { label: 'Affiliations Validées', value: '89', trend: '+3%', icon: CheckCircle, color: 'text-blue-600' },
    { label: 'Documents Générés', value: '156', trend: '+8%', icon: Eye, color: 'text-purple-600' }
  ],
  club_responsible: [
    { label: 'Total Élèves', value: '156', trend: '+5%', icon: Users, color: 'text-blue-600' },
    { label: 'Présences Semaine', value: '89%', trend: '+2%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Cours du Mois', value: '124', trend: '+8%', icon: Calendar, color: 'text-purple-600' },
    { label: 'Progressions Validées', value: '23', trend: '+12%', icon: Award, color: 'text-orange-600' }
  ]
};

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const [user] = React.useState({
    firstName: 'Ibrahima',
    lastName: 'DIALLO',
    email: 'admin@adss.com'
  });

  const currentStats = React.useMemo(() => stats[role] || stats.admin, [role]);

  const quickActions = [
    { 
      title: "Nouvelle Demande", 
      description: "Créer une nouvelle demande", 
      icon: FileText,
      href: "/demandes/new"
    },
    { 
      title: "Gestion Clubs", 
      description: "Gérer les clubs affiliés", 
      icon: Users,
      href: "/clubs"
    },
    { 
      title: "Rapports", 
      description: "Voir les rapports", 
      icon: BarChart3,
      href: "/reports"
    },
    { 
      title: "Paramètres", 
      description: "Configuration système", 
      icon: Settings,
      href: "/settings"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={cn("bg-white shadow-sm border-b", roleConfig[role].color)}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {roleConfig[role].title}
              </h1>
              <p className="text-white/80 text-sm">
                {roleConfig[role].description}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {user.firstName} {user.lastName}
              </Badge>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Edit className="w-4 h-4 mr-2" />
                Profil
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              <Link href="/dashboard">
                <a className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-gray-900">
                  <BarChart3 className="w-4 h-4" />
                  <span>Tableau de bord</span>
                </a>
              </Link>
              <Link href="/demandes">
                <a className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-gray-900">
                  <FileText className="w-4 h-4" />
                  <span>Demandes</span>
                </a>
              </Link>
              <Link href="/clubs">
                <a className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-gray-900">
                  <Users className="w-4 h-4" />
                  <span>Clubs</span>
                </a>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <FadeIn duration={0.6}>
            {/* Stats Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Vue d'ensemble
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentStats.map((stat, index) => (
                  <SlideIn key={index} direction="up" delay={index * 0.1}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className={cn("text-sm font-medium", stat.color)}>
                              {stat.trend}
                            </p>
                          </div>
                          <stat.icon className={cn("w-8 h-8", stat.color)} />
                        </div>
                      </CardContent>
                    </Card>
                  </SlideIn>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions Rapides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <Link href={action.href}>
                      <CardContent className="p-4 text-center">
                        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3", roleConfig[role].color)}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </FadeIn>
        </main>
      </div>
    </div>
  );
}

// Role-specific dashboard components
export function AdminDashboard({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="admin">
      {children}
    </DashboardLayout>
  );
}

export function TreasurerDashboard({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="treasurer">
      {children}
    </DashboardLayout>
  );
}

export function SecretaryDashboard({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="secretary">
      {children}
    </DashboardLayout>
  );
}

export function ClubDashboard({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="club_responsible">
      {children}
    </DashboardLayout>
  );
}
