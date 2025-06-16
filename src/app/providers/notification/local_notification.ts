// lib/notification-service.ts
import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationOptions {
  /**
   * The body text of the notification
   */
  body?: string;
  
  /**
   * The URL of an image to be displayed in the notification
   */
  image?: string;
  
  /**
   * The URL of an icon to be displayed in the notification
   */
  icon?: string;
  
  /**
   * A vibration pattern for devices with vibration hardware
   */
  vibrate?: number[];
  
  /**
   * A sound to play when the notification is shown
   */
  sound?: string;
  
  /**
   * A unique ID for the notification
   */
  tag?: string;
  
  /**
   * Direction of the notification text
   */
  dir?: 'auto' | 'ltr' | 'rtl';
  
  /**
   * Language code of the notification
   */
  lang?: string;
  
  /**
   * Whether the notification should remain active until dismissed
   */
  requireInteraction?: boolean;
  
  /**
   * Timestamp for the notification
   */
  timestamp?: number;
  
  /**
   * Actions to display in the notification
   */
  actions?: NotificationAction[];
  
  /**
   * Badge URL for mobile devices
   */
  badge?: string;
  
  /**
   * Notification data (arbitrary data associated with the notification)
   */
  data?: any;
  
  /**
   * Whether to renotify when replacing an existing notification
   */
  renotify?: boolean;
  
  /**
   * Whether to silence the notification
   */
  silent?: boolean;
}

interface NotificationAction {
  /**
   * The action identifier
   */
  action: string;
  
  /**
   * The action title
   */
  title: string;
  
  /**
   * The URL of an icon to display with the action
   */
  icon?: string;
}

export class NotificationService {
  private static initialized = false;

  static initialize() {
    if (this.initialized) return;
    
    // For web notifications API (if needed)
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this.initialized = true;
        }
      });
    }
    
    this.initialized = true;
  }

  static async display(message: {
    notification: {
      title?: string;
      body?: string;
      imageUrl?: string;
    };
  }) {
    try {
      // For web browser notifications
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        const options: NotificationOptions = {};
        
        if (message.notification.imageUrl) {
          try {
            // Verify the image exists and is accessible
            const img = new Image();
            img.src = message.notification.imageUrl;
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });
            options.image = message.notification.imageUrl;
          } catch (error) {
            console.error('Failed to load notification image:', error);
          }
        }

        new Notification(message.notification.title || 'Notification', {
          body: message.notification.body,
          ...options
        });
      } else {
        // Fallback to toast notifications
        const toastOptions: ToastOptions = {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        };

        if (message.notification.imageUrl) {
          toast.info(
            `<div>
              <h4>{message.notification.title}</h4>
              <p>{message.notification.body}</p>
              <img 
                src={message.notification.imageUrl} 
                alt="Notification" 
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            </div>,
            toastOptions
          );
        } else {
          toast.info(
            <div>
              <h4>{message.notification.title}</h4>
              <p>{message.notification.body}</p>
            </div>`,
            toastOptions
          );
        }
      }
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  }
}

//export default NotificationService;