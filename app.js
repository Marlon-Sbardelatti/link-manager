const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const linkRoute = require('./routes/linkRoute.js')
const path = require('path');
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use("/", linkRoute);

mongoose.connect("mongodb://127.0.0.1:27017/links")

const db = mongoose.connection;

db.on("error", () => {
    console.log("houve um erro fia da puta")
})

db.once("open", () => {
    console.log("db carregado com sucesso painho!")
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"))

