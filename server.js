const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port 3000...');
});
