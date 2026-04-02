import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  Award,
  Activity,
  Eye,
  Edit,
  Plus,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn, SlideIn } from '@/components/ui/transitions';
import { useAuth } from '@/components/auth/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'treasurer' | 'secretary' | 'club_responsible';
}

// Memoize role config to prevent re-renders
const getRoleConfig = (role: string) => {
  switch (role) {
    case 'admin':
      return {
        title: 'Tableau de Bord Administrateur',
        subtitle: 'Gestion complète de l\'A.D.S.S',
        color: 'bg-purple-600',
        permissions: ['manage_users', 'manage_clubs', 'manage_demands', 'manage_payments', 'view_reports', 'manage_settings']
      };
    case 'treasurer':
      return {
        title: 'Tableau de Bord Trésorier',
        subtitle: 'Gestion financière et des paiements',
        color: 'bg-green-600',
        permissions: ['view_payments', 'manage_payments', 'view_reports', 'export_financial']
      };
    case 'secretary':
      return {
        title: 'Tableau de Bord Secrétaire',
        subtitle: 'Gestion des licences et affiliations',
        color: 'bg-blue-600',
        permissions: ['manage_licenses', 'manage_affiliations', 'view_members', 'generate_documents']
      };
    case 'club_responsible':
      return {
        title: 'Tableau de Bord Club',
        subtitle: 'Gestion des membres et des activités',
        color: 'bg-orange-600',
        permissions: ['manage_members', 'view_schedule', 'manage_attendance', 'view_progress']
      };
    default:
      return {
        title: 'Tableau de Bord',
        subtitle: 'Bienvenue sur A.D.S.S',
        color: 'bg-gray-600',
        permissions: []
      };
  }
};

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, hasPermission } = useAuth();
  const roleConfig = React.useMemo(() => getRoleConfig(role), [role]);

  const navigationItems = React.useMemo(() => [
    { label: 'Vue d\'ensemble', href: '/dashboard', icon: Activity },
    { label: 'Membres', href: '/members', icon: Users },
    { label: 'Clubs', href: '/clubs', icon: Award },
    { label: 'Demandes', href: '/demands', icon: AlertTriangle },
    { label: 'Paiements', href: '/payments', icon: DollarSign },
    { label: 'Calendrier', href: '/calendar', icon: Calendar },
    { label: 'Rapports', href: '/reports', icon: Eye }
  ], []);

  const filteredNavigation = React.useMemo(() => {
    return navigationItems.filter(item => {
      switch (role) {
        case 'admin':
          return true; // Admin voit tout
        case 'treasurer':
          return ['members', 'payments', 'reports'].includes(item.href.replace('/', ''));
        case 'secretary':
          return ['members', 'clubs', 'demands', 'reports'].includes(item.href.replace('/', ''));
        case 'club_responsible':
          return ['members', 'calendar'].includes(item.href.replace('/', ''));
        default:
          return ['dashboard'].includes(item.href.replace('/', ''));
      }
    });
  }, [navigationItems, role]);

  const quickActions = React.useMemo(() => [
    {
      title: 'Nouvelle Demande',
      description: 'Créer une demande d\'affiliation',
      icon: Plus,
      href: '/demands/new',
      permission: 'manage_demands'
    },
    {
      title: 'Nouveau Membre',
      description: 'Ajouter un nouvel élève',
      icon: Plus,
      href: '/members/new',
      permission: 'manage_members'
    },
    {
      title: 'Générer Licence',
      description: 'Créer une licence pour un membre',
      icon: Award,
      href: '/licenses/generate',
      permission: 'manage_licenses'
    },
    {
      title: 'Rapport Financier',
      description: 'Exporter le rapport mensuel',
      icon: Eye,
      href: '/reports/financial',
      permission: 'view_reports'
    }
  ], []);

  const filteredQuickActions = React.useMemo(() => {
    return quickActions.filter(action => 
      action.permission && hasPermission(action.permission)
    );
  }, [quickActions, hasPermission]);

  const stats = React.useMemo(() => ({
    admin: [
      { label: 'Total Clubs', value: '127', trend: '+12%', icon: Award, color: 'text-purple-600' },
      { label: 'Total Membres', value: '3,456', trend: '+8%', icon: Users, color: 'text-blue-600' },
      { label: 'Demandes Actives', value: '45', trend: '-5%', icon: AlertTriangle, color: 'text-orange-600' },
      { label: 'Revenus Mensuels', value: '2.4M', trend: '+15%', icon: DollarSign, color: 'text-green-600' }
    ],
    treasurer: [
      { label: 'Revenus Mois', value: '2.4M', trend: '+15%', icon: DollarSign, color: 'text-green-600' },
      { label: 'Paiements Reçus', value: '1,890', trend: '+10%', icon: CheckCircle, color: 'text-blue-600' },
      { label: 'Paiements En Attente', value: '234', trend: '-8%', icon: AlertTriangle, color: 'text-orange-600' },
      { label: 'Taux de Recouvrement', value: '89%', trend: '+2%', icon: TrendingUp, color: 'text-purple-600' }
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
  }), []);

  const currentStats = React.useMemo(() => stats[role] || stats.admin, [stats, role]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={cn("bg-white shadow-sm border-b", roleConfig.color)}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold text-white">
                  {roleConfig.title}
                </h1>
                <p className="text-sm text-white/80">
                  {roleConfig.subtitle}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {user?.firstName} {user?.lastName}
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
              {filteredNavigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-gray-100 text-gray-900"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
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
                            <p className="text-sm font-medium text-gray-600">
                              {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {stat.value}
                            </p>
                          </div>
                          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.color)}>
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">
                            {stat.trend} ce mois
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </SlideIn>
                ))}
              </div>
            </div>
            </FadeIn>

            {/* Quick Actions */}
            {filteredQuickActions.length > 0 && (
              <SlideIn direction="up" delay={0.4}>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Actions Rapides
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredQuickActions.map((action, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <Link to={action.href}>
                          <CardContent className="p-4 text-center">
                            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3", roleConfig.color)}>
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
              </SlideIn>
            )}

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
