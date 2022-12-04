import Doc from "./doc";

export default class Character extends Doc {
  name: string;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  wikiUrl: string;

  constructor({
    _id,
    name,
    height,
    race,
    gender,
    birth,
    spouse,
    death,
    realm,
    hair,
    wikiUrl,
  }: {
    _id: string;
    name: string;
    height: string;
    race: string;
    gender: string;
    birth: string;
    spouse: string;
    death: string;
    realm: string;
    hair: string;
    wikiUrl: string;
  }) {
    super({ _id });
    this.name = name;
    this.height = height;
    this.race = race;
    this.gender = gender;
    this.birth = birth;
    this.spouse = spouse;
    this.death = death;
    this.realm = realm;
    this.hair = hair;
    this.wikiUrl = wikiUrl;
    this.type = "character";
  }
}
