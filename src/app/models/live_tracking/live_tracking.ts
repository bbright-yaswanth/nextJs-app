export interface LatLng {
  lat: number;
  lng: number;
}

export class LiveTrackingModel {
  orderId: string;
  isDelivered: boolean;
  deliveryPersonName: string;
  deliveryPersonPhone: string;
  deliveryPersonLocation: LatLng;
  customerLocation: LatLng;
  storeLocation: LatLng;
  storeName: string;
  deviceEpoch: number;

  constructor(params: {
    orderId: string;
    isDelivered: boolean;
    deliveryPersonName: string;
    deliveryPersonPhone: string;
    deliveryPersonLocation: LatLng;
    customerLocation: LatLng;
    storeLocation: LatLng;
    storeName: string;
    deviceEpoch: number;
  }) {
    this.orderId = params.orderId;
    this.isDelivered = params.isDelivered;
    this.deliveryPersonName = params.deliveryPersonName;
    this.deliveryPersonPhone = params.deliveryPersonPhone;
    this.deliveryPersonLocation = params.deliveryPersonLocation;
    this.customerLocation = params.customerLocation;
    this.storeLocation = params.storeLocation;
    this.storeName = params.storeName;
    this.deviceEpoch = params.deviceEpoch;
  }

  static fromJson(json: any): LiveTrackingModel {
    return new LiveTrackingModel({
      orderId: json.order_id,
      isDelivered: json.is_delivered,
      deliveryPersonName: json.delivery_person_name,
      deliveryPersonPhone: json.delivery_person_phone,
      deliveryPersonLocation: {
        lat: json.delivery_person_location.lat,
        lng: json.delivery_person_location.lng,
      },
      customerLocation: {
        lat: json.customer_location.lat,
        lng: json.customer_location.lng,
      },
      storeLocation: {
        lat: json.store_location.lat,
        lng: json.store_location.lng,
      },
      storeName: json.store_name,
      deviceEpoch: json.device_epoch,
    });
  }
}
