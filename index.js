const express = require('express');
const app = express();
app.set('port',process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"); 

app.get('/',(req,res)=>{
    res.send('index page');
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
app.listen(app.get('port'),app.get('ip'),()=>{
    console.log('server on port: ',app.get('port'),' IP:',app.get('ip'));
})