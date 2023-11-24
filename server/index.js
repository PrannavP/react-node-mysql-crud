const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "employeesystem"
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        'INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)',
        [name, age, country, position, wage],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send("Values inserted");
            }
        });
});

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
            console.log("Results fetched successfully");
        }
    });
});

app.delete('/employees/:id', (req, res) => {
    const employeeId = req.params.id;

    db.query('DELETE FROM employees WHERE id = ?', employeeId, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting employee");
        } else if (result.affectedRows === 0) {
            res.status(404).send("Employee not found");
        } else {
            res.send("Employee deleted successfully");
            console.log("Employee deleted successfully");
        }
    });
});

app.listen(3001, () => {
    console.log('Yay, your server is running on port 3001');
})