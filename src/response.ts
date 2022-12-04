import Doc from "./docs/doc";

export default class Response<T extends Doc> {
  docs: T[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;

  constructor({
    docs,
    total,
    limit,
    offset,
    page,
    pages,
  }: {
    docs: T[];
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
  }) {
    this.docs = docs;
    this.total = total;
    this.limit = limit;
    this.offset = offset;
    this.page = page;
    this.pages = pages;
  }
}
