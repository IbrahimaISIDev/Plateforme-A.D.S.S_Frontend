import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
      <NotificationContainer />
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

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

function NotificationItem({ 
  notification, 
  onClose 
}: { 
  notification: Notification;
  onClose: () => void;
}) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-amber-50 border-amber-200',
    info: 'bg-blue-50 border-blue-200'
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-amber-800',
    info: 'text-blue-800'
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border shadow-lg backdrop-blur-sm transition-all duration-300 transform animate-in slide-in-from-right",
        bgColors[notification.type]
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {icons[notification.type]}
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium", textColors[notification.type])}>
            {notification.title}
          </p>
          {notification.message && (
            <p className={cn("text-sm mt-1", textColors[notification.type], "opacity-80")}>
              {notification.message}
            </p>
          )}
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className={cn(
                "text-sm font-medium mt-2 underline",
                textColors[notification.type]
              )}
            >
              {notification.action.label}
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className={cn(
            "flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors",
            textColors[notification.type]
          )}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Hook pour les notifications rapides
export function useToast() {
  const { addNotification } = useNotifications();

  const success = (title: string, message?: string) => {
    addNotification({ type: 'success', title, message });
  };

  const error = (title: string, message?: string) => {
    addNotification({ type: 'error', title, message });
  };

  const warning = (title: string, message?: string) => {
    addNotification({ type: 'warning', title, message });
  };

  const info = (title: string, message?: string) => {
    addNotification({ type: 'info', title, message });
  };

  const custom = (notification: Omit<Notification, 'id'>) => {
    addNotification(notification);
  };

  return {
    success,
    error,
    warning,
    info,
    custom
  };
}
