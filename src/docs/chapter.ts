import Doc from "./doc";

export default class Chapter extends Doc {
  chapterName: string;

  constructor({ _id, chapterName }: { _id: string; chapterName: string }) {
    super({ _id });
    this.type = "chapter";
    this.chapterName = chapterName;
  }
}
