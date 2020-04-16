class GodService {
    constructor (){
        this.statickUrl = 'https://www.anapioficeandfire.com/api'
    }

    async onFetch(url){
        const res = await fetch(`${this.statickUrl}/characters?page=6&pageSize=10`);
        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json();
    }

    getAllCharacters(){
        return this.onFetch(`/characters?page=7&pageSize=10`)
    }

    getCharacter(id){
        return this.onFetch(`/characters/${id}`)
    }
}

const got = new GodService();
got.getAllCharacters()
    .then(res=>{
        res.forEach(e=>console.log(e.name))
    });

got.getCharacter(prompt('Введите ID персонажа'))
    .then(res=>console.log(res));
