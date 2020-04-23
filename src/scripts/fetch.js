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
    const res = await this.onFetch(`/houses/${id}`);
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
    console.log(house);
    return {
      id: parseInt(house.url.split("/")[house.url.split("/").length - 1]),
      name: house.name ? house.name : 'нет данных',
      region: house.region ? house.region : 'нет данных',
      words: house.words ? house.words : 'нет данных',
      titles: house.titles[0]!=="" ? house.titles : 'нет данных',
      overlord: house.overlord ? house.overlord : 'нет данных',
      ancestralWeapons: house.ancestralWeapoons ? house.ancestralWeapoons : 'нет данных'
    };
  }

  _transformBook(book) {
    return {
      id: parseInt(book.url.split("/")[book.url.split("/").length - 1]),
      name: book.name ? book.name : 'Нет данных',
      numberOfPages: book.numberOfPages ? book.numberOfPages : 'Нет данных',
      publisher: book.publisher ? book.publisher : 'Нет данных',
      released: book.released ? book.released : 'Нет данных'
    };
  }
}
