import express from 'express'
import mysql from "mysql";
import cors from 'cors'

import https from 'https'
import fs from 'fs'

const options = {
    key: fs.readFileSync('certificate/private.pem'),
    cert: fs.readFileSync('certificate/cert.pem')
}

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors())


const db = mysql.createConnection({
    host: "194.67.112.147",
    port: '/var/run/mysqld/mysqld.sock',
    user: "root",
    password: "sava606348",
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

https.createServer(options, (req,res)=>{
    console.log('SSL ADDED')
    console.log("Url: " + req.url);
}).listen(PORT, ()=>{
    console.log(`Сервер подключен успешно port=${PORT}`)
})