const base_url = "http://localhost:8080/users";

// post - create a new user
// get - get all users
export const usersURL = () => `${base_url}/`;

// get user by username, first name,last name and email
// param - username=firstName=lastName=email
export const usersByParamsURL = () => `${base_url}/getUserByParam/:param`;

// Update the review of user id in users table
export const updateReviewByUserIdURL = () => `${base_url}/updateReviewOfUser/:id`;

// Counter of all the users
export const usersCountURL = () => `${base_url}/countUsers`;

// get user by username
export const userByUserNameURL = (username) => `${base_url}/getUsername/${username}`;

// get user by email
export const userByEmailURL = (email) => `${base_url}/getUserByEmail/${email}`;

// get - get user by user id
// delete - delete user by user id
// patch - update user by user id
export const userByUserIdURL = () => `${base_url}/:id`;




