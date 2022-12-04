import axios from "axios";

import { IIndexCallArguments } from "./types";

import {
  Doc,
  Book,
  Chapter,
  Character,
  Movie,
  Quote,
  TDocTypesStrings,
  TypeToDocLookup,
} from "./docs";
import Response from "./response";
import { indexArgumentsToSearchParams } from "./params";

const API_URL = "https://the-one-api.dev/v2";

interface IResourceCall {
  type: TDocTypesStrings;
}
interface IGenericIndexCallArguments
  extends IIndexCallArguments,
    IResourceCall {}

interface IGetCallArguments {
  id: string;
}

interface INestedIndexCallArguments
  extends IIndexCallArguments,
    IGetCallArguments {}

interface IGenericNestedIndexCallArguments
  extends IResourceCall,
    IGetCallArguments,
    IIndexCallArguments {
  nestedType: TDocTypesStrings;
}

export default class Client {
  apiUrl: string;
  accessToken: string;

  constructor({
    apiUrl,
    accessToken,
  }: {
    apiUrl?: string;
    accessToken: string;
  }) {
    this.apiUrl = apiUrl || API_URL;
    this.accessToken = accessToken;
  }

  async books(options: IIndexCallArguments = {}): Promise<Response<Book>> {
    return this.baseIndex<Book>({ ...options, type: "book" });
  }

  async book(options: IGetCallArguments): Promise<Response<Book>> {
    return this.get<Book>({ ...options, type: "book" });
  }

  async bookChapaters(
    options: INestedIndexCallArguments
  ): Promise<Response<Chapter>> {
    return this.nestedIndex<Chapter>({
      ...options,
      type: "book",
      nestedType: "chapter",
    });
  }

  async chapters(
    options: IIndexCallArguments = {}
  ): Promise<Response<Chapter>> {
    return this.baseIndex<Chapter>({ ...options, type: "chapter" });
  }

  async chapter(options: IGetCallArguments): Promise<Response<Chapter>> {
    return this.get<Chapter>({ ...options, type: "chapter" });
  }

  async characters(
    options: IIndexCallArguments = {}
  ): Promise<Response<Character>> {
    return this.baseIndex<Character>({ ...options, type: "character" });
  }

  async character(options: IGetCallArguments): Promise<Response<Character>> {
    return this.get<Character>({ ...options, type: "character" });
  }

  async characterQuotes(
    options: INestedIndexCallArguments
  ): Promise<Response<Quote>> {
    return this.nestedIndex<Quote>({
      ...options,
      type: "character",
      nestedType: "quote",
    });
  }

  async movies(options: IIndexCallArguments = {}): Promise<Response<Movie>> {
    return this.baseIndex<Movie>({ ...options, type: "movie" });
  }

  async movie(options: IGetCallArguments): Promise<Response<Movie>> {
    return this.get<Movie>({ ...options, type: "movie" });
  }

  async movieQuotes(
    options: INestedIndexCallArguments
  ): Promise<Response<Quote>> {
    return this.nestedIndex<Quote>({
      ...options,
      type: "movie",
      nestedType: "quote",
    });
  }

  async quotes(options: IIndexCallArguments = {}): Promise<Response<Quote>> {
    return this.baseIndex<Quote>({ ...options, type: "quote" });
  }

  async quote(options: IGetCallArguments): Promise<Response<Quote>> {
    return this.get<Quote>({ ...options, type: "quote" });
  }

  private async baseIndex<T extends Doc>(
    options: IGenericIndexCallArguments
  ): Promise<Response<T>> {
    const { type, ...args } = options;
    const path = `/${type}`;
    return this.index<T>({ returnType: type, path, args });
  }

  private async nestedIndex<T extends Doc>(
    options: IGenericNestedIndexCallArguments
  ): Promise<Response<T>> {
    const { type, id, nestedType, ...args } = options;
    const path = `/${type}/${id}/${nestedType}`;
    return this.index<T>({ returnType: nestedType, path, args });
  }

  private async index<T extends Doc>({
    returnType,
    path,
    args,
  }: {
    returnType: TDocTypesStrings;
    path: string;
    args: IIndexCallArguments;
  }): Promise<Response<T>> {
    const params = indexArgumentsToSearchParams(args);
    return this.request<T>({ returnType, path, params });
  }

  private async get<T extends Doc>({
    type,
    id,
  }: {
    type: TDocTypesStrings;
    id: string;
  }): Promise<Response<T>> {
    const path = `/${type}/${id}`;
    return this.request<T>({ returnType: type, path, params: "" });
  }

  private async request<T extends Doc>({
    returnType,
    path,
    params,
  }: {
    returnType: TDocTypesStrings;
    path: string;
    params: string;
  }): Promise<Response<T>> {
    const ReturnClass = TypeToDocLookup[returnType];
    const url = new URL(this.apiUrl);
    url.pathname += path;
    const headers = { Authorization: `Bearer ${this.accessToken}` };
    const httpResponse = await axios.get(`${url.toString()}?${params}`, {
      headers,
    });
    const {
      data: { docs, total, limit, offset, page, pages },
    } = httpResponse;
    const docObjects = docs.map((d: any) => new ReturnClass(d));
    return new Response<T>({
      docs: docObjects,
      total,
      limit,
      offset,
      page,
      pages,
    });
  }
}
