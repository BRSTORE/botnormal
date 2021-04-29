const Discord = require("discord.js");
const database = require("../database.js");
const ms = require("ms");

exports.run = async (client, message, args) => {
  let user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!user)
    return message.reply(
      "**lembre-se de mencionar um membro válido do servidor.**"
    );

  if (user.id == message.author.id)
    return message.reply(
      "**você não pode dar reputações a si mesmo, engraçadinho!**"
    );

  let documento1 = await database.Users.findOne({ _id: `${user.id}` });
  let documento2 = await database.Users.findOne({
    _id: `${message.author.id}`
  });

  if (1000 * 60 * 60 * 20 - (Date.now() - documento2.repcooldown) < 0) {
    documento1.rep += 1;
    documento2.repcooldown = Date.now();
    documento1.save();
    documento2.save();

    await message.channel.send(
      `**~${user}** você ganhou um ponto de reputação de **${message.author}!** <:rep:737870629880987749>`
    );
  } else {
    message.channel.send(
      `${
        message.author
      }, você precisa esperar, as reputações só podem ser oferecidas a cada **20h**. Faltam **${ms(
        72000000 - (Date.now() - documento2.repcooldown)
      )}** para que você possa dar reputação novamente.`
    );
  }
};

module.exports.help = () => {
  return {
    name: "rep",
    info: "dar um ponto de rep para alguem.",
    restrict: false
  };
};
