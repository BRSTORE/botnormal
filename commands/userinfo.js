const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
  const user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;
  let target =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.author;

if (!user) {
  let embedNoUser = new Discord.MessageEmbed()
    .setColor("#dc143c")
    .setDescription('**~`' + message.author.username + '` não foi possível encontrar o usuário `' + args.join(" ") + '`**')
  message.channel.send(embedNoUser);
} else {
  let embed = new Discord.MessageEmbed()
    .setThumbnail(
      user.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
    )
    .setColor("#dc143c")
    .addField("Username", `${user.user.tag}`, true)
    .addField("ID", user.user.id, true)
    .addField(
      "Conta Criada em:",
      moment.utc(user.user.createdAt).format("DD/MM/YYYY - hh:mm:ss")
    )
    //   .addField("Entrada no Servidor:", moment.utc(user.guild.joinedAt).format("DD/MM/YYYY - hh:mm"))
    .addField(
      "Entrada no Servidor:",
      `${moment(message.guild.member(user.user.id).joinedAt).format(
        "DD/MM/YYYY - hh:mm:ss"
      )}`
    )
    .setFooter(`Informações sobre ${user.user.username}`)
    .setTimestamp();
    message.channel.send(embed);
  }
};

module.exports.help = () => {
  return {
    name: "userinfo",
    info: "verifica as informações de algum usuário.",
    restrict: false
  };
};
