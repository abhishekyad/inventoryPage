const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs"); 
const file="./client/src/database.json";

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get('/product/:id', (req, res) => {
  var id =parseInt(req.params.id)
  var newProduct=res.body;
  var data=fs.readFileSync(file);
  const list=JSON.parse(data);
  const result=list.find(item=>item.id === id);
  if(result)
  res.json(result);
  else 
  res.json("ID not found"); 
});

app.put('/productUpdate/:id',(req,res) =>{
  var id=parseInt(req.params.id);
  var data=fs.readFileSync(file);
  const list=JSON.parse(data);
  var d=JSON.stringify(req.body).split(':');
  var a=d[0].slice(2,-1);
  var b=d[1].slice(1,-2);
    console.log(a);  console.log(b);
  const product=list.findIndex(item => item.id ===id);
  if (product === -1) {
    return res.status(404).send('Item not found');
  }
  var prod = list.find(item =>item.id==id)
  prod={...prod, [a]:b}
  list.splice(product, 1);
  list.push(prod);
  fs.writeFile(file, JSON.stringify(list), (err) => {
    if (err) throw err;
    console.log("New data added");
  }); 
  res.json(prod);
});

app.delete('/product/:id',(req,res) =>{
  var id=parseInt(req.params.id);
  var data=fs.readFileSync(file);
  const list=JSON.parse(data);
  const product=list.findIndex(item => item.id ===id);
  if (product === -1) {
    return res.status(404).send('Item not found');
  }
  list.splice(product, 1);
  fs.writeFile(file,JSON.stringify(list),(err) => {
    if (err) throw err;
    console.log("New data added");
  });
  res.json({});
});

app.post('/newProduct', (req, res) => {
  const newProduct=req.body;
  var data1=JSON.parse(fs.readFileSync(file));
  for (var i = data1.length - 1; i >= 0; i--) {
    if(data1[i].id==newProduct.id)
      res.send("Product with given ID exists");
  }
  data1.push(newProduct);
  fs.writeFile(file, JSON.stringify(data1), (err) => {
    if (err) throw err;
    console.log("New data added");
  });
  res.send("New Product Added"); 
});


