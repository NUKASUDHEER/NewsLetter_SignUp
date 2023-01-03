const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
    };
    
    const jsonData = JSON.stringify(data)
    const url = " https://us21.api.mailchimp.com/3.0/lists/b607c8f998";
    const option = {
      method: "POST",
      auth: "nsk:d90ccff0860105905ebdb3003e93e55a-us2",
    };
    const request1= https.request(url, option, (response) => {
        response.on("data", (data) => {
          if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
          } else {
            res.sendFile(__dirname + "/failure.html");
          }
          console.log(JSON.parse(data));
      });
    });

    request1.write(jsonData);
    request1.end();
});



app.post("/failure", (req,res) => {
    res.redirect("/")
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

//  b607c8f998

// d90ccff0860105905ebdb3003e93e55a - us21