export default class Doc {
  id: string;
  type: string;

  constructor({ _id }: { _id: string }) {
    this.id = _id;
    this.type = "doc";
  }
}
