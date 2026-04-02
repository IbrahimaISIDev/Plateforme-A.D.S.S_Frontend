import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Bell, X, CheckCircle2, AlertTriangle, Info, AlertCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'system';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  metadata?: Record<string, any>;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
  settings: {
    enableSound: boolean;
    enableDesktop: boolean;
    enableMobile: boolean;
    position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  };
  updateSettings: (settings: Partial<NotificationContextType['settings']>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationContextType['settings']>({
    enableSound: true,
    enableDesktop: true,
    enableMobile: true,
    position: 'top-right'
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(-49)]); // Keep only last 50 notifications
    
    // Play sound if enabled
    if (settings.enableSound) {
      playNotificationSound(notification.type);
    }
    
    // Show browser notification if enabled
    if ((settings.enableDesktop && !window.navigator.userAgent.includes('Mobile')) || (settings.enableMobile && window.navigator.userAgent.includes('Mobile'))) {
      showBrowserNotification(newNotification);
    }
  }, [notifications, settings.enableSound, settings.enableDesktop, settings.enableMobile]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<NotificationContextType['settings']>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotification,
      clearAll,
      settings,
      updateSettings
    }}>
      {children}
      <NotificationCenter />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

// Notification Center Component
function NotificationCenter() {
  const { notifications, markAsRead, clearNotification, clearAll, settings } = useNotifications();

  return (
    <div className={cn(
      "fixed z-50 p-4 space-y-2 max-w-sm w-80",
      settings.position === 'top-right' ? 'top-4 right-4' : 
      settings.position === 'bottom-right' ? 'bottom-4 right-4' :
      settings.position === 'top-left' ? 'top-4 left-4' :
      'bottom-4 left-4'
    )}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={() => markAsRead(notification.id)}
          onClear={() => clearNotification(notification.id)}
        />
      ))}
      {notifications.length === 0 && (
        <div className="text-center text-muted-foreground text-sm p-4">
          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Aucune notification</p>
        </div>
      )}
      {notifications.length > 0 && (
        <div className="flex justify-between items-center p-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs"
          >
            Tout marquer comme lu
          </Button>
        </div>
      )}
    </div>
  );
}

// Notification Item Component
function NotificationItem({ 
  notification, 
  onMarkAsRead, 
  onClear 
}: { 
  notification: Notification;
  onMarkAsRead: () => void;
  onClear: () => void;
}) {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'system': return <AlertCircle className="w-5 h-5 text-gray-500" />;
      default: return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'system': return 'bg-gray-50 border-gray-200 text-gray-800';
      default: return 'bg-white border-gray-200 text-gray-800';
    }
  };

  const timeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} jour${days > 1 ? 's' : ''} ago`;
    if (hours > 0 && days === 0) return `${hours} heure${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0 && hours === 0 && days === 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return 'À l\'instant';
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-md",
        getNotificationColor(notification.type),
        notification.read ? "opacity-60" : ""
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-on-surface leading-none">
            {notification.title}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {notification.message}
          </p>
          <p className="text-xs text-muted-foreground">
            {timeAgo(notification.timestamp)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {!notification.read && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkAsRead}
              className="h-8 w-8 p-0"
            >
              <Eye className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Web Audio API for notification sounds
function playNotificationSound(type: Notification['type']) {
  try {
    const audio = new Audio();
    switch (type) {
      case 'success':
        audio.src = 'data:audio/success.mp3';
        break;
      case 'error':
        audio.src = 'data:audio/error.mp3';
        break;
      case 'warning':
        audio.src = 'data:audio/warning.mp3';
        break;
      case 'info':
        audio.src = 'data:audio/info.mp3';
        break;
      default:
        audio.src = 'data:audio/notification.mp3';
    }
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio playback failed:', e));
  } catch (e) {
    console.log('Audio not supported:', e);
  }
}

// Browser Notification API
function showBrowserNotification(notification: Notification) {
  if (!('Notification' in window)) return;

  const iconUrl = '/notification-icon.png';
  
  const notificationOptions: NotificationOptions = {
    body: notification.message,
    icon: iconUrl,
    badge: notification.type === 'error' ? 'error' : undefined,
    tag: 'adss-portal',
    requireInteraction: notification.type !== 'success',
    silent: false
  };

  if ('Notification' in window && 'Notification' in window.Notification && Notification.permission === 'granted') {
    new Notification(notification.title, notificationOptions);
  }
}

// Hook for real-time notifications
export function useRealTimeNotifications() {
  const { addNotification } = useNotifications();
  
  const notify = useCallback((
    type: Notification['type'],
    title: string,
    message: string,
    action?: {
      label: string;
      onClick: () => void;
    }
  ) => {
    addNotification({ type, title, message, action });
  }, [addNotification]);

  const notifySuccess = useCallback((title: string, message: string) => {
    notify({ type: 'success', title, message });
  }, [notify]);

  const notifyError = useCallback((title: string, message: string) => {
    notify({ type: 'error', title, message });
  }, [notify]);

  const notifyWarning = useCallback((title: string, message: string) => {
    notify({ type: 'warning', title, message });
  }, [notify]);

  const notifyInfo = useCallback((title: string, message: string) => {
    notify({ type: 'info', title, message });
  }, [notify]);

  return {
    notify,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo
  };
}

// Hook for WebSocket connections
export function useWebSocketConnection(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const connect = () => {
      try {
        const ws = new WebSocket(url);
        
        ws.onopen = () => {
          setIsConnected(true);
          addNotification({
            type: 'success',
            title: 'Connexion établie',
            message: 'Connecté en temps réel au serveur'
          });
        };
        
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        };
        
        ws.onclose = () => {
          setIsConnected(false);
          addNotification({
            type: 'warning',
            title: 'Connexion perdue',
            message: 'La connexion temps réel a été perdue. Tentative de reconnexion...'
          });
        };
        
        ws.onerror = (error) => {
          addNotification({
            type: 'error',
            title: 'Erreur de connexion',
            message: 'Impossible de se connecter au serveur WebSocket'
          });
        };
        
        setSocket(ws);
      } catch (error) {
        console.error('WebSocket connection error:', error);
      }
    };

    connect();

    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [url]);

  const handleWebSocketMessage = (data: any) => {
    switch (data.type) {
      case 'notification':
        addNotification({
          type: data.notification.type || 'info',
          title: data.title,
          message: data.message
        });
        break;
      case 'demand_update':
        addNotification({
          type: 'info',
          title: 'Mise à jour de demande',
          message: `La demande #${data.id} a été mise à jour: ${data.status}`
        });
        break;
      case 'system':
        addNotification({
          type: 'system',
          title: data.title,
          message: data.message
        });
        break;
      default:
        console.log('Unknown WebSocket message:', data);
    }
  };

  return {
    socket,
    isConnected,
    reconnect: connect
  };
}
