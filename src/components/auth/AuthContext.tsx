import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useToast } from '@/components/ui/notifications';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'instructor' | 'student' | 'parent';
  clubId?: string;
  permissions: string[];
  profile: {
    avatar?: string;
    phone?: string;
    rank?: string;
    level?: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: string[];
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { success, error, warning } = useToast();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    permissions: []
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          permissions: getRolePermissions(user.role)
        });
      } catch (err) {
        clearAuth();
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const getRolePermissions = (role: string): string[] => {
    const permissions = {
      admin: [
        'manage_users',
        'manage_clubs',
        'manage_demands',
        'manage_payments',
        'view_reports',
        'manage_settings',
        'delete_data'
      ],
      instructor: [
        'view_students',
        'manage_classes',
        'view_schedule',
        'manage_attendance',
        'view_reports'
      ],
      student: [
        'view_profile',
        'view_schedule',
        'view_progress',
        'view_payments'
      ],
      parent: [
        'view_children',
        'view_children_progress',
        'view_children_schedule',
        'manage_children_payments'
      ]
    };

    return permissions[role as keyof typeof permissions] || [];
  };

  const clearAuth = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      permissions: []
    });
  };

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Identifiants invalides');
      }

      const data = await response.json();
      const { user, token } = data;

      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        permissions: getRolePermissions(user.role)
      });

      success('Connexion réussie !', `Bienvenue ${user.firstName} ${user.lastName}`);
    } catch (err) {
      error('Erreur de connexion', err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    }
  };

  const register = async (userData: any) => {
    try {
      // Simulate API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'inscription');
      }

      const data = await response.json();
      const { user, token } = data;

      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        permissions: getRolePermissions(user.role)
      });

      success('Inscription réussie !', `Bienvenue ${user.firstName} ${user.lastName}`);
    } catch (err) {
      error('Erreur d\'inscription', err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    }
  };

  const logout = () => {
    clearAuth();
    warning('Déconnexion', 'Vous avez été déconnecté avec succès');
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token expiré');
      }

      const data = await response.json();
      const { token } = data;

      localStorage.setItem('auth_token', token);
      setState(prev => ({ ...prev, token }));
    } catch (err) {
      logout();
      throw err;
    }
  };

  const hasPermission = (permission: string): boolean => {
    return state.permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    return state.user?.role === role;
  };

  const updateUser = (updates: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      setState(prev => ({
        ...prev,
        user: updatedUser
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      refreshToken,
      hasPermission,
      hasRole,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Role-based components
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  fallback
}: ProtectedRouteProps) {
  const { isAuthenticated, hasRole, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <>{fallback || <div>Vous devez être connecté pour accéder à cette page.</div>}</>;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <>{fallback || <div>Vous n'avez pas les droits nécessaires pour accéder à cette page.</div>}</>;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback || <div>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</div>}</>;
  }

  return <>{children}</>;
}

// Permission-based component
interface PermissionGateProps {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({ permission, children, fallback }: PermissionGateProps) {
  const { hasPermission } = useAuth();

  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
}

// Role-based component
interface RoleGateProps {
  role: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGate({ role, children, fallback }: RoleGateProps) {
  const { hasRole } = useAuth();

  if (hasRole(role)) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
}
