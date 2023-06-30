const express = require('express')
const router = express.Router()
const multer = require('multer')
const getUser = require('../handlers/getUser')
const addUser = require('../handlers/addUser')
const updateUserDetails = require('../handlers/updateUserDetails')
const updateUserEmail = require('../handlers/updateUserEmail')
const stopUpdateUserEmail = require('../handlers/stopUpdateUserEmail')
const updateUserPassword = require('../handlers/updateUserPassword')
const deleteUser = require('../handlers/deleteUser')
const handleAccess = require('../middleware/handleAccess')

const upload = multer({ dest: "uploads/" }) // where uploaded images will be temporarily stored

// create a new account
router.post('/', addUser)

// update profile (except email and password)
router.put('/', [handleAccess, upload.single('newImg')], updateUserDetails)

// delete an account
router.delete('/', handleAccess, deleteUser)

// stop updating email
router.delete('/email', handleAccess, stopUpdateUserEmail)

// update email
router.put('/email', handleAccess, updateUserEmail)

// update password
router.put('/password', handleAccess, updateUserPassword)

// get a profile/user
router.get('/:id', getUser)


module.exports = router