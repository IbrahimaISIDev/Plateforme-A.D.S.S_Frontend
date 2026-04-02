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
  Calendar,
  Award,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn, SlideIn } from '@/components/ui/transitions';
import { useAuth } from '@/components/auth/AuthContext';
import { ClubDashboard } from '@/components/dashboard/DashboardLayout';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  grade: string;
  joinDate: string;
  lastAttendance: string;
  attendanceRate: number;
  progressStatus: 'on_track' | 'behind' | 'excellent';
  avatar?: string;
}

interface Class {
  id: string;
  name: string;
  day: string;
  time: string;
  level: string;
  instructor: string;
  room: string;
  maxStudents: number;
  currentStudents: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

interface Progress {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  date: string;
  instructor: string;
  type: 'grade' | 'skill' | 'competition';
  description: string;
  status: 'pending_validation' | 'validated' | 'rejected';
}

const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Aliou',
    lastName: 'Diop',
    email: 'aliou.diop@adss.sn',
    phone: '+221 77 123 45 67',
    dateOfBirth: '2010-03-15',
    grade: 'Ceinture Jaune 1er Ji',
    joinDate: '2023-01-15',
    lastAttendance: '2025-03-15',
    attendanceRate: 92,
    progressStatus: 'on_track',
    avatar: '/avatars/aliou.jpg'
  },
  {
    id: '2',
    firstName: 'Fatou',
    lastName: 'Ndiaye',
    email: 'fatou.ndiaye@adss.sn',
    phone: '+221 76 234 56 78',
    dateOfBirth: '2012-08-22',
    grade: 'Ceinture Orange 2ème Ji',
    joinDate: '2023-03-20',
    lastAttendance: '2025-03-14',
    attendanceRate: 78,
    progressStatus: 'behind',
    avatar: '/avatars/fatou.jpg'
  },
  {
    id: '3',
    firstName: 'Moussa',
    lastName: 'Sow',
    email: 'moussa.sow@adss.sn',
    phone: '+221 33 456 78 90',
    dateOfBirth: '2009-12-10',
    grade: 'Ceinture Verte 3ème Ji',
    joinDate: '2023-06-10',
    lastAttendance: '2025-03-13',
    attendanceRate: 95,
    progressStatus: 'excellent',
    avatar: '/avatars/moussa.jpg'
  }
];

const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Kung Fu Base - Enfants',
    day: 'Lundi',
    time: '16:00-18:00',
    level: 'Débutant',
    instructor: 'Aliou Diop',
    room: 'Salle A',
    maxStudents: 30,
    currentStudents: 28,
    status: 'scheduled'
  },
  {
    id: '2',
    name: 'Kung Fu Avancé - Adultes',
    day: 'Mardi',
    time: '18:30-20:30',
    level: 'Avancé',
    instructor: 'Fatou Ndiaye',
    room: 'Salle B',
    maxStudents: 25,
    currentStudents: 25,
    status: 'ongoing'
  },
  {
    id: '3',
    name: 'Tai Chi - Tous niveaux',
    day: 'Mercredi',
    time: '17:00-18:30',
    level: 'Mixte',
    instructor: 'Moussa Sow',
    room: 'Salle C',
    maxStudents: 20,
    currentStudents: 15,
    status: 'completed'
  }
];

const mockProgress: Progress[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Aliou Diop',
    grade: 'Ceinture Jaune 1er Ji',
    date: '2025-03-10',
    instructor: 'Aliou Diop',
    type: 'grade',
    description: 'Maîtrise des techniques de base du 1er Ji',
    status: 'validated'
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Fatou Ndiaye',
    grade: 'Ceinture Orange 2ème Ji',
    date: '2025-03-08',
    instructor: 'Aliou Diop',
    type: 'skill',
    description: 'Progression en combat et self-défense',
    status: 'pending_validation'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Moussa Sow',
    grade: 'Ceinture Verte 3ème Ji',
    date: '2025-03-05',
    instructor: 'Fatou Ndiaye',
    type: 'competition',
    description: 'Participation au tournoi régional',
    status: 'validated'
  }
];

export default function ClubDashboardPage() {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = React.useState('students');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [gradeFilter, setGradeFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [showStudentDetails, setShowStudentDetails] = React.useState(false);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName} ${student.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || student.grade.includes(gradeFilter);
    const matchesStatus = statusFilter === 'all' || student.progressStatus === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const totalStudents = mockStudents.length;
  const averageAttendance = Math.round(mockStudents.reduce((sum, s) => sum + s.attendanceRate, 0) / totalStudents);
  const excellentProgress = mockStudents.filter(s => s.progressStatus === 'excellent').length;
  const behindProgress = mockStudents.filter(s => s.progressStatus === 'behind').length;

  const getProgressStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'on_track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excellent';
      case 'on_track': return 'À jour';
      case 'behind': return 'En retard';
      default: return status;
    }
  };

  const getClassStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'ongoing': return 'text-blue-600 bg-blue-100';
      case 'scheduled': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getClassStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'ongoing': return 'En cours';
      case 'scheduled': return 'Programmé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getProgressStatusColor = (status: string) => {
    switch (status) {
      case 'validated': return 'text-green-600 bg-green-100';
      case 'pending_validation': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressStatusText = (status: string) => {
    switch (status) {
      case 'validated': return 'Validée';
      case 'pending_validation': return 'En attente';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  };

  return (
    <ClubDashboard>
      <FadeIn duration={0.6}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion du Club</h1>
              <p className="text-gray-600">Gérez vos élèves, cours et progressions</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouvel Élève
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Planning
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="students">Élèves</TabsTrigger>
              <TabsTrigger value="classes">Cours</TabsTrigger>
              <TabsTrigger value="progress">Progressions</TabsTrigger>
            </TabsList>

            {/* Students Tab */}
            <TabsContent value="students" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <SlideIn direction="up" delay={0.1}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                          <p className="text-sm text-gray-600">Total Élèves</p>
                        </div>
                        <Users className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>

                <SlideIn direction="up" delay={0.2}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{averageAttendance}%</p>
                          <p className="text-sm text-gray-600">Présence Moyenne</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>

                <SlideIn direction="up" delay={0.3}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{excellentProgress}</p>
                          <p className="text-sm text-gray-600">Progressions Excellentes</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>

                <SlideIn direction="up" delay={0.4}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{behindProgress}</p>
                          <p className="text-sm text-gray-600">En Retard</p>
                        </div>
                        <TrendingDown className="w-8 h-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom, email ou grade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les grades</SelectItem>
                    <SelectItem value="Ceinture">Ceinture</SelectItem>
                    <SelectItem value="Ji">Ji</SelectItem>
                    <SelectItem value="Dan">Dan</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Progression" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les progressions</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="on_track">À jour</SelectItem>
                    <SelectItem value="behind">En retard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Students Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Liste des Élèves</CardTitle>
                  <CardDescription>
                    {filteredStudents.length} élève{filteredStudents.length > 1 ? 's' : ''} trouvé{filteredStudents.length > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Élève</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Dernière présence</TableHead>
                        <TableHead>Taux de présence</TableHead>
                        <TableHead>Progression</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                {student.avatar ? (
                                  <img src={student.avatar} alt={student.firstName} className="w-8 h-8 rounded-full" />
                                ) : (
                                  <Users className="w-4 h-4 text-gray-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {student.firstName} {student.lastName}
                                </p>
                                <p className="text-sm text-gray-600">{student.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.grade}</Badge>
                          </TableCell>
                          <TableCell>{student.joinDate}</TableCell>
                          <TableCell>{student.lastAttendance}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{student.attendanceRate}%</span>
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                student.attendanceRate >= 90 ? "bg-green-500" :
                                student.attendanceRate >= 70 ? "bg-yellow-500" : "bg-red-500"
                              )} />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={cn(getProgressStatusColor(student.progressStatus))}>
                              {getProgressStatusText(student.progressStatus)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(student)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
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

            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockClasses.map((classItem) => (
                  <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                          <Badge className={cn(getClassStatusColor(classItem.status))}>
                            {getClassStatusText(classItem.status)}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{classItem.day} - {classItem.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{classItem.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{classItem.room}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          <span>{classItem.level}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Capacité</p>
                          <p className="font-medium text-gray-900">
                            {classItem.currentStudents}/{classItem.maxStudents}
                          </p>
                        </div>
                        <div className={cn(
                          "w-full bg-gray-200 rounded-full h-2",
                          classItem.currentStudents >= classItem.maxStudents ? "bg-red-200" : "bg-green-200"
                        )}>
                          <div 
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              classItem.currentStudents >= classItem.maxStudents ? "bg-red-500" : "bg-green-500"
                            )}
                            style={{ 
                              width: `${(classItem.currentStudents / classItem.maxStudents) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProgress.map((progress) => (
                  <Card key={progress.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{progress.studentName}</h3>
                          <Badge className={cn(getProgressStatusColor(progress.status))}>
                            {getProgressStatusText(progress.status)}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          <span>{progress.grade}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{progress.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{progress.instructor}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        <p className="font-medium">Type:</p> {progress.type === 'grade' ? 'Grade' : progress.type === 'skill' ? 'Compétence' : 'Compétition'}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Description:</p> {progress.description}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Student Details Modal */}
        {showStudentDetails && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Détails de l'Élève</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowStudentDetails(false)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        {selectedStudent.avatar ? (
                          <img src={selectedStudent.avatar} alt={selectedStudent.firstName} className="w-16 h-16 rounded-full" />
                        ) : (
                          <Users className="w-8 h-8 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedStudent.firstName} {selectedStudent.lastName}
                        </h3>
                        <Badge className={cn(getProgressStatusColor(selectedStudent.progressStatus))}>
                          {getProgressStatusText(selectedStudent.progressStatus)}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Email:</span> {selectedStudent.email}</p>
                      <p><span className="font-medium">Téléphone:</span> {selectedStudent.phone}</p>
                      <p><span className="font-medium">Date de naissance:</span> {selectedStudent.dateOfBirth}</p>
                      <p><span className="font-medium">Grade:</span> {selectedStudent.grade}</p>
                      <p><span className="font-medium">Date d'inscription:</span> {selectedStudent.joinDate}</p>
                      <p><span className="font-medium">Dernière présence:</span> {selectedStudent.lastAttendance}</p>
                      <p><span className="font-medium">Taux de présence:</span> {selectedStudent.attendanceRate}%</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                      <div className="flex space-x-2">
                        <Button>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button variant="outline">
                          <Award className="w-4 h-4 mr-2" />
                          Valider Progression
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        )}
      </FadeIn>
    </ClubDashboard>
  );
}
