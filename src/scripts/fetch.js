export default class CreateReqest {
    constructor (){
        this.statickUrl = 'https://www.anapioficeandfire.com/api'
    }

    async onFetch(){
        const res = await fetch(`${this.statickUrl}/characters?page=6&pageSize=10`);
        return await res.json();
    }
}

const code = new CreateReqest();
console.log(code.onFetch());
