const express = require('express');
const routes = require('./routes');
const mongoose = require('./config');

const app = express();

mongoose.configMongo(); // Necessario criar um js com a funcao que retorna a string de conexacao do mongoose.
app.use(express.json());
app.use(routes);


app.listen(3333);
