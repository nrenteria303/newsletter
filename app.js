const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    // console.log(firstName, lastName, email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us3.api.mailchimp.com/3.0/lists/12e75f1525",
        method: "POST",
        headers: {
            "Authorization": "nick1 5287b714a75d15cd189da35c19009345-us3"
        },
        body: jsonData
    }

    request(options, function(error, response, body) {
        if (error || response.statusCode != 200) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            res.sendFile(__dirname + "/success.html");
        }
    });
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});



// API Key 5287b714a75d15cd189da35c19009345-us3
// List ID 12e75f1525