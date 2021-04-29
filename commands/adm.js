const Discord = require("discord.js");
const database = require("../database.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      "você é fraco! lhe falta permissão para usar este comando."
    );

	client.user.setAvatar("./staff.png").catch(err => console.log(err));
};

module.exports.help = () => {
  return {
    name: "adm",
    info: "comando de testes.",
    restrict: true
  };
};
