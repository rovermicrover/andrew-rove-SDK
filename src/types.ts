export interface IIndexCallArguments {
  limit?: number;
  page?: number;
  offset?: number;
  sort?: { [key: string]: "desc" | "asc" };
  match?: { [key: string]: string };
  notMatch?: { [key: string]: string };
  include?: { [key: string]: string[] };
  exclude?: { [key: string]: string[] };
  exists?: string[];
  notExists?: string[];
  lessThan?: { [key: string]: number };
  greaterThan?: { [key: string]: number };
  lessThanOrEqual?: { [key: string]: number };
  greaterThanOrEqual?: { [key: string]: number };
}
