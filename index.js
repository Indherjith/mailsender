const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send('mailsender is ready to send mail!')
});

app.listen(8080,()=>{
    console.log("Server running on port 8080!");
});