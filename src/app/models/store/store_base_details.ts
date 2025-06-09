// StoreBaseDetails.ts
import { RatingModel } from '../rating/rating';

export interface LatLng {
  lat: number;
  lng: number;
}

export class StoreBaseDetails {
  name: string;
  address: string;
  phoneNumber: string;
  id: string;
  servingArea: string;
  storeLocation: LatLng;
  deliveryCost: number;
  packageCost: number;
  freePackageDeliveryCost: number;
  liveGeoFence: boolean;
  deliveryGeoFence: boolean;
  razorpay: boolean;
  cashOnDelivery: boolean;
  pickAtStore: boolean;
  liveMockLocation: boolean;
  img: string[];
  qrCode: boolean;
  qrimage?: string[];
  minCartValue: number;
  rating: RatingModel;
  deliverySetupId: string;

  constructor(params: {
    name: string;
    address: string;
    phoneNumber: string;
    id: string;
    servingArea: string;
    storeLocation: LatLng;
    deliveryCost: number;
    packageCost: number;
    freePackageDeliveryCost: number;
    liveGeoFence: boolean;
    deliveryGeoFence: boolean;
    razorpay: boolean;
    cashOnDelivery: boolean;
    pickAtStore: boolean;
    liveMockLocation: boolean;
    img: string[];
    qrCode: boolean;
    qrimage?: string[];
    minCartValue: number;
    rating: RatingModel;
    deliverySetupId: string;
  }) {
    this.name = params.name;
    this.address = params.address;
    this.phoneNumber = params.phoneNumber;
    this.id = params.id;
    this.servingArea = params.servingArea;
    this.storeLocation = params.storeLocation;
    this.deliveryCost = params.deliveryCost;
    this.packageCost = params.packageCost;
    this.freePackageDeliveryCost = params.freePackageDeliveryCost;
    this.liveGeoFence = params.liveGeoFence;
    this.deliveryGeoFence = params.deliveryGeoFence;
    this.razorpay = params.razorpay;
    this.cashOnDelivery = params.cashOnDelivery;
    this.pickAtStore = params.pickAtStore;
    this.liveMockLocation = params.liveMockLocation;
    this.img = params.img;
    this.qrCode = params.qrCode;
    this.qrimage = params.qrimage;
    this.minCartValue = params.minCartValue;
    this.rating = params.rating;
    this.deliverySetupId = params.deliverySetupId;
  }

  toMap(): Record<string, any> {
    return {
      name: this.name,
      address: this.address,
      phone_number: this.phoneNumber,
      id: this.id,
      serving_area: this.servingArea,
      store_location: {
        lat: this.storeLocation.lat,
        lng: this.storeLocation.lng,
      },
      delivery_cost: this.deliveryCost,
      package_cost: this.packageCost,
      free_package_delivery_cost: this.freePackageDeliveryCost,
      live_geo_fence: this.liveGeoFence,
      delivery_geo_fence: this.deliveryGeoFence,
      razorpay: this.razorpay,
      cash_on_delivery: this.cashOnDelivery,
      pick_at_store: this.pickAtStore,
      live_mock_location: this.liveMockLocation,
      img: this.img,
      qr_code: this.qrCode,
      qr_image: this.qrimage,
      min_cart_value: this.minCartValue,
      rating: this.rating.toMap(),
      delivery_setup_id: this.deliverySetupId,
    };
  }

  static fromMap(map: any): StoreBaseDetails {
    const storeLocation: LatLng = {
      lat: map.store_location.lat,
      lng: map.store_location.lng,
    };

    return new StoreBaseDetails({
      name: map.name,
      address: map.address,
      phoneNumber: map.phone_number,
      id: map.id,
      servingArea: map.serving_area,
      storeLocation,
      deliveryCost: map.delivery_cost,
      packageCost: map.package_cost,
      freePackageDeliveryCost: map.free_package_delivery_cost,
      liveGeoFence: map.live_geo_fence,
      deliveryGeoFence: map.delivery_geo_fence,
      razorpay: map.razorpay,
      cashOnDelivery: map.cash_on_delivery,
      pickAtStore: map.pick_at_store,
      liveMockLocation: map.live_mock_location,
      img: Array.isArray(map.img) ? [...map.img] : [],
      qrCode: map.qr_code,
      qrimage: Array.isArray(map.qr_image) ? [...map.qr_image] : [],
      minCartValue: map.min_cart_value,
      rating: map.rating
        ? RatingModel.fromMap(map.rating)
        : RatingModel.emptyRating(),
      deliverySetupId: map.delivery_setup_id ?? '',
    });
  }

  static emptyStore(): StoreBaseDetails {
    return new StoreBaseDetails({
      name: '',
      address: '',
      phoneNumber: '',
      id: '',
      servingArea: '',
      storeLocation: { lat: 0, lng: 0 },
      deliveryCost: 0,
      packageCost: 0,
      freePackageDeliveryCost: 0,
      liveGeoFence: false,
      deliveryGeoFence: false,
      razorpay: false,
      cashOnDelivery: false,
      pickAtStore: false,
      liveMockLocation: false,
      img: [],
      qrCode: false,
      qrimage: [],
      minCartValue: 0,
      rating: RatingModel.emptyRating(),
      deliverySetupId: '',
    });
  }

  static copy(store: StoreBaseDetails): StoreBaseDetails {
    return new StoreBaseDetails({
      name: store.name,
      address: store.address,
      phoneNumber: store.phoneNumber,
      id: store.id,
      servingArea: store.servingArea,
      storeLocation: { ...store.storeLocation },
      deliveryCost: store.deliveryCost,
      packageCost: store.packageCost,
      freePackageDeliveryCost: store.freePackageDeliveryCost,
      liveGeoFence: store.liveGeoFence,
      deliveryGeoFence: store.deliveryGeoFence,
      razorpay: store.razorpay,
      cashOnDelivery: store.cashOnDelivery,
      pickAtStore: store.pickAtStore,
      liveMockLocation: store.liveMockLocation,
      img: [...store.img],
      qrCode: store.qrCode,
      qrimage: store.qrimage ? [...store.qrimage] : [],
      minCartValue: store.minCartValue,
      rating: store.rating,
      deliverySetupId: store.deliverySetupId,
    });
  }
}
