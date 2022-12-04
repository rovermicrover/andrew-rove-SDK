# Design

I went with typescript mostly as a way to self document the code as I was writing it.

I went with creating a client that requires an access token, and can take an optional apiUrl config in case the apiUrl changes before I can update the package.

I then created instance methods on the client that mirrored the described end points. Single resources are singular, multiple resources are plural. Then the nested routes are named with the root type being singilar, and sub type being plural.

```
export default class Client {
  apiUrl: string;
  accessToken: string;

  constructor({
    apiUrl,
    accessToken,
  }: {
    apiUrl?: string;
    accessToken: string;
  }) {}

  async books(options: IIndexCallArguments): Promise<Response<Book>> {}

  async book(options: IGetCallArguments): Promise<Response<Book>> {}

  async bookChapaters(options: INestedIndexCallArguments): Promise<Response<Chapter>> {}

  async chapters(options: IIndexCallArguments): Promise<Response<Chapter>> {}

  async chapter(options: IGetCallArguments): Promise<Response<Chapter>> {}

  async characters(options: IIndexCallArguments): Promise<Response<Character>> {}

  async character(options: IGetCallArguments): Promise<Response<Character>> {}

  async characterQuotes(options: INestedIndexCallArguments): Promise<Response<Quote>> {}

  async movies(options: IIndexCallArguments): Promise<Response<Movie>> {}

  async movie(options: IGetCallArguments): Promise<Response<Movie>> {}

  async movieQuotes(options: INestedIndexCallArguments): Promise<Response<Quote>> {}

  async quotes(options: IIndexCallArguments): Promise<Response<Quote>> {}

  async quote(options: IGetCallArguments): Promise<Response<Quote>> {}
}
```

```
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

interface IGetCallArguments {
  id: string;
}

interface INestedIndexCallArguments
  extends IIndexCallArguments,
    IGetCallArguments {}
```

All these methods are all very simple shims that delegate to the four Client instance methods: baseIndex, nestedIndex, index, and get.

The documents models are just very simple left hand right hand models only with a constructor. They do each declare a type attribute because this is javascript and its still techincally a prototype language and support for full true reflection may not be avaible to the end user of the SDK.

# Changes from API

I removed _id in favor of just having id on each document

In the quote documents I renamed character and movie attributes to characterId and movieId to more accurately reflect their true natures as ids.

# Issues left unresolved

The get end points when given a non existant ID return a 500. I don't want to catch that and replace it with a 404 because what if that is an actual 500 and we just hid it? So just let the error handling state as is for now.

The way search params are formated with no values doesn't play well with URLSearchParams & Axios so I had to write custom code. I am not really sure how I feel about this, but its part of their API.