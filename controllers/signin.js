const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Incorrect form submission');
    }

    db.select('email', 'hash').from('login')
        .where({ email })
        .then(data => {
            bcrypt.compare(password, data[0].hash)
                .then((match) => {
                    // Return user to frontend if match is true 
                    if (match) {
                        return db.select('*').from('users')
                            .where({ email })
                            .then(user => {
                                res.json(user[0]);
                            })
                            .catch(err => res.status(400).json('Unable to get user'));
                    } else {
                        res.status(400).json('Incorrect credentials');
                    }
                })
                .catch(err => res.status(400).json('Error matching password'));
        })
        .catch(err => res.status(400).json('Error matching email'));
};

module.exports = {
    handleSignin
};