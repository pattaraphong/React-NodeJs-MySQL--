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
    database: "productSystem"
    
}
)

app.get('/product',(req,res) => {
    db.query("SELECT * FROM product",(err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.post('/create',(req, res) => {
    const name = req.body.name;
    const codename = req.body.codename;
    const price = req.body.price;
    const detail = req.body.detail;
    const timeproduct = req.body.timeproduct;
    const dateproduct = req.body.dateproduct;

    db.query("INSERT INTO product (name, codename, price, detail, timeproduct, dateproduct) VALUES(?,?,?,?,?,?)",
    [name, codename, price, detail, timeproduct, dateproduct],
    (err, result) => {
        if(err) {
            console.log(err);
        }else{
            res.send("Values inserted")
        }
    });
})

app.delete('/delete/:id', (req, res) =>{
    const id = req.params.id;
    db.query("DELETE FROM product WHERE id = ?", id, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.listen('3001', () =>{
    console.log('server is running port 3001')
})

  