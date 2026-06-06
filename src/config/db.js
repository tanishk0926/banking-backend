const mongoose = require("mongoose");
const dns  = require("dns")
dns.setServers(["1.1.1.1" , "8.8.8.8"]);
async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
    } catch (err) {
    console.log("Error connecting to DB");
    console.error(err);
    process.exit(1);
}
}

module.exports = connectToDB;