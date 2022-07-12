require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const notes = require ('./routes/notes');

const app = express();
app.use(express.json());

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.get('/', (req, res) => {
    res.json({msg : 'test'})
})

app.use('/notes', notes);


// listen requests
mongoose.connect(process.env.MDB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listning to port', process.env.PORT)
        });
    })
    .catch((error) => {
        console.log(error)
    })



