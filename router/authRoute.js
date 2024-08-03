const router = require('express').Router();

router.get('/profile', async (req,res) => {
    res.render('profile', {title: 'Profile Page'});
});

module.exports = router;
