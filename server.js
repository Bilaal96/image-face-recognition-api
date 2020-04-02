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
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('App is working');
});

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

// For future implementation
app.get('/profile/:id', profile.handleProfileGet(db));

app.post('/image/detect', image.handleApiCall());

app.put('/image/entries', image.handleImageEntries(db));

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening at port ${process.env.PORT}`);
});