import express from 'express'
import mysql from "mysql";
import cors from 'cors'
import * as path from "path";

const PORT = process.env.PORT || 8800;
const app = express();
// app.use(express.static(__dirname));
// app.use(express.static(path.resolve(__dirname,'build')))
app.use(express.json());
app.use(cors())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "socksshop"

})
db.connect((err) =>{
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,'build','index.html'))
// })

app.get("/", (req,res)=> {
    res.json("Welcome on SocksShopBy!");
})


app.get("/products", (req,res)=> {
    const q = "SELECT * FROM goods"
    db.query(q, (err,data)=> {
        if (err) return res.json(err);
        else return res.json(data);
    })
})


app.post("/addGoods", (req,res)=> {
    const q = "INSERT INTO goods(`info`)  VALUES (?)"
    const values = [
        ...req.body
    ];

    db.query(q,[values], (err,data)=> {
        if (err) return res.json(err);
        else return res.json(data);
    })
})

app.post("/deleteItem", (req,res)=> {
    const q = `DELETE FROM goods WHERE id = ${req.body[0]}`
    db.query(q, (err,data)=> {
        if (err) return res.json(err);
        else return res.json(data);
    })
})


app.listen(PORT, ()=>{
    console.log('Сервер подключен успешно')
})