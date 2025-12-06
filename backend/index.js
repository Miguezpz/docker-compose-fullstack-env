const express = require('express');
const cors = require('cors');

const app = express();
const myPort = 3000;
const generatedNumbers = [];

app.use(express.json());
app.use(cors());


app.get('/my-app/generateNumber', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    generatedNumbers.push(randomNumber);

    console.log(`Random number was generated -> ${randomNumber}`);
    res.send({ generated: randomNumber });
});


app.get('/my-app/seeNumbers', (req, res) => {
    res.send(generatedNumbers);
});

app.listen(myPort, '0.0.0.0', () => {
    console.log(`running server on http://localhost:${myPort}`);
});

