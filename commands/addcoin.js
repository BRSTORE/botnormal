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
  const addc = parseInt(args[1]);
  if (!addc)
    return message.reply("forneça uma quantidade a ser atribuída ao saldo do usuário.");
  if (addc > 0) {
    documento.coins += addc;
    documento.save();

    message.channel.send(`${addc} foram adicionados ao saldo de **${user.user.tag}**.`);
  }
};

module.exports.help = () => {
  return {
    name: "addcoin",
    info: "addcoin para usuários.",
    restrict: true
  };
};
