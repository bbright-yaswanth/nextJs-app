export class BannerModel {
  active: boolean;
  id: string;
  img: string[];
  name: string;
  sort: number;
  creationTime: string;
  storeId: string;

  constructor({
    active,
    id,
    img,
    name,
    sort,
    creationTime,
    storeId,
  }: {
    active: boolean;
    id: string;
    img: string[];
    name: string;
    sort: number;
    creationTime: string;
    storeId: string;
  }) {
    this.active = active;
    this.id = id;
    this.img = img;
    this.name = name;
    this.sort = sort;
    this.creationTime = creationTime;
    this.storeId = storeId;
  }

  static fromMap(map: any): BannerModel {
    return new BannerModel({
      active: map.active ?? false,
      id: map.id ?? '',
      img: Array.isArray(map.img) ? map.img : [],
      name: map.name ?? '',
      sort: map.sort ?? 0,
      creationTime: map.creation_time ?? '',
      storeId: map.store_id ?? '',
    });
  }

  toMap(): Record<string, any> {
    return {
      active: this.active,
      id: this.id,
      img: this.img,
      name: this.name,
      sort: this.sort,
      creation_time: this.creationTime,
      store_id: this.storeId,
    };
  }
}
