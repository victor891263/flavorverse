const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const crypto = require('crypto')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const User = require('../models/user')
const Recipe = require('../models/recipe')
const handleAccess = require('../middleware/handleAccess')
const sendEmail = require('../utilities/sendEmail')

const upload = multer({ dest: "uploads/" }) // where uploaded images will be temporarily stored

// get a profile/user
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    // check if the user exists in the database. If they don't, don't proceed
    if (!user) {
        res.status(404).send(`The profile that you're trying to view doesn't exist`)
        return
    }

    const recipes = await Recipe.find({
        user: user.id
    }).populate('user', '_id username img')

    res.send({ user, recipes })
})


// create a new account
router.post('/', async (req, res) => {
    const userData = req.body

    // check if the email provided by the guest is already present in the database. If it is, don't proceed
    const user = await User.findOne({
        email: {
            address: userData.email
        }
    })

    if (user) {
        res.status(400).send('An account with a given email already exists')
        return
    }

    // hash the password to make it complex and unreadable
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    const verificationId = crypto.randomBytes(32).toString('hex') // generate a 64-character long random string

    const result = await User.create({
        email: {
            address: userData.email,
            verificationId
        },
        password: hashedPassword
    })

    // send an email to the email address provided by the user
    await sendEmail(userData.email, verificationId)

    // create the json web token and send it to the client
    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET)
    res.send(token)
})


// update profile (except email and password)
router.put('/', [handleAccess, upload.single('newImg')], async (req, res) => {
    const newUserData = req.body
    const newImg = req.file
    const currentUserId = req.user.id

    // check if the new username is already present in the database
    const user = await User.findOne({
        username: newUserData.username
    })

    // if the username already belongs to the currently logged in user (that is - they didn't change the username), dont send an error. Otherwise, send an error
    if (user.id !== currentUserId) {
        res.status(400).send('The new username you picked is already taken')
        return
    }

    // if the user submitted a new profile image, upload it to cloudinary
    let newImgUrl
    if (newImg) {
        // if the user has an old profile image, remove it from cloudinary
        if (newUserData.img) {
            const publicId = newUserData.img.match(/\/([^/]+)\.[a-zA-Z0-9]+$/)[1] // extract the public id from the image url
            await cloudinary.uploader.destroy(publicId)
        }

        // upload to cloudinary
        const response = await cloudinary.uploader.upload(newImg.path)
        newImgUrl = response.secure_url

        // once the image has been uploaded to cloudinary, delete the image from the file system
        fs.unlink(newImg.path, error => {
            if (error) throw error
        })
    }

    await User.findByIdAndUpdate(currentUserId, {
        username: newUserData.username,
        name: newUserData.name,
        about: newUserData.about,
        link: newUserData.link,
        ...(newImgUrl && { img: newImgUrl }) // if the user submitted a new profile image and it is uploaded to cloudinary, update the url in the database too
    })

    res.send(newImgUrl)
})


// update email
router.put('/email', handleAccess, async (req, res) => {
    const newEmail = req.body
    const currentUserId = req.user.id

    await User.findByIdAndUpdate(currentUserId, {
        email: newEmail
    })

    res.sendStatus(200)
})


// update password
router.put('/password', handleAccess, async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const currentUserId = req.user.id

    // get the password from the database
    const user = await User.findById(currentUserId, 'password')

    // check if the given password matches with the one in the database. If it doesn't, don't proceed
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordValid) {
        res.status(400).send('Wrong password')
        return
    }

    // hash the password to make it complex and unreadable
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword
    await user.save()

    res.sendStatus(200)
})


// delete an account
router.delete('/', handleAccess, async (req, res) => {
    const currentUserId = req.user.id

    await User.findByIdAndDelete(currentUserId)

    res.sendStatus(200)
})


module.exports = router