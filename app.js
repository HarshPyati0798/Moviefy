const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes/main');

const app = express();

app.set('view engine','ejs')
app.set('views','views');

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(express.static(path.join(__dirname,'public')));
app.get('/rate',routes);
app.get('/friend',routes);
app.get('/upcoming',routes);
app.use('/',routes);

app.listen(3000);

