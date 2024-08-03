const router = require('express').Router();
const { User, Blog } = require('../models/data_model');
const mongoose = require('mongoose');


router.get('/', async (req,res) => {

    res.render('index', {title: 'Home page'});
});

router.get('/contact', (req,res) => {
    res.render('contact', {title: 'Contact page'});
});

router.get('/create-blog', async(req,res) =>{
    res.render('create', {title: 'Create a new post'});
});

router.get('/content-search', async(req,res) => {
    res.render('search_content', {title: 'search'})
})

module.exports = router;
