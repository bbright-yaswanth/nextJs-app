
export class DoneDiscount {
  public static ids: string[] = [];

  static resetDoneDiscount(): void {
    this.ids = [];
  }

  static addDoneDiscount(id: string): void {
    this.ids.push(id);
  }
}


