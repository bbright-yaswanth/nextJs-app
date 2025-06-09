import { format } from 'date-fns'

export class OrderStatus {
  process?: string;
  confirm?: string;
  package?: string;
  transit?: string;
  deliver?: string;
  cancel?: string;

  constructor(params: {
    process?: string;
    confirm?: string;
    package?: string;
    transit?: string;
    deliver?: string;
    cancel?: string;
  }) {
    this.process = params.process;
    this.confirm = params.confirm;
    this.package = params.package;
    this.transit = params.transit;
    this.deliver = params.deliver;
    this.cancel = params.cancel;
  }

  static fromMap(map: any): OrderStatus {
    return new OrderStatus({
      process: map['process'],
      confirm: map['confirm'],
      package: map['package'],
      transit: map['transit'],
      deliver: map['deliver'],
      cancel: map['cancel'],
    });
  }

  toJsonObj(): any {
    return {
      process: this.process,
      confirm: this.confirm,
      package: this.package,
      transit: this.transit,
      deliver: this.deliver,
      cancel: this.cancel,
    };
  }

  getStatus(): string {
    if (this.cancel && this.cancel !== '') return 'cancel';
    if (this.deliver && this.deliver !== '') return 'deliver';
    if (this.transit && this.transit !== '') return 'transit';
    if (this.package && this.package !== '') return 'package';
    if (this.confirm && this.confirm !== '') return 'confirm';
    return 'process';
  }

  getStatusTime(): string {
    let statusTime: string | undefined =
      this.cancel ||
      this.deliver ||
      this.transit ||
      this.package ||
      this.confirm ||
      this.process;

    if (statusTime) {
      return format(new Date(statusTime), 'MMM d'); // e.g., "Jun 4"
    }
    return '';
  }

  getReturnTime(): string | null {
    return this.cancel || null;
  }
}
