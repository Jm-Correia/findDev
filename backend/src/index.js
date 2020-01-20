const express = require('express');
const routes = require('./routes');
const mongoose = require('./config');
const cors = require('cors');

const app = express();

mongoose(); // Necessario criar um js com a funcao que retorna a string de conexacao do mongoose.

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);
