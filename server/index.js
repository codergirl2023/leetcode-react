const express = require('express');
const app = express();
const dotenv = require('dotenv')
const process = require('process');
const cors = require('cors');
dotenv.config({path:'../.env'})
const user = require('./routes/userServer');
const problemSet = require('./routes/problemSetServer');
const submissions = require('./routes/submissionsServer')
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use('/users', user);
app.use('/problemset',problemSet);
app.use('/submissions',submissions);

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.listen(port,()=>{
    console.log('app is listening at ', port);
});
