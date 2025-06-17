export class RatingModel {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  

  constructor({
    one,
    two,
    three,
    four,
    five,
  }: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  }) {
    this.one = one;
    this.two = two;
    this.three = three;
    this.four = four;
    this.five = five;
  }

  static fromMap(map: any): RatingModel {
    return new RatingModel({
      one: map['_1'] ?? 0,
      two: map['_2'] ?? 0,
      three: map['_3'] ?? 0,
      four: map['_4'] ?? 0,
      five: map['_5'] ?? 0,
    });
  }

  toMap(): Record<string, number> {
    return {
      '1': this.one,
      '2': this.two,
      '3': this.three,
      '4': this.four,
      '5': this.five,
    };
  }

  static emptyRating(): RatingModel {
    return new RatingModel({ one: 0, two: 0, three: 0, four: 0, five: 0 });
  }

  calculateRating(): number {
    const total = this.one + this.two + this.three + this.four + this.five;
    if (total === 0) return 0;
    const weightedSum =
      this.one * 1 +
      this.two * 2 +
      this.three * 3 +
      this.four * 4 +
      this.five * 5;
    return weightedSum / total;
  }

  static applyRating(r: RatingModel, rating: number): RatingModel {
    switch (Math.floor(rating)) {
      case 1:
        r.one += 1;
        break;
      case 2:
        r.two += 1;
        break;
      case 3:
        r.three += 1;
        break;
      case 4:
        r.four += 1;
        break;
      case 5:
        r.five += 1;
        break;
    }
    return r;
  }
}
