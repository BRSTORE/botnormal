const Discord = require("discord.js");
const database = require("../database.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      "você é fraco! lhe falta permissão para usar este comando."
    );

  let user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!user)
    return message.reply("por favor mencione um membro válido deste servidor");
  let documento = await database.Users.findOne({ _id: `${user.id}` });
  if (!documento) return message.reply("este usuário não está cadastrado na database.");
  const addxp = parseInt(args[1]);
  if (!addxp)
    return message.reply("forneça um número de XP a ser atribuído ao usuário.");
  if (addxp > 0) {
    documento.xp += addxp;
    documento.save();

    message.channel.send(`${addxp} foram adicionados à barra de XP de **${user.user.tag}**.`);
  }
};

module.exports.help = () => {
  return {
    name: "addxp",
    info: "addxp para usuários.",
    restrict: true
  };
};
