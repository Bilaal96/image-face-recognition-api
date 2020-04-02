const Clarifai = require('clarifai');

// Init Clarifai API, using key:
const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = () => (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Unable to work with API'));
}

const handleImageEntries = (db) => (req, res) => {
    const { id } = req.body;

    db('users').where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('Unable to get entries'));
};

module.exports = {
    handleApiCall,
    handleImageEntries
};