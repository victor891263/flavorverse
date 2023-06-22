const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Recipe = require('../models/recipe')
const handleAccess = require('../middleware/handleAccess')


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


router.post('/', async (req, res) => {
    const userData = req.body

    // check if the username given by the guest is already present in the database. If it is, don't proceed
    const user = await User.findOne({
        username: userData.username
    })

    if (user) {
        res.status(400).send('The username you provided is already taken')
        return
    }

    // hash the password to make it complex and unreadable
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    const result = await User.create({
        username: userData.username,
        password: hashedPassword
    })

    // create the json web token and send it to the client
    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET)
    res.send(token)
})


router.put('/', handleAccess, async (req, res) => {
    const newUserData = req.body
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

    await User.findByIdAndUpdate(currentUserId, {
        username: newUserData.username,
        name: newUserData.name,
        about: newUserData.about
    })

    res.sendStatus(200)
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


router.delete('/', handleAccess, async (req, res) => {
    const currentUserId = req.user.id

    await User.findByIdAndDelete(currentUserId)

    res.sendStatus(200)
})


module.exports = router