const dotenv = require('dotenv');
dotenv.config({path:'../.env'});
const mongoose = require('mongoose');
const { USERNAME1, PASSWORD, CLUSTER, DB_NAME } = process.env;
const DB_URL = `mongodb+srv://${USERNAME1}:${PASSWORD}@${CLUSTER}.mongodb.net/`;

function connectToDB(tableName) {
    mongoose.connect(DB_URL+tableName, {useNewUrlParser: true, useUnifiedTopology: true, dbName: DB_NAME}).then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start your Express server or perform other operations after successful connection.
    })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}

function searchRecord(model, query){
    return model.find(query);
}

function createRecord(model, newRecord){
    model.insertMany(newRecord);
}
module.exports = {connectToDB, searchRecord,createRecord}
