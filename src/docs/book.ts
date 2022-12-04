import Doc from "./doc";

export default class Book extends Doc {
  name: string;

  constructor({ _id, name }: { _id: string; name: string }) {
    super({ _id });
    this.type = "book";
    this.name = name;
  }
}
