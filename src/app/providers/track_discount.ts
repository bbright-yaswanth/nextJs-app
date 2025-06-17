import { setTimeout, clearTimeout } from 'timers';

export class TrackDiscount {
  public static discountsTracker: Map<string, number> = new Map();
  public static discountTimer: NodeJS.Timeout | null = null;
  public static isTimerActive: boolean = false;

  static startDiscountTimer(): void {
    // This is the customer timer we create for all the discounts
    // Every second, it reduces the discount time by 1 second
    // This prevents unexpected behavior when there's a change in system time
    if (!TrackDiscount.discountTimer || !TrackDiscount.isTimerActive) {
      TrackDiscount.discountTimer = setTimeout(() => {
        TrackDiscount.discountsTracker.forEach((seconds, id) => {
          if (seconds > 0) {
            TrackDiscount.discountsTracker.set(id, seconds - 1);
          } else {
            // Automatically remove expired discounts
            TrackDiscount.removeDiscountDetail(id);
          }
        });

        // Continue running timer if there are active discounts
        if (TrackDiscount.discountsTracker.size > 0) {
          TrackDiscount.startDiscountTimer();
        } else {
          if (TrackDiscount.discountTimer) {
            clearTimeout(TrackDiscount.discountTimer);
          }
          TrackDiscount.discountTimer = null;
          TrackDiscount.isTimerActive = false;
        }
      }, 1000); // 1 second interval
      TrackDiscount.isTimerActive = true;
    }
  }

  static getItemDiscountExpireSec(id: string): number {
    return TrackDiscount.discountsTracker.get(id) || 0;
  }

  static insertDiscountDetail(id: string, discountEndDate: Date | undefined): void {
    if (discountEndDate) {
      const currentTime = new Date();
      const difference = discountEndDate > currentTime
        ? Math.floor((discountEndDate.getTime() - currentTime.getTime()) / 1000)
        : 0; // Set to 0 if expired
      TrackDiscount.discountsTracker.set(id, difference);
      TrackDiscount.startDiscountTimer(); // Start timer if adding a new discount
    }
  }

  static removeDiscountDetail(id: string): void {
    TrackDiscount.discountsTracker.delete(id);
  }

  static isDiscountExpired(id: string): boolean {
    return TrackDiscount.getItemDiscountExpireSec(id) <= 0;
  }
}