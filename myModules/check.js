const { ObjectId } = require('mongodb');

isUserNameExist = (db, userName) => {
    return db.count({
        username : userName
    }).then((count) => {
        if (count !== 0) {
            return true;
        }
        return false;
    });
}

isFindById = (db, id) => {
    return db.count({
        _id : ObjectId(id)
    }).then((count) => {
        if (count !== 0) {
            return true;
        }
        return false;
    });
}

module.exports = {
    isUserNameExist: isUserNameExist,
    isFindById: isFindById
}