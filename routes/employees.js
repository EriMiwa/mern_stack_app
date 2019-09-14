const express = require('express');
const router = express.Router();

let Employees = require('../models/employees.mongo');

router.get('/', (req, res) => {
    Employees.find()
    .then((employees) => res.json(employees))
    .catch(err => res.status(400).send(`Error on getting employees list: ${err}`));
});

router.post('/', (req, res) => {
    const { checked, name, email, address, phone } = req.body;

    const newEmployees = new Employees({
        checked,
        name,
        email,
        address,
        phone
    });

    newEmployees.save()
    .then(() => res.send('new employee added!'))
    .catch(err => res.status(400).json({'msg': `Could not save employees: ${err}`}));
});

router.put('/', (req, res) => {
    const id = req.body.id;
    const checked = req.body.checked;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const phone = req.body.phone;

    var query = { _id: id };
    var newUpdatingData = {
        checked: checked,
        name: name,
        email: email,
        address: address,
        phone: phone
    };

    Employees.findOneAndUpdate(query, newUpdatingData)
    .then(() => res.send('Updating success'))
    .catch(err => res.status(400).json({ 'msg': `Error: ${err}`}));
});
  
router.delete('/', (req, res) => {
    var query = { checked: true };
    Employees.remove(query)
    .then(() => res.send('Deleting success'))
    .catch(err => res.status(400).json({ 'msg': `Error: ${err}`}));
});

module.exports = router;
