export class AppCreditModel {
  id: string;
  appCredit: string;
  businessId: string;

  constructor({
    id,
    appCredit,
    businessId,
  }: {
    id: string;
    appCredit: string;
    businessId: string;
  }) {
    this.id = id;
    this.appCredit = appCredit;
    this.businessId = businessId;
  }

  static fromMap(map: any): AppCreditModel {
    return new AppCreditModel({
      id: map.id ?? '',
      appCredit: map.app_credit ?? '',
      businessId: map.business_id ?? '',
    });
  }

  static empty(): AppCreditModel {
    return new AppCreditModel({
      id: '',
      appCredit: '',
      businessId: '',
    });
  }
}

//Usage 
// const dataFromAPI = {
//   id: '123',
//   app_credit: '50',
//   business_id: 'biz-001',
// };

// const model = AppCreditModel.fromMap(dataFromAPI);
// console.log(model.appCredit); // Output: "50"

