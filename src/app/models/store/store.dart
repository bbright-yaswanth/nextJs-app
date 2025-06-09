type LatLng = {
  lat: number;
  lng: number;
};

export class Store {
  name: string;
  address: string;
  contactNumber: string;
  id: string;
  priceRanges: number[];
  offerRanges: number[];
  url?: string;
  active: boolean;
  announce: string;
  servingArea: LatLng[];
  storeLocation: LatLng;

  constructor(params: {
    name: string;
    id: string;
    address: string;
    contactNumber: string;
    priceRanges: number[];
    offerRanges: number[];
    active: boolean;
    announce: string;
    servingArea: LatLng[];
    storeLocation: LatLng;
    url?: string;
  }) {
    this.name = params.name;
    this.id = params.id;
    this.address = params.address;
    this.contactNumber = params.contactNumber;
    this.priceRanges = params.priceRanges;
    this.offerRanges = params.offerRanges;
    this.active = params.active;
    this.announce = params.announce;
    this.servingArea = params.servingArea;
    this.storeLocation = params.storeLocation;
    this.url = params.url;
  }

  static fromMap(map: Record<string, any>): Store {
    const servingArea: LatLng[] = Array.isArray(map.servingArea)
      ? map.servingArea.map((point: any) => ({ lat: point.lat, lng: point.lng }))
      : [];

    const storeLocation = map.storeLocation
      ? { lat: map.storeLocation.lat, lng: map.storeLocation.lng }
      : { lat: 0, lng: 0 };

    return new Store({
      id: map.id ?? '',
      name: map.name ?? '',
      address: map.address ?? '',
      contactNumber: map.contactNumber ?? '',
      url: map.url,
      priceRanges: Array.isArray(map.priceRanges) ? [...map.priceRanges] : [],
      offerRanges: Array.isArray(map.offerRanges) ? [...map.offerRanges] : [],
      active: map.active ?? false,
      announce: map.announce ?? '',
      servingArea,
      storeLocation,
    });
  }

  toMap(): Record<string, any> {
    return {
      name: this.name,
      address: this.address,
      contactNumber: this.contactNumber,
      url: this.url,
      id: this.id,
      priceRanges: this.priceRanges,
      offerRanges: this.offerRanges,
      active: this.active,
      announce: this.announce,
      servingArea: this.servingArea.map((point) => ({ lat: point.lat, lng: point.lng })),
      storeLocation: { lat: this.storeLocation.lat, lng: this.storeLocation.lng },
    };
  }

  static emptyStore(): Store {
    return new Store({
      name: '',
      id: '',
      address: '',
      contactNumber: '',
      priceRanges: [],
      offerRanges: [],
      active: false,
      announce: '',
      servingArea: [],
      storeLocation: { lat: 0, lng: 0 },
    });
  }
}
