export class Job {
  id: string;
  storeId: string;
  designation: string;
  details: string;
  salary: number;
  postedDate: string;
  active: boolean;
  creationTime: string;
  // documentRefPath?: string; // Uncomment if needed
  // type?: string; // Uncomment if needed

  constructor(params: {
    id: string;
    storeId: string;
    designation: string;
    details: string;
    salary: number;
    postedDate: string;
    active: boolean;
    creationTime: string;
    // documentRefPath?: string;
    // type?: string;
  }) {
    this.id = params.id;
    this.storeId = params.storeId;
    this.designation = params.designation;
    this.details = params.details;
    this.salary = params.salary;
    this.postedDate = params.postedDate;
    this.active = params.active;
    this.creationTime = params.creationTime;
    // this.documentRefPath = params.documentRefPath;
    // this.type = params.type;
  }

  static fromMap(map: any): Job {
    return new Job({
      id: map.id,
      storeId: map.store_id,
      designation: map.designation,
      details: map.details,
      salary: map.salary,
      postedDate: map.posted_date,
      active: map.active,
      creationTime: map.creation_time,
      // documentRefPath: map.documentRefPath,
      // type: map.type,
    });
  }

  toMap(): any {
    return {
      id: this.id,
      store_id: this.storeId,
      designation: this.designation,
      details: this.details,
      salary: this.salary,
      posted_date: this.postedDate,
      active: this.active,
      creation_time: this.creationTime,
      // documentRefPath: this.documentRefPath,
      // type: this.type,
    };
  }
}
