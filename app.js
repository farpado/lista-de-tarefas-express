const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const checkListRouter = require('./src/routes/checklist');
const taskRouter = require('./src/routes/task');
const rootRouter = require('./src/routes/index');
//import Moment from 'moment';

require('./config/database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method',{methods: ['POST', 'GET']}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklist', checkListRouter);
app.use('/checklist', taskRouter.checklistDepend);
app.use('/tasks', taskRouter.simple);

 var moment = require('moment');
var shortDateFormat = "DD/MM"; // this is just an example of storing a date format once so you can change it in one place and have it propagate
app.locals.moment = moment; // this makes moment available as a variable in every EJS page
app.locals.shortDateFormat = shortDateFormat; 


app.listen(3000, () =>{
    console.log('Servidor foi iniciado');
})
