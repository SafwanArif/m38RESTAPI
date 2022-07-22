const jwt = require("jsonwebtoken");
const User = require("./model");

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create(req.body); //req.body is an object that contains k/v pairs that match my User model
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET); //sign method creates a token with object payload hidden in it
        res.send({ user: newUser, token });
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

exports.login = async (req, res) => {
    try {
        // const user = await User.findOne({
        //   username: req.body.username,
        //   password: req.body.password,
        // });
        if (!req.user) {
            throw new Error("Incorrect credentials");
        } else {
            const token = jwt.sign({ id: req.user._id }, process.env.SECRET);
            res.send({ user: req.user, token });
        }
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const result = await User.updateOne(
            req.body.filterObj,
            req.body.updateObj
        ); /*{username: "AndyB"} {keyName: "value"}*/
        if (result.modifiedCount > 0) {
            res.status(200).send({ msg: "Successfully Updated" });
        } else {
            throw new Error({ msg: "Something went wrong" });
        }
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.user._id });
        if (result.deletedCount > 0) {
            res.send({ msg: "Successfully Deleted" });
        } else {
            throw new Error({ msg: "Something went wrong" });
        }
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};