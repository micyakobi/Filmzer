const Users = require('../models/users');

const createUser = async (body) => {
    const user = new Users({
        username: body.username,
        password: body.password,
        admin: body.admin,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email
    });

    return await user.save();
};


const getUsers = async () => {
    return await Users.find({},{'_id':1, 'username':2, 'password':3, 'admin':4, 'firstName':5, 'lastName':6, 'email':7});
};


const countUsers = async () => {
    return await Users.countDocuments({});
};


const getUserByParam = async (userName, firstName, lastName, email) => {

    return Users.find(
        {
            'username': {$regex: `.*${userName}.*`, $options:'i'},
            'firstName': {$regex: `.*${firstName}.*`, $options:'i'},
            'lastName': {$regex: `.*${lastName}.*`, $options:'i'},
            'email': {$regex: `.*${email}.*`, $options:'i'}
        }
    );
};


const getByUsername = async (username) => {
    return await Users.find({'username': username});
};


const getUserByEmail = async (email) => {
    return await Users.find({'email': email});
};


const getUserById = async (id) => {
    return await Users.findById(id);
};


const removeUserReviews = async (review_ids) => {

    return Users.update({},{$pull:{"reviews":{$in:review_ids}}},{multi:true});
};


const getOnlyUserById = async (id) => {
    return await Users.findById(id,{'username':1, 'password':2, 'admin':3, 'firstName':4, 'lastName':5, 'email':6});
};


const updateUser = async (id, body) => {
    const user = await getUserById(id);
    if (!user)
        return null;

    user.username = body.username;
    user.password =  body.password;
    user.admin = body.admin;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.email = body.email;

    await user.save();
    return user;

};


const updateReviewOfUser = async (id, review) => {

    const user = await getUserById(id);

    if (!user)
        return null;

    if(!review)
        return null

    if(user.reviews.indexOf(review._id) === -1){
        user.reviews.push(review._id);
    }
    await user.save();

    return user;
};


const deleteUser = async (id) => {
    const user = await getUserById(id);
    if (!user)
        return null;

    await user.remove();
    return user;
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
    getOnlyUserById,
    removeUserReviews
}