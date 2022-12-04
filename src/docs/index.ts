import Doc from "./doc";
import Book from "./book";
import Chapter from "./chapter";
import Character from "./character";
import Movie from "./movie";
import Quote from "./quote";

type TDocTypesStrings = "book" | "chapter" | "character" | "movie" | "quote";

const TypeToDocLookup: { [key in TDocTypesStrings]: typeof Doc } = {
  book: Book,
  chapter: Chapter,
  character: Character,
  movie: Movie,
  quote: Quote,
};

export {
  Doc,
  Book,
  Chapter,
  Character,
  Movie,
  Quote,
  TDocTypesStrings,
  TypeToDocLookup,
};
