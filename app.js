const express = require('express');
const app = express();
const config = require('./config/config.js');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

/*app.set('port',process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"); */

app.get('/',(req,res)=>{
    res.json(global.gConfig);
});

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
});

// error handling
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

app.post('/',(req,res)=>{
    res.send('guardando...');
});

app.put('/',(req,res)=>{
    res.send('actualizando...');
});

app.listen(port,ip,()=>{
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
})

module.exports = app ;