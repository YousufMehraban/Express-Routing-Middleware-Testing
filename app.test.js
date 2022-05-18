process.env.NODE_ENV = 'test'
const app = require('./app')
const supertest = require('supertest')
const db = require('./fakeDb')

let Item = {name: 'popcorn', price: 5.99}

beforeEach(()=>{
    db.push(Item)
})

afterEach(()=>{
    db.length = 0
})


describe('GET /item', ()=>{
    test('testing get request to /items', async ()=>{
        const res = await supertest(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([Item])
    })
    test('get /itemsxxx', async ()=>{
        let res = await supertest(app).get('/itemsxxx')
        expect(res.statusCode).toBe(404)
    })
})

describe('POST /items', ()=>{
    test('testing Post request to /items', async ()=>{
        const res = await supertest(app).post('/items').send(Item);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({add: Item})
    })
    test('Post /itemsxxx', async ()=>{
        let res = await supertest(app).post('/itemsxxx').send(Item)
        expect(res.statusCode).toBe(404)
    })
})


describe('GET /items/:name', ()=>{
    test('testing get request to /items/:name', async function(){
        const res = await supertest(app).get(`/items/${Item.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(Item)
    })
    test('get /items/xxx', async ()=>{
        let res = await supertest(app).get('/items/xxx')
        expect(res.body).not.toEqual(Item)
    })
})

describe('PATCH /items/:name', ()=>{
    test('sending Patch request to /items/:name', async ()=>{
        const res = await supertest(app).patch(`/items/${Item.name}`).send({name: "butter", price: 1.99})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated: Item})
    })
    test('PATCH /itemsxxx/:name', async ()=>{
        let res = await supertest(app).patch('/itemsxxx/:name')
        expect(res.statusCode).toBe(404)
    })
})

describe('DELETE /items/:name', ()=>{
    test('Deleting an item', async ()=>{
        const res = await supertest(app).delete(`/items/${Item.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message: 'Deleted'})
    })
    test('DELETE /itemsxxx/:name', async ()=>{
        let res = await supertest(app).delete('/itemsxxx/:name')
        expect(res.statusCode).toBe(404)
    })
})


