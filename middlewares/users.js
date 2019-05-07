const checkUser = require('../myModules/check.js');

// create new user
createUser = async (req, res, next) => {
    try {
        const userName = req.body.username;
        const passWord = req.body.password;

        if (!userName) {
            return next(new Error('username is required field!'));
        };

        await checkUser.isUserNameExist(req.db.collection('users'), userName).then( isTrue => {
            if (isTrue) return next(new Error('USERNAME_EXISTED'));
        })

        if (!passWord) {
            return next(new Error('password is required field!'));
        }
        return next();
    } catch (e) {
        return next(e);
    }
};

// update user
updateUser = async (req, res, next) => {
    try {
        let userNameUpdate = req.body.username;
        let userPassUpdate = req.body.password;
        const userId = req.params.id;

        await checkUser.isFindById(req.db.collection('users'), userId).then( isTrue => {
            if (!isTrue) return next(new Error('NOT_FOUND'));
        });

        if (!userNameUpdate) {
            return next(new Error('username is required field!'));
        };

        await checkUser.isUserNameExist(req.db.collection('users'), userNameUpdate).then( isTrue => {
            if (isTrue) return next(new Error('USERNAME_EXISTED'));
        });

        if (!userPassUpdate) {
            return next(new Error('password is required field!'));
        }
        
        return next();
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    createUser : createUser,
    updateUser: updateUser
};