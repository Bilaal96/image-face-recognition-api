/**
 ** / --> GET --> res = this is working
 ** /signin --> POST --> res = success/fail
 ** /register --> POST --> res = new user obj
 ** /profile/:userId --> GET --> res = user obj
 ** /image --> PUT ---> res = updated user obj with new count for User Rank
*/
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'BeMyBestSelf3396!',
        database: 'smart_brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

// For future implementation
app.get('/profile/:id', profile.handleProfileGet(db));

app.post('/image/detect', image.handleApiCall());

app.put('/image/entries', image.handleImageEntries(db));

app.listen('3000', () => {
    console.log('listening at port 3000')
});