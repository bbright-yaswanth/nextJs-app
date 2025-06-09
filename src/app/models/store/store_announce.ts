export class StoreAnnounce {
  announce: string;

  constructor(params: { announce: string }) {
    this.announce = params.announce;
  }

  toMap(): Record<string, any> {
    return {
      announce: this.announce,
    };
  }

  static fromMap(map: any): StoreAnnounce {
    return new StoreAnnounce({
      announce: map?.announce ?? '',
    });
  }

  static emptyAnnounce(): StoreAnnounce {
    return new StoreAnnounce({ announce: '' });
  }
}
