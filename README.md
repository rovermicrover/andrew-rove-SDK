# One API SDK

## About

A simple SDK wrapper written in typescript for node and browser via commonjs complied to es2017.

## Instalation

Node 18 is used to build

If you have nvm installed

```
nvm use

```

Then install deps

```
npm i
```

Finally build

```
npm run build
```

You can then use this as a node module

## How to use
Below is an example call to get all characters that do not have realm information.

```
// Require the client
const { Client } = require("./lib");
// Init a new client
const c = new Client({ accessToken: "your-access-token-here" });

// Make a call via the client for the first 10 characters without realm information
c.characters({ limit: 10, offset: 0, notExists: ["realm"] }).then(console.log)
```

## What is supported?

All end points, and params, described [here](https://the-one-api.dev/documentation)

The public client interface consists of the following

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

The interface for index query params is IIndexCallArguments and looks like the following

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
```