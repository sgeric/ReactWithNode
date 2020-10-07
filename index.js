const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});
app.get('/greeting', (req,res) => {
    res.send({sve: 'sves'});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);