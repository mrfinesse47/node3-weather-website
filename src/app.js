const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// nodemon src/app.js -e js,hbs if your editing templates this restarts the server

//define paths for express config

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set up handle bars engine and view location

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//set up static directory to serve ie files just in public
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Kevin Mason" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Kevin Mason" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "a help message",
    title: "help",
    name: "Kevin Mason",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    title: "404",
    name: "Kevin Mason",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
    title: "404",
    name: "Kevin Mason",
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
