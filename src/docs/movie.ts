import Doc from "./doc";

export default class Movie extends Doc {
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;

  constructor({
    _id,
    name,
    runtimeInMinutes,
    budgetInMillions,
    boxOfficeRevenueInMillions,
    academyAwardNominations,
    academyAwardWins,
    rottenTomatoesScore,
  }: {
    _id: string;
    name: string;
    runtimeInMinutes: number;
    budgetInMillions: number;
    boxOfficeRevenueInMillions: number;
    academyAwardNominations: number;
    academyAwardWins: number;
    rottenTomatoesScore: number;
  }) {
    super({ _id });
    this.type = "movie";
    this.name = name;
    this.runtimeInMinutes = runtimeInMinutes;
    this.budgetInMillions = budgetInMillions;
    this.boxOfficeRevenueInMillions = boxOfficeRevenueInMillions;
    this.academyAwardNominations = academyAwardNominations;
    this.academyAwardWins = academyAwardWins;
    this.rottenTomatoesScore = rottenTomatoesScore;
  }
}
