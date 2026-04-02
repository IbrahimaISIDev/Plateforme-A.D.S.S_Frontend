import React, { useState } from 'react';
import { useParams } from 'wouter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    Building2,
    User,
    FileText,
    CheckCircle2,
    XCircle,
    HelpCircle,
    Printer,
    Download,
    Clock,
    MessageSquare,
    Lock,
    Image as ImageIcon,
    FileBox,
    Share2,
    Edit,
    Send,
    Eye,
    AlertTriangle,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Shield,
    FileCheck,
    History,
    Bell
} from 'lucide-react';
import { FadeIn, StaggerChildren } from '@/components/ui/transitions';
import { useToast } from '@/components/ui/notifications';
import { useAsyncState } from '@/hooks/useAsyncState';
import { useResponsiveLayout } from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';

interface Demand {
  id: string;
  type: 'affiliation' | 'license' | 'renewal';
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'clarification_needed';
  title: string;
  applicant: {
    name: string;
    email: string;
    phone: string;
    club?: string;
  };
  submissionDate: string;
  lastUpdate: string;
  description: string;
  documents: Array<{
    name: string;
    size: string;
    icon: any;
    uploaded: string;
  }>;
  timeline: Array<{
    label: string;
    date: string;
    status: 'completed' | 'active' | 'pending';
  }>;
  actions?: Array<{
    type: 'approve' | 'reject' | 'request_info';
    label: string;
    available: boolean;
  }>;
}

export default function DemandDetails() {
  const params = useParams();
  const demandId = params.id;
  const { success, error, warning, info } = useToast();
  const { isMobile } = useResponsiveLayout();
  const [activeTab, setActiveTab] = useState('overview');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [message, setMessage] = useState('');

  // Mock demand data
  const { data: demand, loading, error: demandError, retry } = useAsyncState(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (Math.random() > 0.9) {
      throw new Error('Demande non trouvée');
    }
    
    return {
      id: demandId,
      type: 'affiliation',
      status: 'in_review',
      title: 'Demande d\'affiliation - Shaolin Temple Dakar',
      applicant: {
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        phone: '+221 77 123 45 67',
        club: 'Shaolin Temple Dakar'
      },
      submissionDate: '15 Mars 2026 • 09:12',
      lastUpdate: '18 Mars 2026 • 14:30',
      description: 'Demande d\'affiliation pour rejoindre l\'association A.D.S.S en tant que club officiel. Nous proposons d\'enseigner le Kung Fu Shaolin traditionnel avec des cours pour tous les âges et niveaux.',
      documents: [
        { name: "Photo d'identité", size: '1.2 MB', icon: ImageIcon, uploaded: '15/03/2026' },
        { name: 'Copie CIN', size: '850 KB', icon: FileBox, uploaded: '15/03/2026' },
        { name: "Statuts de l'association", size: '3.4 MB', icon: FileText, uploaded: '15/03/2026' },
        { name: 'Liste des membres fondateurs', size: '186 KB', icon: Share2, uploaded: '16/03/2026' },
        { name: 'Justificatif de domicile', size: '2.1 MB', icon: Building2, uploaded: '16/03/2026' }
      ],
      timeline: [
        { label: 'Demande soumise', date: '15 Mars 2026 • 09:12', status: 'completed' },
        { label: 'Vérification documents', date: '15 Mars 2026 • 11:30', status: 'completed' },
        { label: 'En cours de revue', date: '16 Mars 2026 • 14:20', status: 'active' },
        { label: 'Décision finale', date: 'En cours...', status: 'pending' }
      ],
      actions: [
        { type: 'approve', label: 'Approuver', available: true },
        { type: 'reject', label: 'Rejeter', available: true },
        { type: 'request_info', label: 'Demander des informations', available: true }
      ]
    } as Demand;
  });

  const handleApprove = async () => {
    success('Demande approuvée', 'La demande a été approuvée avec succès.');
  };

  const handleReject = async () => {
    warning('Demande rejetée', 'La demande a été rejetée. Un email sera envoyé au demandeur.');
  };

  const handleRequestInfo = async () => {
    info('Demande d\'informations', 'Un email a été envoyé pour demander des informations complémentaires.');
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Simuler l'envoi du message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    success('Message envoyé', 'Votre message a été envoyé avec succès.');
    setMessage('');
    setShowMessageDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'in_review': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'clarification_needed': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2;
      case 'active': return Clock;
      case 'pending': return HelpCircle;
      default: return Clock;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      case 'in_review': return 'En cours de revue';
      case 'clarification_needed': return 'Informations requises';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded animate-pulse w-1/3"></div>
        <div className="h-64 bg-muted rounded animate-pulse"></div>
        <div className="h-96 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  if (demandError || !demand) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Demande non trouvée</h3>
            <p className="text-muted-foreground mb-4">La demande que vous cherchez n'existe pas ou a été supprimée.</p>
            <Button onClick={retry} variant="outline">
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn duration={0.6}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="h-8">
                <History className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <Badge className={getStatusColor(demand.status)}>
                {getStatusLabel(demand.status)}
              </Badge>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-on-surface tracking-tight">
              {demand.title}
            </h1>
            <p className="text-muted-foreground">
              {demand.submissionDate} • Dernière mise à jour: {demand.lastUpdate}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-10">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </Button>
            <Button className="h-10">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-10">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contacter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contacter le demandeur</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={4}
                      placeholder="Tapez votre message ici..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!message.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </FadeIn>

      {/* Applicant Info */}
      <FadeIn duration={0.8} delay={0.2}>
        <Card className="border-none">
          <CardHeader>
            <h3 className="text-lg font-black text-on-surface">Informations du demandeur</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface">{demand.applicant.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {demand.applicant.club && `${demand.applicant.club} • `}
                      {demand.applicant.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{demand.applicant.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{demand.applicant.email}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-on-surface">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {demand.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Main Content Tabs */}
      <FadeIn duration={0.8} delay={0.4}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="timeline">Historique</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status Card */}
              <Card className="border-none">
                <CardHeader>
                  <h3 className="text-lg font-black text-on-surface">État actuel</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", getStatusColor(demand.status))}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface">{getStatusLabel(demand.status)}</p>
                      <p className="text-sm text-muted-foreground">Dernière mise à jour: {demand.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      {demand.status === 'in_review' && 'Votre demande est actuellement en cours de révision par notre équipe d\'administration.'}
                      {demand.status === 'approved' && 'Félicitations ! Votre demande a été approuvée.'}
                      {demand.status === 'rejected' && 'Votre demande a été rejetée. Consultez les raisons dans l\'email reçu.'}
                      {demand.status === 'clarification_needed' && 'Des informations complémentaires sont requises pour traiter votre demande.'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-none">
                <CardHeader>
                  <h3 className="text-lg font-black text-on-surface">Actions rapides</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {demand.actions?.map((action, i) => (
                    <Button
                      key={i}
                      variant={action.type === 'reject' ? 'destructive' : 'default'}
                      className="w-full justify-start"
                      onClick={() => {
                        if (action.type === 'approve') handleApprove();
                        else if (action.type === 'reject') handleReject();
                        else if (action.type === 'request_info') handleRequestInfo();
                      }}
                      disabled={!action.available}
                    >
                      {action.type === 'approve' && <CheckCircle2 className="w-4 h-4 mr-2" />}
                      {action.type === 'reject' && <XCircle className="w-4 h-4 mr-2" />}
                      {action.type === 'request_info' && <HelpCircle className="w-4 h-4 mr-2" />}
                      {action.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="border-none">
              <CardHeader>
                <h3 className="text-lg font-black text-on-surface">Documents fournis</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demand.documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-surface-container-low/50 hover:bg-surface-container transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <doc.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-on-surface">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.size} • Uploadé le {doc.uploaded}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="border-none">
              <CardHeader>
                <h3 className="text-lg font-black text-on-surface">Historique de la demande</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {demand.timeline.map((step, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          step.status === 'completed' ? 'bg-green-100' :
                          step.status === 'active' ? 'bg-blue-100' :
                          'bg-gray-100'
                        )}>
                          {React.createElement(getStatusIcon(step.status), { 
                            className: cn(
                              "w-5 h-5",
                              step.status === 'completed' ? 'text-green-600' :
                              step.status === 'active' ? 'text-blue-600' :
                              'text-gray-400'
                            )
                          })}
                        </div>
                        {i < demand.timeline.length - 1 && (
                          <div className="w-0.5 h-16 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <p className="font-medium text-on-surface">{step.label}</p>
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none">
                <CardHeader>
                  <h3 className="text-lg font-black text-on-surface">Décision</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full" 
                    onClick={handleApprove}
                    disabled={demand.status === 'approved' || demand.status === 'rejected'}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Approuver la demande
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleReject}
                    disabled={demand.status === 'approved' || demand.status === 'rejected'}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejeter la demande
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none">
                <CardHeader>
                  <h3 className="text-lg font-black text-on-surface">Communication</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full" onClick={handleRequestInfo}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Demander des informations
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    Envoyer une notification
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Générer un rapport
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
}
