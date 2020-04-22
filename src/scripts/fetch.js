export default class GodService {
  constructor() {
    this.statickUrl = "https://www.anapioficeandfire.com/api";
  }

  onFetch = async (url) => {
    const res = await fetch(`${this.statickUrl}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async () => {
    const rnd = Math.floor(Math.random() * 100);
    const res = await this.onFetch(`/characters?page=${rnd}&pageSize=6`);
    console.log(res);
    return res.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.onFetch(`/characters/${id}`);
    return this._transformCharacter(res);
  };

  getAllHouses = async () => {
    const res = await this.onFetch(`/houses/`);
    return res.map(this._transformHouse);
  };

  getHouse = async (id) => {
    const res = await this.onFetch(`/characters/${id}`);
    return this._transformHouse(res);
  };

  getAllBooks = async () => {
    const res = await this.onFetch(`/books/`);
    return res.map(this._transformBook);
  };

  getBook = async (id) => {
    const res = await this.onFetch(`/books/${id}`);
    return this._transformBook(res);
  };

  _transformCharacter(char) {
    return {
      id: parseInt(char.url.split("/")[char.url.split("/").length - 1]),
      name: char.name ? char.name : "нет данных",
      gender: char.gender ? char.gender : "нет данных",
      born: char.born ? char.born : "нет данных",
      died: char.died ? char.died : "нет данных",
      culture: char.culture ? char.culture : "нет данных",
    };
  }

  _transformHouse(house) {
    return {
      id: parseInt(house.url.split("/")[house.url.split("/").length - 1]),
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
      id: parseInt(book.url.split("/")[book.url.split("/").length - 1]),
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
    };
  }
}
