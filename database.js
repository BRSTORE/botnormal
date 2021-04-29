var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var id = process.env.MONGOID;
var senha = process.env.SENHA;
mongoose
  .connect(`mongodb+srv://${id}:${senha}@cluster0-4btv3.azure.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function() {
    console.log("Banco de dados foi ligado");
  })
  .catch(function() {
    console.log("Banco de dados desligado por erro");
  });

var User = new Schema({
  _id: { type: String, required: true }, // ID Do Usuário
  level: { type: Number, default: 1 }, // Rank do Usuário
  xp: { type: Number, default: 0 }, // Xp do Usuário
  daily: { type: Number, default: 0 }, //cooldown para o daily
  event: { type: Number, default: 0 }, //cooldown para o evento sexta 13
  cooldownXp: { type: Number, default: 0 }, //cooldown para ganhar XP
  coins: { type: Number, default: 0 }, // Dinheiro do Usuário
  rep: { type: Number, default: 0 }, // Reputação
  repcooldown: { type: Number, default: 0 }, //cooldown para reputação
  teste: { type: Number, default: 0 },
  cooldownPick: { type: Number, default: 0 }, 
  house: { type: String, default: null }, //hypesquad
  localeMap:{ type: String, default: "kingdom" }
});

var Users = mongoose.model("Users", User);
exports.Users = Users;
