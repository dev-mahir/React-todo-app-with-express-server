// External imports 
const router = require('express').Router();

// Internal imports 
const { userSignup, readUser, userLogin, updateUser, deleteUser } = require('../controllers/UserController');
const { authCheck } = require('../middlewere/authCheck');



// User routes 

router.delete('/:id',  deleteUser)
router.patch('/:id',  updateUser)
router.get('/',  readUser)


router.post('/signup', userSignup)

router.route('/login').post(userLogin)



// Export Router 
module.exports = router;