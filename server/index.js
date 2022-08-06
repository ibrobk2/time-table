const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors")

//creating db
const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password: "",
    database: "time_table"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//Fetching db data
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM lectures";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const {courseCode, courseTitle, dayTime, venue} = req.body;
    const sqlInsert = "INSERT INTO lectures (courseCode, courseTitle, dayTime, venue) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [courseCode, courseTitle, dayTime, venue], (error, result) => {
        if(error){
            console.log(error);
        }       
    })

});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM lectures WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if(error){
            console.log(error);
        }       
    })

});

//fetching data from db for editing
app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM lectures WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});


app.put("/api/update/:id", (req, res) => {
    const {id} = req.params;
    const {courseCode, courseTitle, dayTime, venue} = req.body;
    const sqlUpdate = "UPDATE lectures SET courseCode = ?, courseTitle = ?, dayTime = ?, venue = ? WHERE id = ?";
    db.query(sqlUpdate, [courseCode, courseTitle, dayTime, venue, id], (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});


//Insert Section
// app.get("/", (req, res)=>{
//     // const sqlInsert = "INSERT INTO lectures VALUES (null, 'CSC201', 'Python Programming', 'Thur:2-4pm', 'LT1')";
//     // db.query(sqlInsert, (error, result) => {
//     //     console.log("error", error);
//     //     console.log("result", result);
//     //     res.send("Hello Express");
//     // })
    
// });

app.listen(5000, ()=> {
    console.log("Server is running at port 5000");
});