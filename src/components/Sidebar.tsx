import { LayoutDashboard, FileText, Shield, CreditCard, Settings, LogOut, User, Users, BarChart3, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useResponsiveLayout } from '@/hooks/useResponsive';

const userNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FileText, label: 'Mes Demandes', href: '/demandes' },
    { icon: Shield, label: 'Mes Licences', href: '/licences' },
    { icon: CreditCard, label: 'Paiements', href: '/paiements' },
    { icon: Settings, label: 'Paramètres', href: '/settings' },
];

const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Clubs', href: '/admin/clubs' },
    { icon: Shield, label: 'Licences', href: '/admin/licences' },
    { icon: CreditCard, label: 'Paiements', href: '/admin/paiements' },
    { icon: User, label: 'Utilisateurs', href: '/admin/utilisateurs' },
    { icon: BarChart3, label: 'Rapports', href: '/admin/reports' },
    { icon: Settings, label: 'Paramètres', href: '/settings' },
];

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const [location] = useLocation();
    const { user } = useAuth();
    const { isMobile } = useResponsiveLayout();

    const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;

    return (
        <aside className={cn(
            "w-72 bg-white flex flex-col h-screen fixed left-0 top-0 z-[60] border-r border-on-surface/5 transition-transform duration-300",
            isMobile && !isOpen && "-translate-x-full",
            isMobile && isOpen && "translate-x-0"
        )}>
            {/* Mobile Close Button */}
            {isMobile && (
                <div className="flex items-center justify-between p-6 border-b border-on-surface/5">
                    <div className="space-y-1">
                        <h2 className="font-black text-xl tracking-tighter text-on-surface">A.D.S.S. PORTAL</h2>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Shaolin Sport Development</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {!isMobile && (
                <div className="p-10">
                    <div className="space-y-1">
                        <h2 className="font-black text-xl tracking-tighter text-on-surface">A.D.S.S. PORTAL</h2>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Shaolin Sport Development</p>
                    </div>
                </div>
            )}

            <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = location === item.href;
                    return (
                        <Link key={item.href} href={item.href}
                            className={cn(
                                "flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group text-sm font-bold",
                                isActive
                                    ? "bg-primary-gradient text-white shadow-ambient translate-x-1"
                                    : "text-muted-foreground hover:bg-surface-container-low hover:text-on-surface"
                            )}
                            onClick={() => isMobile && onClose?.()}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                                isActive ? "text-white" : "text-gray-400 group-hover:text-on-surface"
                            )} strokeWidth={isActive ? 2 : 1.5} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-8 space-y-6">
                <div className="pt-6 border-t border-on-surface/5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold px-4 mb-4 flex items-center">
                        <User className="w-3 h-3 mr-2" />
                        Mon Profil
                    </p>
                    <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between group cursor-pointer hover:bg-surface-container transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center text-white font-bold shadow-sm">
                                {user?.role === 'admin' ? 'AD' : 'JD'}
                            </div>
                            <div className="truncate">
                                <p className="text-xs font-bold text-on-surface truncate">{user?.name || 'Jean Dupont'}</p>
                                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">
                                    {user?.role === 'admin' ? 'Super Admin' : 'Ceinture Noire'}
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors shrink-0">
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
