const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(() => { console.log("Connection Successful") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let manyChats = [{
    from: "Aman Verma",
    to: "Dream Girl",
    message: "Hi! I am Aman Verma.",
    time: new Date()
},
{
    from: "Dream Girl",
    to: "Aman Verma",
    message: "Hi! I am Dream Girl.",
    time: new Date()
},
{
    from: "Beautiful Dream Girl",
    to: "Aman Verma",
    message: "Hi! I am Beautiful Dream Girl.",
    time: new Date()
},
{
    from: "Most Beautiful Dream Girl",
    to: "Aman Verma",
    message: "Hi! I am Most Beautiful Dream Girl.",
    time: new Date()
},
{
    from: "Most Most Beautiful Dream Girl",
    to: "Aman Verma",
    message: "Hi! I am Most Most Beautiful Dream Girl.",
    time: new Date()
}];

Chat.insertMany(manyChats);