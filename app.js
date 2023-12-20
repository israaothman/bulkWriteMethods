// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/the_learning_hub', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const bulk = db.collection('students').initializeUnorderedBulkOp();

const bulkMethods = () => {
    bulk.insert({
        name: 'Ahmad Othman',
        age: 25,
        city: 'Amman',
        hobbies: ['reading']
    });

    bulk.find({ name: "Ahmad Othman" }).update({ $set: { age: 30 } });

    bulk.find({ name: "Khaled" }).upsert().update({ $set: { age: 16 } });

    bulk.find({ name: "Ahmad Othman" }).remove();

    bulk.execute();
};

app.get('/', (req, res) => {
    bulkMethods();
    res.send('all done check your db ');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
