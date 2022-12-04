import axios from "axios";

import Client from "../client";
import booksIndexResponse from "./books-index.json";
import booksGetResponse from "./books-get.json";

import chaptersIndex from "./chapters-index.json";
import chaptersGet from "./chapters-get.json";

import charactersIndex from "./characters-index.json";
import charactersGet from "./characters-get.json";

import moviesIndex from "./movies-index.json";
import moviesGet from "./movies-get.json";

import quotesIndex from "./quotes-index.json";
import quotesGet from "./quotes-get.json";

jest.mock("axios");
const addListenerMock = axios.get as jest.MockedFunction<typeof axios.get>;
describe("Client", () => {
  test("books", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: booksIndexResponse })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.books();
    expect(response.docs.length).toBe(3);
    expect(response.docs[0].type).toBe("book");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cf5805fb53e011a64671582",
      "5cf58077b53e011a64671583",
      "5cf58080b53e011a64671584",
    ]);
  });

  test("book", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: booksGetResponse })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.book({ id: "5cf5805fb53e011a64671582" });
    expect(response.docs.length).toBe(1);
    expect(response.docs[0].type).toBe("book");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cf5805fb53e011a64671582",
    ]);
  });

  test("bookChapaters", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: chaptersIndex })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.bookChapaters({
      id: "5cf5805fb53e011a64671582",
    });
    expect(response.docs.length).toBe(22);
    expect(response.docs[0].type).toBe("chapter");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "6091b6d6d58360f988133b8b",
      "6091b6d6d58360f988133b8c",
      "6091b6d6d58360f988133b8d",
      "6091b6d6d58360f988133b8e",
      "6091b6d6d58360f988133b8f",
      "6091b6d6d58360f988133b90",
      "6091b6d6d58360f988133b91",
      "6091b6d6d58360f988133b92",
      "6091b6d6d58360f988133b93",
      "6091b6d6d58360f988133b94",
      "6091b6d6d58360f988133b95",
      "6091b6d6d58360f988133b96",
      "6091b6d6d58360f988133b97",
      "6091b6d6d58360f988133b98",
      "6091b6d6d58360f988133b99",
      "6091b6d6d58360f988133b9a",
      "6091b6d6d58360f988133b9b",
      "6091b6d6d58360f988133b9c",
      "6091b6d6d58360f988133b9d",
      "6091b6d6d58360f988133b9e",
      "6091b6d6d58360f988133b9f",
      "6091b6d6d58360f988133ba0",
    ]);
  });

  test("chapters", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: chaptersIndex })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.chapters();
    expect(response.docs.length).toBe(22);
    expect(response.docs[0].type).toBe("chapter");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "6091b6d6d58360f988133b8b",
      "6091b6d6d58360f988133b8c",
      "6091b6d6d58360f988133b8d",
      "6091b6d6d58360f988133b8e",
      "6091b6d6d58360f988133b8f",
      "6091b6d6d58360f988133b90",
      "6091b6d6d58360f988133b91",
      "6091b6d6d58360f988133b92",
      "6091b6d6d58360f988133b93",
      "6091b6d6d58360f988133b94",
      "6091b6d6d58360f988133b95",
      "6091b6d6d58360f988133b96",
      "6091b6d6d58360f988133b97",
      "6091b6d6d58360f988133b98",
      "6091b6d6d58360f988133b99",
      "6091b6d6d58360f988133b9a",
      "6091b6d6d58360f988133b9b",
      "6091b6d6d58360f988133b9c",
      "6091b6d6d58360f988133b9d",
      "6091b6d6d58360f988133b9e",
      "6091b6d6d58360f988133b9f",
      "6091b6d6d58360f988133ba0",
    ]);
  });

  test("chapter", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: chaptersGet })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.chapter({ id: "6091b6d6d58360f988133b8b" });
    expect(response.docs.length).toBe(1);
    expect(response.docs[0].type).toBe("chapter");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "6091b6d6d58360f988133b8b",
    ]);
  });

  test("characters", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: charactersIndex })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.characters();
    expect(response.docs.length).toBe(10);
    expect(response.docs[0].type).toBe("character");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cd99d4bde30eff6ebccfbbe",
      "5cd99d4bde30eff6ebccfbbf",
      "5cd99d4bde30eff6ebccfbc0",
      "5cd99d4bde30eff6ebccfbc1",
      "5cd99d4bde30eff6ebccfbc2",
      "5cd99d4bde30eff6ebccfbc3",
      "5cd99d4bde30eff6ebccfbc4",
      "5cd99d4bde30eff6ebccfbc5",
      "5cd99d4bde30eff6ebccfbc6",
      "5cd99d4bde30eff6ebccfbc7",
    ]);
  });

  test("character", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: charactersGet })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.character({ id: "5cd99d4bde30eff6ebccfbbe" });
    expect(response.docs.length).toBe(1);
    expect(response.docs[0].type).toBe("character");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cd99d4bde30eff6ebccfbbe",
    ]);
  });

  test("characterQuotes", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: quotesIndex })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.characterQuotes({
      id: "5cd99d4bde30eff6ebccfbbe",
    });
    expect(response.docs.length).toBe(10);
    expect(response.docs[0].type).toBe("quote");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cd96e05de30eff6ebcce7e9",
      "5cd96e05de30eff6ebcce7ea",
      "5cd96e05de30eff6ebcce7eb",
      "5cd96e05de30eff6ebcce7ec",
      "5cd96e05de30eff6ebcce7ed",
      "5cd96e05de30eff6ebcce7ee",
      "5cd96e05de30eff6ebcce7ef",
      "5cd96e05de30eff6ebcce7f0",
      "5cd96e05de30eff6ebcce7f1",
      "5cd96e05de30eff6ebcce7f2",
    ]);
  });

  test("movies", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: moviesIndex })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.movies();
    expect(response.docs.length).toBe(8);
    expect(response.docs[0].type).toBe("movie");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cd95395de30eff6ebccde56",
      "5cd95395de30eff6ebccde57",
      "5cd95395de30eff6ebccde58",
      "5cd95395de30eff6ebccde59",
      "5cd95395de30eff6ebccde5a",
      "5cd95395de30eff6ebccde5b",
      "5cd95395de30eff6ebccde5c",
      "5cd95395de30eff6ebccde5d",
    ]);
  });

  test("movie", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: moviesGet })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.movie({ id: "5cd95395de30eff6ebccde56" });
    expect(response.docs.length).toBe(1);
    expect(response.docs[0].type).toBe("movie");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cd95395de30eff6ebccde56",
    ]);
  });

  test("movieQuotes", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: quotesIndex })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.movieQuotes({
      id: "5cd95395de30eff6ebccde56",
    });
    expect(response.docs.length).toBe(10);
    expect(response.docs[0].type).toBe("quote");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cd96e05de30eff6ebcce7e9",
      "5cd96e05de30eff6ebcce7ea",
      "5cd96e05de30eff6ebcce7eb",
      "5cd96e05de30eff6ebcce7ec",
      "5cd96e05de30eff6ebcce7ed",
      "5cd96e05de30eff6ebcce7ee",
      "5cd96e05de30eff6ebcce7ef",
      "5cd96e05de30eff6ebcce7f0",
      "5cd96e05de30eff6ebcce7f1",
      "5cd96e05de30eff6ebcce7f2",
    ]);
  });

  test("quotes", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: quotesIndex })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.quotes();
    expect(response.docs.length).toBe(10);
    expect(response.docs[0].type).toBe("quote");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cd96e05de30eff6ebcce7e9",
      "5cd96e05de30eff6ebcce7ea",
      "5cd96e05de30eff6ebcce7eb",
      "5cd96e05de30eff6ebcce7ec",
      "5cd96e05de30eff6ebcce7ed",
      "5cd96e05de30eff6ebcce7ee",
      "5cd96e05de30eff6ebcce7ef",
      "5cd96e05de30eff6ebcce7f0",
      "5cd96e05de30eff6ebcce7f1",
      "5cd96e05de30eff6ebcce7f2",
    ]);
  });

  test("quote", async () => {
    addListenerMock.mockImplementation(() =>
      Promise.resolve({ data: quotesGet })
    );
    const client = new Client({ accessToken: "FOOBAR" });
    const response = await client.quote({ id: "5cd96e05de30eff6ebcce7e9" });
    expect(response.docs.length).toBe(1);
    expect(response.docs[0].type).toBe("quote");
    expect(response.docs.map(({ id }) => id)).toEqual([
      "5cd96e05de30eff6ebcce7e9",
    ]);
  });
});
