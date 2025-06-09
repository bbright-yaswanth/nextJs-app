export class OnBoardingModel {
  id: string;
  title: string;
  businessId: string;
  description: string;
  img: string[];
  creationTime: string;

  constructor(params: {
    id: string;
    title: string;
    businessId: string;
    description: string;
    img: string[];
    creationTime: string;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.businessId = params.businessId;
    this.description = params.description;
    this.img = params.img;
    this.creationTime = params.creationTime;
  }

  static fromMap(map: Record<string, any>): OnBoardingModel {
    return new OnBoardingModel({
      id: map.id,
      businessId: map.business_id,
      title: map.title,
      description: map.description,
      img: Array.isArray(map.img) ? map.img.map(String) : [],
      creationTime: map.creation_time,
    });
  }
}
