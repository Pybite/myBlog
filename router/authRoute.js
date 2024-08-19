const router = require('express').Router();
const {User, Blog} = require('../models/data_model');


router.get('/profile', async (req,res) => {
    res.render('profile', {title: 'Profile Page'});
});


router.post('/create-blog/post', async (req,res,next) => {
    const user = await User.find({email: req.user.email});
    const {title, content} = req.body;
    const blog = new Blog({email: user[0], title: title, content: content});
    await blog.save();
    res.redirect('/');

})

module.exports = router;
