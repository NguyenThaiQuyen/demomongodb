const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('../db/mongo.js');
const app = express();
const userController = require('./controllers/users');
const userMiddleware = require('./middlewares/users');
 
// Use connect method to connect to the server
MongoClient.connect(mongodb.url, { useNewUrlParser: true }, function(err, client) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log("Connected successfully to server");
    const db = client.db(mongodb.dbName);
    
    app.use(bodyParser.json({ type: 'application/json' })); 

    app.use((req, res, next) => {
        req.db = db;
        return next();
    });

    app.get('/api/v1/users', userController.getListUser); // get list user
    app.get('/api/v1/users/:id', userController.getUser); // get one user by id
    app.post('/api/v1/users', userMiddleware.createUser, userController.createUser); // create new user
    app.delete('/api/v1/users/:id', userController.deleteUser); // delete one user by id
    app.put('/api/v1/users/:id', userMiddleware.updateUser, userController.updateUser); // update one user by id

    app.use((err, req, res, next) => {
        console.error(err);
        return res.status(400).json({
            message: err.message
        })
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${mongo.port}!`)
    });
});
