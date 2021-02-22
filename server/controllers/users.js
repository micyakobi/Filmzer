const usersService = require('../services/users');
const reviewService = require('../services/reviews');


const createUser = async (req, res) => {
    const newuser = await usersService.createUser(req.body);
    res.json(newuser);
};


const getUsers = async (req, res) => {
    const users = await usersService.getUsers();
    res.json(users);
};


const getUserByParam = async (req, res) => {

    var [userName, firstName, lastName ,email] = req.params.param.split('=');

    const users = await usersService.getUserByParam(userName, firstName, lastName, email);

    res.json(users);
};


const countUsers = async (req, res) => {
    const users = await usersService.countUsers();
    res.json(users);
};


const getByUsername = async (req, res) => {
    const user = await usersService.getByUsername(req.params.username);

    if (!user) {
        return res.status(404).json({errors: ['username not found']});
    }

    res.json(user);
};


const getUserByEmail = async (req, res) => {
    const user = await usersService.getUserByEmail(req.params.email);

    if (!user) {
        return res.status(404).json({errors: ['email not found']});
    }

    res.json(user);
};


const getUserById = async (req, res) => {
    const user = await usersService.getUserById(req.params.id);

    if (!user){
        return res.status(404).json({errors: ['user_id not found']});
    }

    res.json(user);
};


const getOnlyUserById = async (req, res) => {
    const user = await usersService.getOnlyUserById(req.params.id);

    if (!user){
        return res.status(404).json({errors: ['user_id not found']});
    }

    res.json(user);
};

const updateUser = async (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "user param is required",
        });
    }

    const user = await usersService.updateUser(req.params.id, req.body);
    if (!user) {
        return res.status(404).json({ errors: ['username not found'] });
    }

    res.json(user);
};


const updateReviewOfUser = async (req, res) => {

    if (!req.body) {
        res.status(400).json({
            message: "users param are required",
        });
    }

    const user = await usersService.updateReviewOfUser(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['user not found'] });
    }

    res.json(user);
};


const deleteUser = async (req, res) => {

    const reviews_ids = await reviewService.getReviewByUserId(req.params.id);

    reviews_ids.forEach(function (reviewId) {
        const review = reviewService.deleteReview(reviewId["_id"]);
        if (!review){
            return res.status(404).json({ errors: ['review not found for deleted'] });
        }

    });

    const user = await usersService.deleteUser(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['user not found'] });
    }

    res.send();
};


module.exports = {
    createUser,
    getUsers,
    getByUsername,
    getUserById,
    updateUser,
    updateReviewOfUser,
    deleteUser,
    countUsers,
    getUserByParam,
    getUserByEmail,
    getOnlyUserById
}