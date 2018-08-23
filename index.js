const express = require('express');
const app = express();
app.get('/',(req,res)=>{
    res.end('index page');
})
app.get('/random/:numeroInicial/:numeroFinal',(req,res)=>{
    const min = parseInt(req.params.numeroInicial);
    const max = parseInt(req.params.numeroFinal);
    const result = Math.floor(Math.random() * (max - min) + min);
    if(isNaN(min) || isNaN(max)){
        res.status(404);
        res.json({"error":'bad request'});
        return;
    }
    res.json({"randomNumber":result});
})
var direccionip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var puerto = process.env.OPENSHIFT_NODEJS_PORT || 8080;
//app.set('port',process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.listen(puerto,direccionip,()=>{
    console.log('server on port:',puerto,' IP:',direccionip);
})