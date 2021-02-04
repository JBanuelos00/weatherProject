const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
  res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
  const query = req.body.cityName;
  const units = "imperial";
  const apiKey = "235402aa2c0ae6d8712c89cd9e31a166";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey ;

  https.get(url, (response) =>{
    console.log(response.statusCode);

    response.on('data', (data) =>{
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in" + query + " is " + temp + " degrees Farenheit</h1>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
})

app.listen(port, function() {
  console.log(`Server is running on port ${port}`)
})
