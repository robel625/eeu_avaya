
const router = require('express').Router()
const eeuCompCtrl = require('../controllers/eeuComplainCtrl')
const auth = require('../middleware/auth')


router.post('/createComplain', auth, eeuCompCtrl.createComplain)

router.get('/complain/:id', auth, eeuCompCtrl.getComplain)

router.get('/searchComplain', auth, eeuCompCtrl.searchComplain)

router.get('/complain/requestId/:id', auth, eeuCompCtrl.getComplainRequest)

router.patch('/editComplain/:id', auth, eeuCompCtrl.editComplain)

router.get('/complainbyagent', auth, eeuCompCtrl.complainbyagent)


module.exports = router