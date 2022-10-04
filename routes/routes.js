const express = require('express');
const res = require('express/lib/response');
const Model = require('../models/models');
const router = express.Router();

//GET 

router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find()
        res.json(data)

    } catch {
        res.status(500).json({ message: error.message })
    }

})

//GET with id  
router.get('/getid/:id', async (req, res) => {

    try {
        const data = await Model.findById(req.params.id)
        res.json(data)

    } catch {
        res.status(500).json({ message: error })
    }

})

//633bc555509ee67f7ae86d24


//POST Api 
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age,
        doctor_name: req.body.doctor_name,
        approved: req.body.approved
    })

    try {
        const dataToSave = await data.save()
        res.status(200).json(dataToSave)

    } catch (error) {
        res.status(400).json({ message: error.message });

    }

})

//PUT api 
router.put('/put', (req, res) => {
    res.send('put kardo')

})


//patch api 
router.patch('/patch/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dataToUpdate = req.body
        const options = { new: true }

        const result = await Model.findByIdAndUpdate(
            id, dataToUpdate, options
        )

        res.send(result)


    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
)

//Delete api 
router.delete('/delete/:id', async (req, res) => {

    try {

        await Model.findByIdAndDelete(req.params.id)
        res.send(`${req.params.id} is deleted `)

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
})

module.exports = router; 
