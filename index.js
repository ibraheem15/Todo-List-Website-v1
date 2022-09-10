//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const { render } = require("ejs");

let port = process.env.PORT;

const app = express();
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

const day = require(__dirname + "/date.js");

const _ = require("lodash");

const mongoose = require("mongoose");

//Set up default mongoose connection
const url =
  "mongodb+srv://{username}:{password}@cluster0.qcanqcf.mongodb.net/todolistDB";
mongoose.connect(url, { useNewUrlParser: true });

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "DO HomeWork",
});
// item1.save();

const item2 = new Item({
  name: "TeethBrush",
});
// item2.save();

const item3 = new Item({
  name: "Shampoo",
});
// item3.save();

const arrayItems = [item1, item2, item3];

const CustomSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});
// Compile model from schema
const List = mongoose.model("List", CustomSchema);

//----------HOMEPAGE Item LIST---------

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(arrayItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Succesful");
        }
      });
      res.redirect("/");
    } else {
      res.render("lists", {
        list_title: "Today",
        items: foundItems,
      });
    }
  });
  // res.send();
});

//----------HOMEPAGE Addition---------

app.post("/", function (req, res) {
  var itemText = req.body.NewItem;
  var listName = req.body.lists;

  const item1 = new Item({
    name: itemText,
  });

  if (listName === "Today") {
    item1.save();
    res.redirect("/");
  }
  //----------CUSTOM LIST Addition---------
  else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item1);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

//------------DELETION-----------

app.post("/delete", function (req, res) {
  const deleteID = req.body.checkbox;
  var listName = req.body.listname;

  if (listName === "Today") {
    Item.findByIdAndRemove(deleteID, function (err) {
      //for deletion of default list on HomePage
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted");
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate(
      //finding the item and removing it
      { name: listName },
      { $pull: { items: { _id: deleteID } } }, //to remove the item from the array of items
      function (err) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

//----------CUSTOM LIST----------

app.get("/:customListName", function (req, res) {
  var customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, function (err, foundlist) {
    if (!err) {
      if (!foundlist) {
        //Create New List
        const list = new List({
          name: customListName,
          items: arrayItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show the Previous made List
        res.render("lists", {
          list_title: foundlist.name,
          items: foundlist.items,
        });
      }
    }
  });
});

app.post("/work", function (req, res) {
  var item = req.body.NewItem;
  work_list.push(item);
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render("about");
});

if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
