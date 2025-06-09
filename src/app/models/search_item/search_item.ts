export class SearchItem {
  isKit: boolean;
  name: string;
  img: string[];

  constructor(params: { isKit: boolean; name: string; img: string[] }) {
    this.isKit = params.isKit;
    this.name = params.name;
    this.img = params.img;
  }

  static fromMap(map: any): SearchItem {
    return new SearchItem({
      isKit: map?.isKit ?? false,
      name: map?.name ?? '',
      img: Array.isArray(map?.img) ? map.img : [],
    });
  }
}
