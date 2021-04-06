const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { registerValidation } = require("./validation");
const express = require("express");
const mongoose = require("mongoose");

require("./models/User");
const User = mongoose.model("user");

const app = express();

app.use(express.json());

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
  
    var { name, email, telefone, linkedin, cidade, portfolio, salario } = req.body;

    var user = {
      name: name,
      email: email,
      telefone: telefone,
      linkedin: linkedin,
      cidade: cidade,
      portfolio: portfolio,
      salario: salario
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

app.listen(8080, () => {
    console.log("Server up and run in 8080: http://localhost:8080");
});