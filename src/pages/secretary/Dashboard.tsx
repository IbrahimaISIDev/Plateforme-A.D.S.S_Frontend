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
  Users,
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  Filter,
  Download,
  Award,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn, SlideIn } from '@/components/ui/transitions';
import { useAuth } from '@/components/auth/AuthContext';
import { SecretaryDashboard } from '@/components/dashboard/DashboardLayout';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  grade: string;
  clubId: string;
  clubName: string;
  licenseNumber: string;
  licenseStatus: 'active' | 'expired' | 'pending' | 'suspended';
  licenseExpiryDate: string;
  joinDate: string;
  avatar?: string;
}

interface Club {
  id: string;
  name: string;
  responsibleName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  membersCount: number;
  status: 'active' | 'inactive' | 'suspended';
  affiliationDate: string;
}

interface Affiliation {
  id: string;
  clubName: string;
  responsibleName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submissionDate: string;
  reviewDate?: string;
  reviewerName?: string;
  rejectionReason?: string;
  documents: Array<{
    type: 'cin' | 'photo' | 'schedule' | 'other';
    name: string;
    url: string;
  }>;
}

const mockMembers: Member[] = [
  {
    id: '1',
    firstName: 'Aliou',
    lastName: 'Diop',
    email: 'aliou.diop@adss.sn',
    phone: '+221 77 123 45 67',
    dateOfBirth: '1990-05-15',
    grade: 'Ceinture Noire 3ème Dan',
    clubId: '1',
    clubName: 'Club Shaolin Dakar Centre',
    licenseNumber: 'ADSS-2025-001',
    licenseStatus: 'active',
    licenseExpiryDate: '2026-03-15',
    joinDate: '2023-01-15',
    avatar: '/avatars/aliou.jpg'
  },
  {
    id: '2',
    firstName: 'Fatou',
    lastName: 'Ndiaye',
    email: 'fatou.ndiaye@adss.sn',
    phone: '+221 76 234 56 78',
    dateOfBirth: '1995-08-22',
    grade: 'Ceinture Verte 1er Dan',
    clubId: '1',
    clubName: 'Club Shaolin Dakar Centre',
    licenseNumber: 'ADSS-2025-002',
    licenseStatus: 'pending',
    licenseExpiryDate: '2025-09-20',
    joinDate: '2023-03-20',
    avatar: '/avatars/fatou.jpg'
  },
  {
    id: '3',
    firstName: 'Moussa',
    lastName: 'Sow',
    email: 'moussa.sow@adss.sn',
    phone: '+221 33 456 78 90',
    dateOfBirth: '1988-12-10',
    grade: 'Ceinture Bleue 2ème Dan',
    clubId: '2',
    clubName: 'Club Kung Fu Guédiawaye',
    licenseNumber: 'ADSS-2025-003',
    licenseStatus: 'expired',
    licenseExpiryDate: '2024-12-31',
    joinDate: '2023-06-10',
    avatar: '/avatars/moussa.jpg'
  }
];

const mockClubs: Club[] = [
  {
    id: '1',
    name: 'Club Shaolin Dakar Centre',
    responsibleName: 'Aliou Diop',
    email: 'aliou.diop@adss.sn',
    phone: '+221 77 123 45 67',
    address: 'Rue de la République, 45',
    city: 'Dakar',
    membersCount: 156,
    status: 'active',
    affiliationDate: '2020-05-15'
  },
  {
    id: '2',
    name: 'Club Kung Fu Guédiawaye',
    responsibleName: 'Fatou Ndiaye',
    email: 'fatou.ndiaye@adss.sn',
    phone: '+221 76 234 56 78',
    address: 'Avenue Cheikh Anta Diop, 12',
    city: 'Guédiawaye',
    membersCount: 89,
    status: 'active',
    affiliationDate: '2021-09-20'
  }
];

const mockAffiliations: Affiliation[] = [
  {
    id: '1',
    clubName: 'Nouveau Club Kung Fu Thiès',
    responsibleName: 'Omar Ba',
    email: 'omar.ba@adss.sn',
    phone: '+221 33 456 78 90',
    address: 'Avenue du 1er Mai, 15',
    city: 'Thiès',
    status: 'pending',
    submissionDate: '2025-03-15 10:30',
    documents: [
      { type: 'cin', name: 'cin_omar_ba.pdf', url: '/documents/cin_omar_ba.pdf' },
      { type: 'photo', name: 'photo_omar_ba.jpg', url: '/documents/photo_omar_ba.jpg' }
    ]
  },
  {
    id: '2',
    clubName: 'Club Shaolin Saint-Louis',
    responsibleName: 'Mariam Sarr',
    email: 'mariam.sarr@adss.sn',
    phone: '+221 33 123 45 67',
    address: 'Boulevard de la Liberté, 8',
    city: 'Saint-Louis',
    status: 'under_review',
    submissionDate: '2025-03-14 14:20',
    reviewDate: '2025-03-15 09:15',
    reviewerName: 'Secrétaire Général',
    documents: [
      { type: 'cin', name: 'cin_mariam_sarr.pdf', url: '/documents/cin_mariam_sarr.pdf' },
      { type: 'photo', name: 'photo_mariam_sarr.jpg', url: '/documents/photo_mariam_sarr.jpg' },
      { type: 'schedule', name: 'schedule_mariam_sarr.pdf', url: '/documents/schedule_mariam_sarr.pdf' }
    ]
  },
  {
    id: '3',
    clubName: 'Club Kung Fu Kaolack',
    responsibleName: 'Ibrahim Fall',
    email: 'ibrahim.fall@adss.sn',
    phone: '+221 33 987 65 43',
    address: 'Route de l\'Espoir, 25',
    city: 'Kaolack',
    status: 'rejected',
    submissionDate: '2025-03-13 16:45',
    reviewDate: '2025-03-14 11:30',
    reviewerName: 'Secrétaire Général',
    rejectionReason: 'Documents incomplets - CIN manquante',
    documents: [
      { type: 'photo', name: 'photo_ibrahim_fall.jpg', url: '/documents/photo_ibrahim_fall.jpg' }
    ]
  }
];

export default function SecretaryDashboardPage() {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = React.useState('licenses');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);
  const [showMemberDetails, setShowMemberDetails] = React.useState(false);

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = `${member.firstName} ${member.lastName} ${member.email} ${member.licenseNumber}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.licenseStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAffiliations = mockAffiliations.filter(affiliation => {
    const matchesSearch = `${affiliation.clubName} ${affiliation.responsibleName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || affiliation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setShowMemberDetails(true);
  };

  const handleGenerateLicense = (member: Member) => {
    console.log('Generate license for:', member);
  };

  const handleApproveAffiliation = (affiliation: Affiliation) => {
    console.log('Approve affiliation:', affiliation);
  };

  const handleRejectAffiliation = (affiliation: Affiliation) => {
    console.log('Reject affiliation:', affiliation);
  };

  const getLicenseStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'suspended': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLicenseStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'En attente';
      case 'expired': return 'Expirée';
      case 'suspended': return 'Suspendue';
      default: return status;
    }
  };

  const getAffiliationStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'under_review': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAffiliationStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvée';
      case 'under_review': return 'En révision';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  };

  return (
    <SecretaryDashboard>
      <FadeIn duration={0.6}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion Administrative</h1>
              <p className="text-gray-600">Gérez les licences, affiliations et documents</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Award className="w-4 h-4 mr-2" />
                Générer Licence
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Exporter Documents
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="licenses">Licences</TabsTrigger>
              <TabsTrigger value="affiliations">Affiliations</TabsTrigger>
              <TabsTrigger value="clubs">Clubs</TabsTrigger>
            </TabsList>

            {/* Licenses Tab */}
            <TabsContent value="licenses" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom, email ou numéro de licence..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="expired">Expirées</SelectItem>
                    <SelectItem value="suspended">Suspendues</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">2,890</p>
                        <p className="text-sm text-gray-600">Licences Actives</p>
                      </div>
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">45</p>
                        <p className="text-sm text-gray-600">En Attente</p>
                      </div>
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">156</p>
                        <p className="text-sm text-gray-600">Expirées</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">3,234</p>
                        <p className="text-sm text-gray-600">Total Générées</p>
                      </div>
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Members Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Liste des Licences</CardTitle>
                  <CardDescription>
                    {filteredMembers.length} membre{filteredMembers.length > 1 ? 's' : ''} trouvé{filteredMembers.length > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Membre</TableHead>
                        <TableHead>Club</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Licence</TableHead>
                        <TableHead>Expiration</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                {member.avatar ? (
                                  <img src={member.avatar} alt={member.firstName} className="w-8 h-8 rounded-full" />
                                ) : (
                                  <Users className="w-4 h-4 text-gray-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {member.firstName} {member.lastName}
                                </p>
                                <p className="text-sm text-gray-600">{member.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{member.clubName}</p>
                              <p className="text-sm text-gray-600">{member.dateOfBirth}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{member.grade}</Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {member.licenseNumber}
                            </code>
                          </TableCell>
                          <TableCell>{member.licenseExpiryDate}</TableCell>
                          <TableCell>
                            <Badge className={cn(getLicenseStatusColor(member.licenseStatus))}>
                              {getLicenseStatusText(member.licenseStatus)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewMember(member)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleGenerateLicense(member)}>
                                <Award className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Affiliations Tab */}
            <TabsContent value="affiliations" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom de club ou responsable..."
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
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="under_review">En révision</SelectItem>
                    <SelectItem value="approved">Approuvées</SelectItem>
                    <SelectItem value="rejected">Rejetées</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Affiliations List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAffiliations.map((affiliation) => (
                  <Card key={affiliation.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{affiliation.clubName}</h3>
                          <Badge className={cn(getAffiliationStatusColor(affiliation.status))}>
                            {getAffiliationStatusText(affiliation.status)}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {affiliation.status === 'pending' && (
                            <Button variant="ghost" size="sm" className="text-green-600" onClick={() => handleApproveAffiliation(affiliation)}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          {affiliation.status === 'under_review' && (
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleRejectAffiliation(affiliation)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{affiliation.responsibleName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{affiliation.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{affiliation.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{affiliation.address}, {affiliation.city}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Soumission: {affiliation.submissionDate}
                      </div>
                      {affiliation.reviewDate && (
                        <div className="text-sm text-gray-600">
                          Révision: {affiliation.reviewDate} par {affiliation.reviewerName}
                        </div>
                      )}
                      {affiliation.rejectionReason && (
                        <div className="text-sm text-red-600">
                          Motif: {affiliation.rejectionReason}
                        </div>
                      )}
                      <div className="flex items-center space-x-2 mt-4">
                        <span className="text-sm text-gray-600">Documents:</span>
                        {affiliation.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="ml-2">
                            {doc.type === 'cin' ? 'CIN' :
                             doc.type === 'photo' ? 'Photo' :
                             doc.type === 'schedule' ? 'Planning' : 'Autre'}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Clubs Tab */}
            <TabsContent value="clubs" className="space-y-6">
              {/* Clubs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockClubs.map((club) => (
                  <Card key={club.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{club.name}</h3>
                          <Badge variant="default">Actif</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MapPin className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{club.responsibleName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{club.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{club.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{club.address}, {club.city}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Membres</p>
                          <p className="font-medium text-gray-900">{club.membersCount}</p>
                        </div>
                        <div className="text-sm text-gray-600">
                          Affilié le {club.affiliationDate}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Member Details Modal */}
        {showMemberDetails && selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Détails de la Licence</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMemberDetails(false)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        {selectedMember.avatar ? (
                          <img src={selectedMember.avatar} alt={selectedMember.firstName} className="w-16 h-16 rounded-full" />
                        ) : (
                          <Users className="w-8 h-8 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedMember.firstName} {selectedMember.lastName}
                        </h3>
                        <Badge className={cn(getLicenseStatusColor(selectedMember.licenseStatus))}>
                          {getLicenseStatusText(selectedMember.licenseStatus)}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Email:</span> {selectedMember.email}</p>
                      <p><span className="font-medium">Téléphone:</span> {selectedMember.phone}</p>
                      <p><span className="font-medium">Date de naissance:</span> {selectedMember.dateOfBirth}</p>
                      <p><span className="font-medium">Club:</span> {selectedMember.clubName}</p>
                      <p><span className="font-medium">Grade:</span> {selectedMember.grade}</p>
                      <p><span className="font-medium">Numéro de licence:</span> {selectedMember.licenseNumber}</p>
                      <p><span className="font-medium">Date d'expiration:</span> {selectedMember.licenseExpiryDate}</p>
                      <p><span className="font-medium">Date d'inscription:</span> {selectedMember.joinDate}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                      <div className="flex space-x-2">
                        <Button>
                          <Award className="w-4 h-4 mr-2" />
                          Régénérer Licence
                        </Button>
                        <Button variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Télécharger Documents
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </FadeIn>
    </SecretaryDashboard>
  );
}
