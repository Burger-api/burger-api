require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log('Burger-API');
    res.send({
        title: 'Burger-APi'
    })
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));