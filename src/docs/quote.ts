import Doc from "./doc";

export default class Quote extends Doc {
  dialog: string;
  movieId: string;
  characterId: string;

  constructor({
    _id,
    dialog,
    movie,
    character,
  }: {
    _id: string;
    dialog: string;
    movie: string;
    character: string;
  }) {
    super({ _id });
    this.type = "quote";
    this.dialog = dialog;
    this.movieId = movie;
    this.characterId = character;
  }
}
