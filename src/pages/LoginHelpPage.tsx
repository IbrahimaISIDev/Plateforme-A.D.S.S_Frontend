import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Users, User } from 'lucide-react';

export default function LoginHelpPage() {
  const mockUsers = [
    {
      role: 'Administrateur',
      icon: Shield,
      color: 'bg-red-100 text-red-800 border-red-200',
      users: [
        { email: 'admin@adss.com', password: 'admin123', name: 'Ibrahima S. DIALLO' }
      ]
    },
    {
      role: 'Gestionnaire de Club',
      icon: Users,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      users: [
        { email: 'club@adss.com', password: 'club123', name: 'Jean Dupont' }
      ]
    },
    {
      role: 'Membre',
      icon: User,
      color: 'bg-green-100 text-green-800 border-green-200',
      users: [
        { email: 'member@adss.com', password: 'member123', name: 'Marie Martin' },
        { email: 'pierre.bernard@email.com', password: 'member123', name: 'Pierre Bernard' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/login">
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                <span>Retour à la connexion</span>
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight">A.D.S.S.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Identifiants de Test
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Utilisez ces comptes pour explorer les différentes interfaces de la plateforme A.D.S.S. 
            Chaque rôle donne accès à des fonctionnalités spécifiques.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {mockUsers.map((userType) => (
            <Card key={userType.role} className="relative overflow-hidden">
              <CardHeader className={`pb-4 ${userType.color.split(' ')[0]} border-b`}>
                <div className="flex items-center space-x-3">
                  <userType.icon className="w-6 h-6" />
                  <div>
                    <CardTitle className="text-lg">{userType.role}</CardTitle>
                    <CardDescription className="text-sm opacity-90">
                      Accès {userType.role.toLowerCase()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {userType.users.map((user, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="font-medium text-gray-900 mb-2">{user.name}</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-mono text-gray-900">{user.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mot de passe:</span>
                          <span className="font-mono text-gray-900">{user.password}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Comment utiliser ces comptes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">1. Choisir un compte</h4>
                <p className="text-sm text-blue-800">
                  Sélectionnez le compte qui correspond au rôle que vous souhaitez tester.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">2. Se connecter</h4>
                <p className="text-sm text-green-800">
                  Utilisez l'email et le mot de passe sur la page de connexion.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">3. Explorer l'interface</h4>
                <p className="text-sm text-purple-800">
                  Découvrez les fonctionnalités disponibles selon votre rôle.
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">4. Tester différents rôles</h4>
                <p className="text-sm text-orange-800">
                  Déconnectez-vous et essayez d'autres comptes pour comparer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bouton d'action */}
        <div className="text-center mt-8">
          <Link href="/login">
            <Button size="lg" className="px-8">
              Aller à la page de connexion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
