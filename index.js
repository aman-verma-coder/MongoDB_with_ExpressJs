const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
var methodOverride = require('method-override');
const { channel } = require("diagnostics_channel");
const e = require("express");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

main()
    .then(() => { console.log("Connection Successful") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/", (req, res) => {
    res.send("Response received");
})

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });
})

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/chats", (req, res) => {
    let { from, to, message } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        time: new Date()
    })
    newChat.save()
        .then(() => { console.log("New Chat added") })
        .catch((err) => { console.log(err) });
    res.redirect("http://localhost:8080/chats");
})

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    // console.log(`Editing ID: ${id}`);
    let editChat = await Chat.findById(id);
    // console.log(editChat);
    res.render("edit.ejs", { editChat });
})

app.patch("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    let { message } = req.body;
    // console.log(message);
    let updateChat = await Chat.findByIdAndUpdate(id, { message: message, time: new Date() }, { runValidators: true }, { new: true });
    // console.log(`Updated Chat:${message}`);
    console.log(`Chat Edited`);
    res.redirect("http://localhost:8080/chats");
})

app.delete("/chats/:id/delete", async (req, res) => {
    let { id } = req.params;
    // console.log(`Deleting ID: ${id}`);
    console.log(`Chat Deleted`);
    await Chat.findByIdAndDelete(id);
    res.redirect("http://localhost:8080/chats");
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})

// let manyChats = [{
//     from: "Aman Verma",
//     to: "Dream Girl",
//     message: "Hi! I am Aman Verma.",
//     time: new Date()
// },
// {
//     from: "Dream Girl",
//     to: "Aman Verma",
//     message: "Hi! I am Dream Girl.",
//     time: new Date()
// },
// {
//     from: "Beautiful Dream Girl",
//     to: "Aman Verma",
//     message: "Hi! I am Beautiful Dream Girl.",
//     time: new Date()
// },
// {
//     from: "Most Beautiful Dream Girl",
//     to: "Aman Verma",
//     message: "Hi! I am Most Beautiful Dream Girl.",
//     time: new Date()
// },
// {
//     from: "Most Most Beautiful Dream Girl",
//     to: "Aman Verma",
//     message: "Hi! I am Most Most Beautiful Dream Girl.",
//     time: new Date()
// }];

// Chat.insertMany(manyChats);