const Discord = require("discord.js");
const database = require("../database.js");
const ms = require("ms");
exports.run = async (client, message, args) => {
  const amount = Math.floor(Math.random() * 499 + 1);

  let documento = await database.Users.findOne({ _id: `${message.author.id}` });

  if (1000 * 60 * 60 * 20 - (Date.now() - documento.daily) <= 0) {
    documento.coins += amount;
    documento.daily = Date.now();
    documento.save();

    message.channel.send(
      "<:barras:732045043031867465> **┃ " +
        message.author.username +
        ", `" +
        amount +
        " Papisgold` foram adicionados ao seu saldo.**"
    );
  } else {
    message.channel.send(
      `<a:coins:632669523769688074> ┃ ${
        message.author
      }, você precisa esperar, os dailys só podem ser coletados a cada **20h**. Falta **${ms(
        72000000 - (Date.now() - documento.daily)
      )}** para que você possa coletar novamente.`
    );
  }
  /*
  message.channel.send(
    `${mssage.author}, **Este comando foi desabilitado temporariamente.**`
  );
  */
};

module.exports.help = () => {
  return {
    name: "daily",
    info: "pegar recompensa diária. [desativado]",
    restrict: false
  };
};
