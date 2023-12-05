require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const SiteSchema = require('./models/Sites');
const UserSchema = require('./models/Users')
const connectDB = require('./db/connect')

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT;

app.post("/Sites", (req, res) => {
    SiteSchema.create(req.body)
        .then(sites => res.json(sites))
        .catch(error => res.json(error))
});

app.get('/GetSites', (req, res) => {
    SiteSchema.find({})
        .then(sites => res.json(sites))
        .catch(error => res.json(error))
});

app.delete('/DeleteSite/:id', (req, res) => {
    const id = req.params.id;
    SiteSchema.findByIdAndDelete({ _id: id })
        .then(sites => res.json(sites))
        .catch(error => res.json(error))
})

app.post('/Register', (req, res) => {
    UserSchema.create(req.body)
        .then(users => res.json(users))
        .catch(error => res.json(error))
})

app.post('/Login', (req, res) => {
    const { username, password } = req.body;
    UserSchema.findOne({ username: username })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json('Login Successful')
                }
                else {
                    res.json('Please Check the Password')
                }
            } else {
                res.json('Not Existing')
            }
        })
})

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server Connection Successful!`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();