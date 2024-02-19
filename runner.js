const express = require("express");
const path = require("path");
const app = express();
// Run React Build Over Express.JS
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Fork
app.listen(4002, function () {
	console.log("ChatBot Running On Port 4002");
});
