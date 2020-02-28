let mongoose = require("mongoose");
let User = require("../models/user");

/*
 * GET /user route to get all the users.
 */

const getUsers = (req, res) => {
    //Query the DB and if no errors, send all the users.
    let query = User.find({});
    query.exec((err, users) => {
        if (err) res.send(err);
        res.json(users);
    });
};

/*
 * POST /user to save a new user.
 */

const postUser = (req, res) => {
    //Create a new User
    let newUser = new User(req.body);
    //Save it into the DB.
    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "User successfully added!", user });
        }
    });
};

/*
 * GET /user/:id route to retrieve a user given its id.
 */

const getUser = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) res.send(err);
        res.json(user);
    });
};

/*
 * DELETE /user/:id to delete a user given its id.
 */

const deleteUser = (req, res) => {
    User.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "User successfully deleted!", result });
    });
};

/*
 * PUT /user/:id to update a user given its id
 */

const updateUser = (req, res) => {
    User.findById({ _id: req.params.id }, (err, user) => {
        if (err) res.send(err);
        Object.assign(user, req.body).save((err, user) => {
            if (err) res.send(err);
            res.json({ message: "User updated!", user });
        });
    });
};

//export all the functions
module.exports = { getUsers, postUser, getUser, deleteUser, updateUser };
