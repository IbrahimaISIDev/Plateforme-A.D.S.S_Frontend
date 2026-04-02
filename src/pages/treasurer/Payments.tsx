import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  CreditCard,
  Banknote,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn, SlideIn } from '@/components/ui/transitions';
import { useAuth } from '@/components/auth/AuthContext';
import { TreasurerDashboard } from '@/components/dashboard/DashboardLayout';

interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  clubName: string;
  amount: number;
  type: 'affiliation' | 'license' | 'renewal';
  method: 'orange_money' | 'wave' | 'free_money' | 'card' | 'transfer';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  reference: string;
  description: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'Aliou Diop',
    clubName: 'Club Shaolin Dakar Centre',
    amount: 13000,
    type: 'affiliation',
    method: 'orange_money',
    status: 'completed',
    date: '2025-03-15 14:30',
    reference: 'PAY-2025-001',
    description: 'Affiliation + Licence Maître'
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Fatou Ndiaye',
    clubName: 'Club Kung Fu Guédiawaye',
    amount: 5000,
    type: 'license',
    method: 'wave',
    status: 'completed',
    date: '2025-03-14 10:15',
    reference: 'PAY-2025-002',
    description: 'Licence Élève'
  },
  {
    id: '3',
    memberId: '3',
    memberName: 'Moussa Sow',
    clubName: 'Club Shaolin Dakar Centre',
    amount: 5000,
    type: 'renewal',
    method: 'card',
    status: 'pending',
    date: '2025-03-13 16:45',
    reference: 'PAY-2025-003',
    description: 'Renouvellement Licence'
  },
  {
    id: '4',
    memberId: '4',
    memberName: 'Omar Ba',
    clubName: 'Club Kung Fu Guédiawaye',
    amount: 13000,
    type: 'affiliation',
    method: 'transfer',
    status: 'failed',
    date: '2025-03-12 09:20',
    reference: 'PAY-2025-004',
    description: 'Affiliation Club'
  }
];

export default function TreasurerPaymentsPage() {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [methodFilter, setMethodFilter] = React.useState('all');
  const [dateFilter, setDateFilter] = React.useState('month');

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = `${payment.memberName} ${payment.clubName} ${payment.reference}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = mockPayments.filter(p => p.status === 'pending').length;
  const completedPayments = mockPayments.filter(p => p.status === 'completed').length;
  const failedPayments = mockPayments.filter(p => p.status === 'failed').length;

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'orange_money':
      case 'wave':
      case 'free_money':
        return <CreditCard className="w-4 h-4" />;
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      case 'transfer':
        return <Banknote className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'orange_money': return 'Orange Money';
      case 'wave': return 'Wave';
      case 'free_money': return 'Free Money';
      case 'card': return 'Carte Bancaire';
      case 'transfer': return 'Virement Bancaire';
      default: return method;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'refunded': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Complété';
      case 'pending': return 'En attente';
      case 'failed': return 'Échoué';
      case 'refunded': return 'Remboursé';
      default: return status;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'affiliation': return 'Affiliation';
      case 'license': return 'Licence';
      case 'renewal': return 'Renouvellement';
      default: return type;
    }
  };

  return (
    <TreasurerDashboard>
      <FadeIn duration={0.6}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
              <p className="text-gray-600">Suivez et validez tous les paiements de la plateforme</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Exporter Rapport
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Rapport Mensuel
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="payments">Paiements</TabsTrigger>
              <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SlideIn direction="up" delay={0.1}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Revenus Totaux</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {(totalRevenue / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">+15% ce mois</span>
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>

                <SlideIn direction="up" delay={0.2}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Paiements Complétés</p>
                          <p className="text-2xl font-bold text-gray-900">{completedPayments}</p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">+10% ce mois</span>
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>

                <SlideIn direction="up" delay={0.3}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Paiements En Attente</p>
                          <p className="text-2xl font-bold text-gray-900">{pendingPayments}</p>
                        </div>
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <TrendingDown className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600">-5% ce mois</span>
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>

                <SlideIn direction="up" delay={0.4}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Paiements Échoués</p>
                          <p className="text-2xl font-bold text-gray-900">{failedPayments}</p>
                        </div>
                        <div className="p-2 bg-red-100 rounded-lg">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">-2% ce mois</span>
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Transactions Récentes</CardTitle>
                  <CardDescription>Les 5 dernières transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPayments.slice(0, 5).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getPaymentIcon(payment.method)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{payment.memberName}</p>
                            <p className="text-sm text-gray-600">{payment.clubName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{payment.amount.toLocaleString()} F</p>
                          <Badge className={cn(getStatusColor(payment.status))}>
                            {getStatusText(payment.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom, club ou référence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="completed">Complétés</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="failed">Échoués</SelectItem>
                    <SelectItem value="refunded">Remboursés</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les méthodes</SelectItem>
                    <SelectItem value="orange_money">Orange Money</SelectItem>
                    <SelectItem value="wave">Wave</SelectItem>
                    <SelectItem value="free_money">Free Money</SelectItem>
                    <SelectItem value="card">Carte Bancaire</SelectItem>
                    <SelectItem value="transfer">Virement</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="year">Cette année</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payments Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Liste des Paiements</CardTitle>
                  <CardDescription>
                    {filteredPayments.length} paiement{filteredPayments.length > 1 ? 's' : ''} trouvé{filteredPayments.length > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Membre</TableHead>
                        <TableHead>Club</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Méthode</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Référence</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{payment.memberName}</p>
                              <p className="text-sm text-gray-600">{payment.clubName}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getTypeName(payment.type)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p className="font-bold text-gray-900">{payment.amount.toLocaleString()} F</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getPaymentIcon(payment.method)}
                              <span className="text-sm">{getPaymentMethodName(payment.method)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={cn(getStatusColor(payment.status))}>
                              {getStatusText(payment.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {payment.reference}
                            </code>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {payment.status === 'pending' && (
                                <Button variant="ghost" size="sm" className="text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenus par Méthode</CardTitle>
                    <CardDescription>Répartition des revenus selon les méthodes de paiement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['orange_money', 'wave', 'card', 'transfer'].map((method) => {
                        const methodRevenue = mockPayments
                          .filter(p => p.method === method && p.status === 'completed')
                          .reduce((sum, p) => sum + p.amount, 0);
                        
                        return (
                          <div key={method} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getPaymentIcon(method)}
                              <span>{getPaymentMethodName(method)}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{methodRevenue.toLocaleString()} F</p>
                              <p className="text-sm text-gray-600">
                                {((methodRevenue / totalRevenue) * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenus par Type</CardTitle>
                    <CardDescription>Répartition des revenus selon les types de paiement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['affiliation', 'license', 'renewal'].map((type) => {
                        const typeRevenue = mockPayments
                          .filter(p => p.type === type && p.status === 'completed')
                          .reduce((sum, p) => sum + p.amount, 0);
                        
                        return (
                          <div key={type} className="flex items-center justify-between">
                            <span>{getTypeName(type)}</span>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{typeRevenue.toLocaleString()} F</p>
                              <p className="text-sm text-gray-600">
                                {((typeRevenue / totalRevenue) * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </FadeIn>
    </TreasurerDashboard>
  );
}
