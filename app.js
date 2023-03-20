const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running")
});
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req,res){
    const f_name = req.body.f_name;
    const l_name = req.body.l_name;
    const e_name = req.body.e_name;
    // console.log(f_name, l_name, e_name);
    const data = {
        members: [
            {
                email_address: e_name,
                status: "subscribed",
                merge_fields: {
                    FNAME: f_name,
                    LNAME: l_name
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    const options = {
        method: "POST",
        auth: "abhi8948:kk87b469ec1ea10bba2ce3a7504a392522-us21"
    }
    const url = "https://us21.api.mailchimp.com/3.0/lists/4f3b31cf8e"
    const request = https.request(url, options, function(response){
        console.log(res.statusCode);
        if(response.statusCode == "200")
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req,res){
    res.redirect("/");
});

//mailjet
// https://api.mailjet.com/v3/REST/contactslist/{list_ID}





//chimp
// 4f3b31cf8e.
// 87b469ec1ea10bba2ce3a7504a392522-us21