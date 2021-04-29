const Discord = require("discord.js");
const Database = require("../database.js");

module.exports.run = async (client, message, args) => {
  
  let color = '#dc143c';
  if (message.member.roles.cache.some(role => role.id === '711633611111268363')) { //Bril
  color = '#f67b63'
  } else if (message.member.roles.cache.some(r => r.id === "711603048643821641")) { //bal
  color = '#3adec0'
  } else if (message.member.roles.cache.some(r => r.id === "711600216704548956")) { //brav
  color = '#9c81f2'
  };

  Database.Users.findOne({ _id: message.author.id }, (err, user) => {
    if (err) throw err;

    if (user) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription("<:goldbars:737496534068887613> **Saldo:" + ' `' + user.coins.toLocaleString().replace(",", ".")+ '`**', true)
        .setColor(color)

      message.channel.send(embed);
    }
  });
};

module.exports.help = () => {
  return {
    name: "balance",
    info: "mostra o saldo de gold de um usuário.",
    restrict: false
  };
};
