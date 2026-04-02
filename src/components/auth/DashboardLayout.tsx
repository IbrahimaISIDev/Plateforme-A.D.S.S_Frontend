import React from 'react';
import { ProtectedRoute } from '@/components/auth/AuthContext';
import { NavigationBar } from '@/components/navigation/Navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
}

export function DashboardLayout({ 
  children, 
  requiredRole, 
  requiredPermission 
}: DashboardLayoutProps) {
  return (
    <ProtectedRoute 
      requiredRole={requiredRole}
      requiredPermission={requiredPermission}
    >
      <div className="min-h-screen bg-surface">
        <NavigationBar />
        <main className="pt-16">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

// Role-specific layouts
export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout requiredRole="admin">
      {children}
    </DashboardLayout>
  );
}

export function InstructorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout requiredRole="instructor">
      {children}
    </DashboardLayout>
  );
}

export function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout requiredRole="student">
      {children}
    </DashboardLayout>
  );
}

export function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout requiredRole="parent">
      {children}
    </DashboardLayout>
  );
}
