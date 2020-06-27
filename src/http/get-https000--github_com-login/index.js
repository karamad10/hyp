let arc = require("@architect/functions");
let data = require("@begin/data");
let express = require("express");
let axios = require("axios");
let app = express();

let tiny = require("tiny-json-http");

let top = `
<!DOCTYPE html>
<html>
  <head>
    <title> GET Data from Begin.COM!</title>
    <!-- STYLESHEETS -->
    <!-- CSS (load bootstrap from a CDN) -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <!-- LIBRARIES -->
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Bootstrap javascript file -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <!-- Axios javascript file --> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
    <!-- Hyperlink  --> 
    <script src="https://unpkg.com/hyperhtml@latest/min.js"></script>
 
    <!-- fdate  -->
    <script src="https://unpkg.com/fdate@0.0.5/dist/index.min.js"></script> 
      
</head>
  
  <body>
    <style> 
      h4 { background: rgb(37, 27, 168); color: red ; font-style:rosybrown ; font-size: 30px; } 
      h3 { background: white; color: red ; font-style:rosybrown ; font-size: 52px; margin: 2; } 
      body {
        margin: 1;
        margin-left: 30px;
        font-family: "Roboto";
        font-size: 2.5rem;
        font-weight: 507;
        line-height: 2;
        color:  white;
        text-align: left;
        background-color: #367bc4;
    }
    
    </style>
`;

let topAmp = `
<!doctype html>
<html ⚡>
<head>
  <meta charset="utf-8">
  <title>Speak With AMP</title>
  <link rel="canonical" href="self.html" />
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp-custom>
     h3 { background: white; color: red ; font-style:rosybrown ; font-size: 32px; } 
      body {
        margin: 1rem;
        margin-left: 30px;
        font-family: "Roboto";
        font-size: 1.5rem;
        font-weight: 507;
        line-height: 2;
        color:  white;
        text-align: left;
        background-color: #367bc4;
    }
    button{ 
      margin-left: 40px;
      background-color: #ACAD5C; 
      color: white; 
      padding: 12px 40px; 
      border: none; 
      border-radius: 4px; 
      cursor: pointer; 
      float: left;
    }
    </style>
</head>
<body>
`;

let fin = `
       </script>
     </body>
</html>
`;

app.get("/", async (req, res) => {
  //let hh = await ppset()
  console.log("get/");
  /*
  let table = "greetings"
  let key = "Japanese"
  var count = 1
  let greeting = { popo: count } 
  let hh = await data.set({table, key, greeting})
  count ++
  await data.set({table, key, greeting})
  count ++
  await data.set({table, key, greeting})
  greeting = { popo: count++ } 
  await data.set({table, key, greeting})
  console.log(hh)
  console.log(count)
  let doc = await data.get({table, key})
  let doc1 = await data.get({table})
  console.log(doc1)
  // esto no funciona nunca
  //var count = 10
  //let popo =  await data.incr({table, key, count })
  //console.log(popo.count) 
  
   //let doc = await ppget()
 
  */

  console.log("call axios ....");

  /*
async function AskHome(){
  directo y desde casa 
  const response = await axios({
    url: 'http://192.168.0.8',
    method: 'get'
  })
   
  var data = response.data.variables
  console.log(data)
  return data
}*/

  var feeds = [];
  let cant = 30; // ver el ultimo

  async function AskSpeak() {
    let url =
      "https://api.thingspeak.com/channels/991439/feeds.json?api_key=2J9O3IPY9L60S9KW&results=" +
      cant;
    const response = await axios({
      url: url,
      method: "get",
    });

    var data = response.data.feeds[cant - 1];
    feeds = response.data.feeds;
    console.log(data);
    return data;
  }

  //let data =  await AskHome()
  let data = await AskSpeak();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: "false",
  };
  let creado = new Date(data.created_at); //.toLocaleDateString(undefined, options)
  let Fecha = creado.toLocaleDateString(undefined, options);
  //let Fecha = creado.toLocaleDateString(" HH:mm dd/mm/yyyy")
  //let Hora = creado.toLocaleDateString(undefined, { hour: 'numeric'  })

  //let up  = "+" ; let down ="-" ; let eq = "=" ;
  let up = "+",
    down = "-",
    eq = "=";

  var stat = [0, 0, 0, 0, 0],
    sib = [eq, eq, eq, eq, eq];

  function Prom(key) {
    var total = 0;
    feeds.forEach((a) => {
      /*console.log(a[key])*/ total = total + parseFloat(a[key]);
    });
    //console.log( total/cant )
    return total / cant;
  }

  var count = 1;
  stat.forEach((a) => {
    var key = "field" + count;
    //console.log(key)
    a = Prom(key);
    //console.log( a )
    if (a > data[key]) sib[count - 1] = down;
    if (a < data[key]) sib[count - 1] = up;

    count = count + 1;
  });

  let html =
    topAmp +
    `
<button on = "tap:my-lightbox" onclick="getconfig()" >
    ReLoad
</button>
</br>
${sib[0]} TempExt  : ${data.field1} °C </br>
${sib[1]} Humedad  : ${data.field2} % </br>
${sib[2]} TempInt  : ${data.field3} °C </br>
${sib[3]} LDR      : ${data.field4} Lums </br>
${sib[4]} Count    : ${data.field5}</br></br>
------ from TS ----- </br>
Entry    : ${data.entry_id}</br>
Create   : ${Fecha} </br>
Fecha   : ${new Date(data.created_at).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })} 
</br>
    <h3> ZERO PI to ThinksSpeak </h3> 
    <h3> Desde ThinksSpeak  </h3>
    <h3> Con AMP !!!!  </h3> 
   <amp-lightbox id = "my-lightbox" layout = "nodisplay">
      <div class = "lightbox" on = "tap:my-lightbox.close" tabindex = "0">
        <amp-img alt = "Beautiful Flower"
          src = "flower.jpg"
            width = "246"
            height = "205">
         </amp-img>
      </div>
   </amp-lightbox>
    <script>
    function getconfig(){
       location.reload(); 
       //alert("aqui pasara algo .....")
    }
  ` +
    fin;

  // ojo podria tener los ultimo s 100 datos si quisiera o mas ??
  // y hacer un tratamiento estadistico
  // no se cuanto consume en apis estas llamadas ....

  res.send(html);

  //res.send('Hello World!... ' )
});

app.get("/cool", async (req, res) => {
  let gg = "very cool";

  res.send(gg);
});

exports.handler = arc.http.express(app);
