const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { insertQuizData } = require('./ExamModel'); 
const app = express();
const port = 7000;


const mongoURI = 'mongodb+srv://akashbalyan:akybal139600@cluster0.8xml8mw.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Database');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


app.use(bodyParser.json());

app.get('/insert', async (req, res) => {
    let result = await insertData();

    res.json({result});
});


app.get('/', async (req, res) => {
    res.send("Service is running. Hit /insert to insert the data into the db");
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

function insertData() {

    console.log('Inserting to MongoDB database');

    return new Promise((resolve, reject) => {
       
        const name = 'Akash Balyan';
        const sid = '300358154';

        
        insertQuizData(name, sid)
        .then(result => {
            console.log('Document inserted successfully:', result);
            resolve(result);
        })
        .catch(err => {
            console.error('Error during inserting data:', err);
            reject(err);
        });

    });
    
}