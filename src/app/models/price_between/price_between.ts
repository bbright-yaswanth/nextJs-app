export class PriceBetween {
  price: number;
  before: number;

  constructor(params: { price: number; before: number }) {
    this.price = params.price;
    this.before = params.before;
  }
}
