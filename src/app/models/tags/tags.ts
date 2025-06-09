export class Tags {
  id: string;
  name: string;
  referenceCount?: number; // optional (nullable)
  creationTime: string;
  type: string;
  tags: string[];

  constructor(params: {
    id: string;
    name: string;
    referenceCount?: number;
    creationTime: string;
    type: string;
    tags: string[];
  }) {
    this.id = params.id;
    this.name = params.name;
    this.referenceCount = params.referenceCount;
    this.creationTime = params.creationTime;
    this.type = params.type;
    this.tags = params.tags;
  }

  static fromMap(map: Record<string, any>): Tags {
    return new Tags({
      id: map['id'] ?? '',
      referenceCount: map['referenceCount'] ?? 0,
      creationTime: map['creationTime'] ?? '',
      type: map['type'] ?? '',
      name: map['name'] ?? '',
      tags: Array.isArray(map['tags']) ? [...map['tags']] : [],
    });
  }

  static emptyTags(): Tags {
    return new Tags({
      id: '',
      referenceCount: 0,
      creationTime: '',
      type: '',
      name: '',
      tags: [],
    });
  }
}
