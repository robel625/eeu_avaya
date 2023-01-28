const router = require('express').Router()
const auth = require("../middleware/auth")
const usersCtrl = require("../controllers/usersCtrl")


router.get('/allusers', auth, usersCtrl.getAllUsers)

router.patch('/updateUser1/:id', auth, usersCtrl.updateUser1)

router.post('/addUser1', auth, usersCtrl.addUser1)

module.exports = router