// user.controller.ts
export class UserController {
  private _userName: string | null = null;
  private _phoneNumber: string | null = null;
  private subscribers: (() => void)[] = [];

  get userName(): string | null {
    return this._userName;
  }

  get phoneNumber(): string | null {
    return this._phoneNumber;
  }

  get isLogin(): boolean {
    return this._userName !== null && this._phoneNumber !== null;
  }

  get loggedInUser(): string | null {
    return this._userName;
  }

  get loggedInPhoneNumber(): string | null {
    return this._phoneNumber;
  }

  constructor() {
    this.loadUserData();
  }

  async setUser(name: string, phone: string): Promise<void> {
    this._userName = name;
    this._phoneNumber = phone;

    if (typeof window !== 'undefined') {
      localStorage.setItem('userName', name);
      localStorage.setItem('phoneNumber', phone);
    }
    this.notifySubscribers();
  }

  async loadUserData(): Promise<void> {
    if (typeof window !== 'undefined') {
      this._userName = localStorage.getItem('userName');
      this._phoneNumber = localStorage.getItem('phoneNumber');
    }
    this.notifySubscribers();
  }

  async clearUserData(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userName');
      localStorage.removeItem('phoneNumber');
    }
    this._userName = null;
    this._phoneNumber = null;
    this.notifySubscribers();
  }

  // Subscribe to changes (similar to GetX's update)
  subscribe(callback: () => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback());
  }
}

// Singleton instance (similar to GetX's Get.put)
export const userController = new UserController();