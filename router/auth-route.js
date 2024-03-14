const express= require('express');
const router = express.Router();
const authcontroller = require ('../controllers/auth-controller')
// router.get('/',(req, res)=>{
//     res
//     .status(200)
//     .send("this is router using router Method  se hai")
// })
router.route('/').get(authcontroller.home);

router.route('/signup').post(authcontroller.signup);
router.route('/login').post(authcontroller.login);


router.route('/add-user').post(authcontroller.addUser);

router.route('/delete/:id').delete(authcontroller.deleteUser);
router.route('/update-user/:id').put(authcontroller.updateUser)

router.route('/user/:id').get(authcontroller.getUserById);
router.route('/all-users').get(authcontroller.getAllUser);

module.exports = router;

