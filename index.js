const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./src/models");
const user = db.user;
const rocket = db.rocket;
// db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    initial();
});

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

function initial() {
  // user.create({
  //   id:1,
  //   nom:"NOM1",
  //   prenom:"PRENOM1"
  // });
  // user.create({
  //   id:2,
  //   nom:"NOM2",
  //   prenom:"PRENOM2"
  // });
  // user.create({
  //   id:3,
  //   nom:"NOM3",
  //   prenom:"PRENOM3"
  // });

  rocket.create({
    id:1,
    nom:"ARIANE5",
    annee_fab:1985-01-01,
    organisation:"ARIANESPACE",
    destination:"Station ISS"
  });
  rocket.create({
    id:2,
    nom:"SOUYOUZ",
    annee_fab:"1975-01-01",
    organisation:"URSS",
    destination:"Station ISS"
  });
  rocket.create({
    id:3,
    nom:"FALCON9",
    annee_fab:"2007-01-01",
    organisation:"SPACEX",
    destination:"Station ISS"
  });
  rocket.create({
    id:4,
    nom:"STARSHIP",
    annee_fab:"2035-01-01",
    organisation:"SPACEX",
    destination:"MARS"
  });
  rocket.create({
    id:5,
    nom:"APOLLO11",
    annee_fab:"1969-01-01",
    organisation:"NASA",
    destination:"LUNE"
  });
  rocket.create({
    id:6,
    nom:"VOSTOK1",
    annee_fab:"1961-01-01",
    organisation:"URSS",
    destination:"VOLSPATIAL"
  });
  rocket.create({
    id:7,
    nom:"VEGA",
    annee_fab:"2012-01-01",
    organisation:"ARIANESPACE",
    destination:"VOLSPATIAL"
  });
  rocket.create({
    id:8,
    nom:"SPOUTNIK1",
    annee_fab:"1957-01-01",
    organisation:"URSS",
    destination:"VOLSPATIAL"
  });
}

require('./src/routes/post.routes')(app);
require('./src/routes/rocket.routes')(app);


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to our application." });
  });

  
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});