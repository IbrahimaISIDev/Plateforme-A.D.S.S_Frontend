import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { Bell, X, CheckCircle2, AlertTriangle, Info, AlertCircle, XCircle, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
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

  if ('Notification' in window && Notification.permission === 'granted') {
    new window.Notification(notification.title, notificationOptions);
  }
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationContextType['settings']>({
    enableSound: true,
    enableDesktop: true,
    enableMobile: true,
    position: 'top-right'
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(-49)]); // Keep only last 50 notifications

    if (settings.enableSound) {
      playNotificationSound(notification.type);
    }

    if ((settings.enableDesktop && !window.navigator.userAgent.includes('Mobile')) || (settings.enableMobile && window.navigator.userAgent.includes('Mobile'))) {
      showBrowserNotification(newNotification);
    }
  }, [settings.enableSound, settings.enableDesktop, settings.enableMobile]);

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
      <NotificationCenterUI />
    </NotificationContext.Provider>
  );
}

function NotificationCenterUI() {
  const { notifications, clearAll, settings } = useNotifications();

  return (
    <div className={cn(
      "fixed z-50 p-4 space-y-2 max-w-sm w-80",
      settings.position === 'top-right' ? 'top-4 right-4' :
        settings.position === 'bottom-right' ? 'bottom-4 right-4' :
          settings.position === 'top-left' ? 'top-4 left-4' :
            'bottom-4 left-4'
    )}>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      {notifications.length === 0 && (
        <div className="text-center text-muted-foreground text-sm p-4 bg-white/80 backdrop-blur rounded-lg shadow-sm border">
          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Aucune notification</p>
        </div>
      )}
      {notifications.length > 0 && (
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs"
          >
            Tout effacer
          </Button>
        </div>
      )}
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const { markAsRead, clearNotification } = useNotifications();

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'system': return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className={cn(
      "p-4 rounded-lg border shadow-lg backdrop-blur-md transition-all",
      notification.read ? "bg-white/40 opacity-60" : "bg-white/90"
    )}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{notification.title}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
        </div>
        <div className="flex flex-col space-y-1">
          {!notification.read && (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => markAsRead(notification.id)}>
              <Eye className="w-3 h-3" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => clearNotification(notification.id)}>
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
}

export function useRealTimeNotifications() {
  const { addNotification } = useNotifications();

  const notify = useCallback((type: Notification['type'], title: string, message: string) => {
    addNotification({ type, title, message });
  }, [addNotification]);

  return {
    notify,
    notifySuccess: (title: string, message: string) => notify('success', title, message),
    notifyError: (title: string, message: string) => notify('error', title, message),
    notifyWarning: (title: string, message: string) => notify('warning', title, message),
    notifyInfo: (title: string, message: string) => notify('info', title, message)
  };
}

export function useWebSocketConnection(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { addNotification } = useNotifications();

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'notification') {
        addNotification({
          type: data.notification.type || 'info',
          title: data.title,
          message: data.message
        });
      }
    } catch (e) {
      console.error('Failed to parse WS message', e);
    }
  }, [addNotification]);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    ws.onopen = () => setIsConnected(true);
    ws.onmessage = handleMessage;
    ws.onclose = () => setIsConnected(false);
    setSocket(ws);
  }, [url, handleMessage]);

  useEffect(() => {
    connect();
    return () => socket?.close();
  }, [connect, socket]);

  return { socket, isConnected, reconnect: connect };
}
