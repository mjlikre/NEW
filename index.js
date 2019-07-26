const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()


// db setup 
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true, useCreateIndex: true});

// middleware setup
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//if in production, serve cliets build folder, which is created in production only 
if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
}

//uses the routes in the routes folder
const routes = require('./routes')
app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`server started on port ${PORT}` ))

  