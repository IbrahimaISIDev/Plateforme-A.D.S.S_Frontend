import { Bell, ChevronDown, Calendar, MapPin, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useResponsiveLayout } from '@/hooks/useResponsive';

export function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
    const { user } = useAuth();
    const { isMobile } = useResponsiveLayout();
    const isAdmin = user?.role === 'admin';

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-12 sticky top-0 z-50 border-b border-on-surface/5">
            {/* Mobile Menu Toggle */}
            {isMobile && (
                <Button variant="ghost" size="icon" onClick={onMenuToggle} className="h-10 w-10">
                    <Menu className="w-5 h-5" />
                </Button>
            )}
            
            <div className="flex-1 flex items-center justify-between">
                {isAdmin ? (
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" className="h-10 px-4 rounded-xl font-bold bg-surface-container-low border-none text-xs flex items-center space-x-2">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            <span>Jan 2024 - Déc 2024</span>
                            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                        </Button>
                        <Button variant="outline" className="h-10 px-4 rounded-xl font-bold bg-surface-container-low border-none text-xs flex items-center space-x-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-500" />
                            <span>Toutes les régions</span>
                            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 text-sm font-bold tracking-tight">
                        <span className="text-muted-foreground">A.D.S.S. Portal</span>
                        <span className="text-muted-foreground/30 font-light">/</span>
                        <span className="text-on-surface">Dashboard</span>
                    </div>
                )}

                <div className="flex items-center space-x-6">
                    <Button variant="ghost" size="icon" className="relative group rounded-full bg-surface-container-low hover:bg-surface-container transition-colors">
                        <Bell className="w-5 h-5 text-on-surface group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                    </Button>

                    {isAdmin ? (
                        <div className="h-10 border-l border-on-surface/10 pl-6 flex items-center space-x-3">
                            <div className="text-right">
                                <p className="text-sm font-black text-on-surface leading-none">Admin Principal</p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Super Administrateur</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary-gradient p-0.5 shadow-sm">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs">AP</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-10 border-l border-on-surface/10 pl-6 flex items-center">
                            <Button variant="ghost" className="h-11 px-4 rounded-xl flex items-center space-x-3 bg-surface-container-low hover:bg-surface-container transition-colors">
                                <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                </div>
                                <span className="text-xs font-bold text-on-surface">Session Active</span>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
