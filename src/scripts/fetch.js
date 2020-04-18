export default class GodService {
  constructor() {
    this.statickUrl = "https://www.anapioficeandfire.com/api";
  }

  async onFetch(url) {
    const res = await fetch(`${this.statickUrl}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  async getAllCharacters() {
    const res = await this.onFetch(`/characters?page=7&pageSize=10`);
    console.log(res);
    return res.map(this._transformCharacter);
  }

  async getCharacter(id) {
    const res = await this.onFetch(`/characters/${id}`);
    return this._transformCharacter(res);
  }

  async getAllHouses() {
    const res = await this.onFetch(`/houses/`);
    return res.map(this._transformCharacter);
  }

  async getHouse(id) {
    const res = await this.onFetch(`/characters/${id}`);
    return this._transformCharacter(res);
  }

  async getAllBooks() {
    const res = await this.onFetch(`/books/`);
    return res.map(this._transformCharacter);
  }

  async getBook(id) {
    const res = await this.onFetch(`/books/${id}`);
    return this._transformCharacter(res);
  }

  _transformCharacter(char) {
    return {
      id: parseInt(char.url.split("/")[char.url.split("/").length - 1]),
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture,
    };
  }

  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapoons,
    };
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
    };
  }
}
