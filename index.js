const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");


const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:  true}));
app.use(express.static("public"));

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "rD0082#9452@",
    database: "myblogdb"
});

// connection.query("SELECT * FROM blogs", function(err, result) {
//     console.log(result);
// });


app.get("/", (req,res) => {
    res.render("home", {});
    // res.status(200).send("Welcome user");
})

app.get("/blogs", (req, res) => {
    connection.query("SELECT * FROM blogs", function(err, result) {
        // console.log(result);
        res.render("blogs", {blogs: result});
    });
})


app.post("/blogs", (req, res) => {
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    connection.query(`INSERT INTO blogs (title, content) values("${title}","${content}")`, function(err, result) {
        if(!err) console.log("Inserted blog successfully");
        else (console.log(err));
    })
    res.redirect("/blogs");
})

app.get("/delete", (req, res) => {
    // console.log(req.query.blogID);
    const blogID = req.query.blogID;
    connection.query(`DELETE FROM blogs WHERE blogID = "${blogID}"`, function (err, result) {
        if(!err) res.redirect("/blogs");
        else res.json("Error deleting blog");
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})