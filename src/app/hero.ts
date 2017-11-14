export class Hero {
  public id: number;
  public name: string;
  public documentId?: string;

  constructor(id: number = 0, name: string = '') {
    this.id = id;
    this.name = name;
  }
}
