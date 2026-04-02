import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { FadeIn } from './ui/transitions';
import { useResponsiveLayout } from '@/hooks/useResponsive';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isMobile, contentMargin, gridCols, statsGridCols } = useResponsiveLayout();

    return (
        <div className="flex min-h-screen bg-surface">
            {/* Sidebar - Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <div className={`flex-1 ${isMobile ? 'ml-0' : 'ml-72'} flex flex-col min-h-screen relative transition-all duration-300`}>
                <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                <main className={`flex-1 ${isMobile ? 'px-4 py-6' : 'px-12 py-10'} editorial-tension-left bg-white/40`}>
                    <FadeIn duration={0.6} delay={0.2}>
                        {children}
                    </FadeIn>
                </main>
                <Footer />
            </div>
        </div>
    );
}
