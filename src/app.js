const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { registerValidation } = require("./validation");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("./models/User");
const User = mongoose.model("user");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
});

app.use(cors());

mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})

app.post("/register", async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");
  
    var { name, email, telefone, linkedin, cidade, portfolio, disponibilidade, horario,  salario, ionic} = req.body;

    var user = {
      name: name,
      email: email,
      telefone: telefone,
      linkedin: linkedin,
      cidade: cidade,
      portfolio: portfolio,
      disponibilidade: disponibilidade,
      horario: horario,
      salario: salario,
      ionic: ionic
    };
    var user = User.create(user, (err) => {
      if (err)
        return res.status(400).json({
          error: true,          
          message: err,
        });
      return res.status(200).json({
        error: false,
        message: "acepted",
      });
    });
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ uuid: id });
  console.log(user);
  return res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, telefone, linkedin, cidade, portfolio, disponibilidade, horario, salario, ionic} = req.body;
  const update = {
    name: name,
    email: email,
    telefone: telefone,
    linkedin: linkedin,
    cidade: cidade,
    portfolio: portfolio,
    disponibilidade: disponibilidade,
    horario: horario,
    salario: salario,
    ionic: ionic
  };
  let user = await User.findOneAndUpdate({ uuid: id }, update);
  console.log(user);
  return res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  User.findOne({ uuid: id }).deleteOne().exec();  
  return res.status(204).send();
});

app.listen(8080, () => {
    console.log("Server up and run in 8080: http://localhost:8080");
});