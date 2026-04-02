import { createContext, useContext, useState, type ReactNode } from 'react';
import { useLocation } from 'wouter';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'club_manager' | 'member';
    club?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

// Base de données simulée d'utilisateurs
const MOCK_USERS = [
    {
        id: '1',
        name: 'Ibrahima S. DIALLO',
        email: 'admin@adss.com',
        password: 'admin123',
        role: 'admin' as const,
    },
    {
        id: '2',
        name: 'Jean Dupont',
        email: 'club@adss.com',
        password: 'club123',
        role: 'club_manager' as const,
        club: 'Shaolin Sport Club',
    },
    {
        id: '3',
        name: 'Marie Martin',
        email: 'member@adss.com',
        password: 'member123',
        role: 'member' as const,
        club: 'Shaolin Sport Club',
    },
    {
        id: '4',
        name: 'Pierre Bernard',
        email: 'pierre.bernard@email.com',
        password: 'member123',
        role: 'member' as const,
        club: 'Paris Martial Arts',
    },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [, setLocation] = useLocation();

    const login = async (email: string, password: string) => {
        setIsLoading(true);

        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);

        if (mockUser) {
            const { password, ...userWithoutPassword } = mockUser;
            setUser(userWithoutPassword);

            // Redirection selon le rôle
            switch (mockUser.role) {
                case 'admin':
                    setLocation('/admin/dashboard');
                    break;
                case 'club_manager':
                    setLocation('/dashboard');
                    break;
                case 'member':
                    setLocation('/dashboard');
                    break;
            }
        } else {
            throw new Error('Email ou mot de passe incorrect');
        }

        setIsLoading(false);
    };

    const register = async (name: string, email: string, _password: string) => {
        setIsLoading(true);

        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Vérifier si l'email existe déjà
        if (MOCK_USERS.some(u => u.email === email)) {
            throw new Error('Cet email est déjà utilisé');
        }

        // Créer un nouvel utilisateur (en pratique, on l'ajouterait à la base de données)
        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            role: 'member',
        };

        setUser(newUser);
        setLocation('/dashboard');
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        setLocation('/');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
