const handleRegister = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json('Incorrect form submission');
    }

    // DB Transaction - Persist User Registration Info into 'login' & 'user' tables
    db.transaction(trx => {
        // Generate salt & hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, function (err, hash) {
                // Store hash in DB
                trx.insert({
                    email: email,
                    hash: hash
                })
                    .into('login')
                    .returning('email')
                    .then(loginEmail => {
                        return trx('users')
                            .returning('*')
                            .insert({
                                name: name,
                                email: loginEmail[0],
                                joined: new Date()
                            }).
                            then(user => res.json(user[0]));
                    })
                    .then(trx.commit)
                    .catch(trx.rollback);
            });
        });
    })
        .catch(err => res.status(400).json('Unable to register'));
};

module.exports = {
    handleRegister
};