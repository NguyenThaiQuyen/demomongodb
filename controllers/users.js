const { ObjectId } = require('mongodb');
const checkUser = require('../myModules/check.js');

// get one user by id

getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await req.db.collection('users').findOne({
            _id: ObjectId(userId)
        });
        
        if (!user) {
            return next(new Error('NOT_FOUND'));
        }

        return res.json({
            message: "Find a record",
            data: user
        });
    } catch(err) {
        return next(err);
    }
};

// get list user

getListUser = async (req, res, next) => {
    try {
        const listUser = await req.db.collection('users').find().toArray();
        
        if (!listUser) {
            return next('NOT_DATA');
        };

        return res.json({
            message: "List user",
            data: listUser
        });
    } catch(err) {
        return next(err);
    }
};

// create new user

createUser = async (req, res, next) => {
    try {
        const userName = req.body.username;
        const passWord = req.body.password;

        const result = await req.db.collection('users').insertOne({
            username: userName,
            password: passWord
        });

        return res.json({
            message: "Create new user succesfully!",
            data: result.ops[0]
        });
    
    } catch(err) {
        return next(err);
    }
}

// delete one user by id

deleteUser = async (req, res, next) => {
    try {

        const userId = req.params.id;
        console.log(userId);

        const result = await req.db.collection('users').findOneAndDelete({
            _id: ObjectId(userId)
        }).then((result) => {
            if(!result.value) return next(new Error('NOT_FOUND'));
        });

        return res.json({
            message: 'Delete user successfully!',
            data: result
        });
    } catch(err) {
        return next(err);
    }
}

// upsate one user by id

updateUser = async (req, res, next) => {
    try {

        let userNameUpdate = req.body.username;
        let userPassUpdate = req.body.password;
        const userId = req.params.id;

        console.log(userNameUpdate);
        console.log(userPassUpdate);

        const userUpdate = await req.db.collection('users').findOneAndUpdate({
            _id: ObjectId(userId)
        }, { $set : { username: userNameUpdate , password: userPassUpdate } });

        return res.json({
            message: 'Update successfully!',
            data: userUpdate
        });

    } catch(err) {
        return next(err);
    }
}

module.exports = {
    getUser: getUser,
    getListUser: getListUser,
    createUser : createUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};