const User = require("../models/user")
const Recipe = require("../models/recipe")

module.exports = async (req, res) => {
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
}