const router = require('express').Router()
const eeuCtrl = require('../controllers/keyCustomerCtrl')
const eeuCscCtrl = require('../controllers/eeuCscCtrl')
const auth = require('../middleware/auth')

router.get('/searchCustomer', auth, eeuCtrl.searchCustomer)

router.post('/addCustomer', auth, eeuCtrl.addCustomer)

router.get('/customer/:id', auth, eeuCtrl.getCustomer)

router.get('/customerdetail/:id', auth, eeuCtrl.customerdetail)


router.patch('/updateCustomer/:id', auth, eeuCtrl.updateCustomer)

router.patch('/updateCustomerstring/:id', auth, eeuCtrl.updateCustomerstring)

router.post('/addCsc', auth, eeuCscCtrl.addCsc)


module.exports = router