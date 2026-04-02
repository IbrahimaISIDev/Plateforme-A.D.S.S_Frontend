import { useAuth as useAuthContext } from '@/contexts/AuthContext';

export function useAuth() {
    const { user, isLoading, login, logout } = useAuthContext();

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
    };
}
