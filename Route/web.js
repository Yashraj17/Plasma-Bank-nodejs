const express = require('express');
const router = express.Router();
const HomeController = require('../Controller/homeController');
const csrf = require('csurf')

const cookieParser = require('cookie-parser');
var csrfProtection = csrf({ cookie: true });
router.use(cookieParser());


//view dashboard
router.get('/',HomeController.dashboard)
//donorform page
router.get('/donorForm',csrfProtection,HomeController.donorForm)
//register donor
router.post('/donorForm',csrfProtection,HomeController.insertDonor)



//requestform page
router.get('/requestForm',csrfProtection,HomeController.requestForm)

//register donor
router.post('/requestForm',csrfProtection,HomeController.insertRequester)

//manageDonor page
router.get('/manageDonor',HomeController.manageDonor)


//filter
router.get('/filter?',HomeController.filter)

// router.get('/state',HomeController.Insertstate)


////////////////////////////

//manageRequester page
router.get('/manageRequester',HomeController.manageRequester)

//filter req
router.get('/filterReq?',HomeController.filterReq)


module.exports = router