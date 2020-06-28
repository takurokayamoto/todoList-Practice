const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();
var items = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    var today = new Date();
    var option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    var day = today.toLocaleString("en-JP", option);

    res.render("index", { today: day, itemList: items});
});

app.post("/", function (req, res) {
    const btn = req.body.btn;
    if (btn === "add") {
        const item = req.body.newItem
        if (item === "") {
            console.log("input the value");
            res.redirect("/");  
        } else {
            items.push(item);
            res.redirect("/");  
        }
    } else {
        items = [];
        res.redirect("/");
    }
});

app.listen(3000, function () {
    console.log("server is running on 3000");
});


