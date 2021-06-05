module.exports = app => {

    const Add = require('../controllers/news/add.controller')
    const Delete = require('../controllers/news/delete.controller')
    const FindAll = require('../controllers/news/findAll.controller')
    const FindOne = require('../controllers/news/findOne.controller')
    const Update = require('../controllers/news/update.controller')

    var router = require('express').Router()

    // add
    router.post('/', Add.add)

    // delete
    router.delete('/:id', Delete.delete)

    // find all
    router.get('/', FindAll.findAll)

    // find one
    router.get('/:id', FindOne.findOne)

    // update
    router.put('/:id', Update.update)

    app.use('/api/news', router)
}