//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology: true})
.then((e)=>{
  console.log(e);
})
const itemsSchema={
  name:String
};
const Item =mongoose.model("Item",itemsSchema);
// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
const item1=new Item({
  name:"Welcome"
});
const item2=new Item({
  name:"Welcome 2"
});
const item3=new Item({
  name:"Welcome 3"
});
const defaultItems = [item1.name,item2.name,item3.name];
Item.insertMany(defaultItems,function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Success");
  }
})
app.get("/", function(req, res) {



  res.render("list", {listTitle: "Today", newListItems: defaultItems});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    defaultItems.push(item);
    res.redirect("/work");
  } else {
    defaultItems.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
