import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  X,
  Bell,
  Settings,
  FileText,
  Shield,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { FadeIn } from '@/components/ui/transitions';
import { useNotifications } from '@/components/ui/notifications-realtime';
import { useTheme } from '@/components/ui/theme-provider';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface NavigationBarProps {
  items: NavItem[];
  brand?: {
    logo: string;
    title: string;
    tagline?: string;
    href: string;
  };
  actions?: Array<{
    label: string;
    icon: React.ComponentType<any>;
    onClick: () => void;
  }>;
}

const defaultNavItems: NavItem[] = [
  {
    label: 'Tableau de bord',
    href: '/dashboard',
    icon: Menu,
    badge: '3'
  },
  {
    label: 'Demande #1234',
    href: '/demands/1234',
    icon: FileText,
    badge: 'En attente'
  },
  {
    label: 'Licences',
    href: '/licenses',
    icon: Shield,
    badge: '12'
  },
  {
    label: 'Paiements',
    href: '/payments',
    icon: Bell,
    badge: '5'
  },
  {
    label: 'Documentation',
    href: '/docs',
    icon: FileText,
    disabled: true
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Mail
  }
];

export function NavigationBar({ items = defaultNavItems, brand }: NavigationBarProps) {
  const [location] = useLocation();
  const { unreadCount } = useNotifications();
  const { toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => location === href;
  const showBadge = (badge?: string) => badge && badge !== '0';

  return (
    <FadeIn duration={0.6}>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/5">
        <div className="flex items-center justify-between px-4 sm:px-12 h-16">
          {/* Brand */}
          <Link href={brand?.href || '/'} className="flex items-center space-x-3">
            {brand?.logo && (
              <div className="w-8 h-8 rounded-xl bg-primary-gradient flex items-center justify-center text-white font-bold text-xs">
                {brand?.logo}
              </div>
            )}
            <div>
              <h1 className="text-lg font-black text-on-surface tracking-tight">
                {brand?.title || 'A.D.S.S.S'}
              </h1>
              {brand?.tagline && (
                <p className="text-xs text-muted-foreground">{brand?.tagline}</p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "h-10 px-3 rounded-xl font-medium text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:text-primary-foreground'
                )}
                onClick={item.onClick}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {showBadge(item.badge) && (
                  <Badge variant="secondary" className="ml-1">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 w-10 rounded-xl font-medium text-sm font-medium transition-all duration-200"
            >
              <Menu className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl font-medium text-sm font-medium transition-all duration-200"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {unreadCount}
                </Badge>
              )}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-10 w-10 rounded-xl font-medium text-sm font-medium transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 w-full h-full bg-white/95 backdrop-blur-md">
              <div className="flex items-center justify-between p-4 border-b border-border/5">
                <h3 className="text-lg font-black text-on-surface">Menu</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="px-4 py-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      item.onClick?.();
                    }}
                    className={cn(
                      "flex items-center space-x-4 p-3 rounded-lg hover:bg-surface-container transition-colors duration-200",
                      isActive(item.href)
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:text-primary-foreground'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {showBadge(item.badge) && (
                      <Badge variant="secondary" className="ml-1">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </FadeIn>
  );
}
