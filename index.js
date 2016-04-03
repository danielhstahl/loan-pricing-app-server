var WebSocket = require('ws').Server;
var wss = new WebSocket({ port: 9003 });



var calculators={
  PD:function(vals){ //out of 100
    var pd=100;
    if(vals.income>0){
      pd=(100-vals.score/12)+(vals.balance/vals.income);
    }
    return pd>100?100:pd;
  },
  LGD:function(vals){
    var lgd=100;
    if(vals.collateral>0){
      lgd=vals.balance/vals.collateral;
      lgd=lgd*100;
    }
    return lgd;
  },
  EAD:function(vals){
    return 50;//might as well
  },
  M:function(vals){
    return (vals.term/60)*100;
  },
  LIQ:function(vals){
    return 50;
  }
}
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
    console.log(message);
    var val=JSON.parse(message);
    var calculate={};
    for(key in calculators){
      calculate[key]=calculators[key](val);
    }
    console.log(calculate);
    ws.send(JSON.stringify(calculate));

  });
  //ws.send('something');
});
