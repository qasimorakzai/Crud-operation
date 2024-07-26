const express = require('express');
const router = express.Router();
const Contact = require("../models/contact");

// Home route to display contacts
router.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.render('home', { contacts });
});

// Form to add new contact
router.get('/add', (req, res) => {
    res.render('form', { action: '/add', buttonLabel: 'Add Contact' });
});

router.post('/add', async (req, res) => {
    const { name, email, phone, address } = req.body;
    const contact = new Contact({ name, email, phone, address });
    await contact.save();
    res.redirect('/');
});

// Form to edit contact
router.get('/edit/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render('edit', { contact });
});

router.post('/edit/:id', async (req, res) => {
    const { name, email, phone, address } = req.body;
    await Contact.findByIdAndUpdate(req.params.id, { name, email, phone, address });
    res.redirect('/');
});

// Delete contact
router.post('/delete/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
