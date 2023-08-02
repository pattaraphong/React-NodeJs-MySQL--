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



app.get('/edit/:id', (req, res) =>{
    const sql = "SELECT * FROM product WHERE ID = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result) => {
        if(err) return res.json({Error: err});
        return res.json(result);
    }) 
})


//PUT ใช้อันไหนก็ได้ //

// ถ้าใช้อันนี้อย่าลืมใส่ .updated ตรง if(res.data.updated) ใน funtion hanldeSubmit

// app.put('/update/:id', (req, res) => {
//     const sql = "UPDATE product SET `name` = ?, `codename` = ?, `price` = ?, `detail` = ?, `timeproduct` = ?, `dateproduct` = ? WHERE ID = ?";
//     const id = req.params.id;
//     db.query(sql, [ req.body.name, req.body.codename, req.body.price, req.body.detail, req.body.timeproduct, req.body.dateproduct, id],
//         (err, result) => {
//             if(err) return res.json("Error");
//             return res.json({updated: true})
//         })
// })

app.put('/update/:id', (req, res) =>{
    const id = req.params.id;
    
    const name = req.body.name;
    const codename = req.body.codename;
    const price = req.body.price;
    const detail = req.body.detail;
    const timeproduct = req.body.timeproduct;
    const dateproduct = req.body.dateproduct;

    db.query("UPDATE product SET name = ?, codename = ?, price = ?, detail = ?, timeproduct = ?, dateproduct = ? WHERE id = ?",
    [name, codename, price, detail, timeproduct, dateproduct, id],(err, result) => {
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

  