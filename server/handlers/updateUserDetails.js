const User = require("../models/user")
const {v2: cloudinary} = require("cloudinary")
const fs = require("fs")

module.exports = async (req, res) => {
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
}