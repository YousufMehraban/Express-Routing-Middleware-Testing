const express = require('express')
const app = require('./app')
const fakeDb = require('./fakeDb')

const router = new express.Router()



router.get('/', (req, res)=>{
    return res.json(fakeDb)
})


router.post('/', (req, res)=>{
    let item = {name: req.body.name, price: req.body.price}
    fakeDb.push(item)
    return res.json({add: item})
})

router.get('/:name', (req, res)=>{
    let item = fakeDb.find((i)=>{return i.name === req.params.name})
    if(item){
        return res.json(item)
    }
    return res.send('Item Not Found!')
})

router.patch('/:name', (req, res)=>{
    let item = fakeDb.find((i)=> { return i.name === req.params.name})
    if(item){
        item.name = req.body.name,
        item.price = req.body.price
        return res.json({updated: item})
    }
    res.send('Item Not Found To Be Modified')
})

router.delete('/:name', (req, res)=>{
    let item = fakeDb.find((i)=>{ return i.name === req.params.name})
    if (item){
        fakeDb.pop(item)
        res.send({message: 'Deleted'})
    }
    return res.send('Item Not Found to Be Deleted')
    
})


module.exports = router