const Discord = require("discord.js");
const locales = require("../locales.json");
const database = require("../database.js");
const ms = require("ms");

exports.run = async (client, message, args) => {
  let documento = await database.Users.findOne({ _id: `${message.author.id}` });
  let localePlayer = documento.localeMap;
  if (locales.identifier[localePlayer].pick != true) {
  const embedNopPick = new Discord.MessageEmbed()
        .setColor(locales.content[localePlayer].embed.color)
        .setDescription("**`~" + message.author.username + "` sua localização não permite mineração.** " + locales.identifier[localePlayer].emojiMention);
      return message.channel.send(embedNopPick);
  } else {
   if (message.channel.id !== "602011779379363840") {
    let embedChannel = await new Discord.MessageEmbed()
      .setColor("#dc143c")
      .setDescription(
        "<a:crossmark:718853682497716395> **`" +
          message.author.username +
          "` minere apenas em** <#602011779379363840>"
      );
    return message.channel.send(embedChannel);
  } else if (1000 * 60 * 60 * 5 - (Date.now() - documento.cooldownPick) > 0) {
    return message.channel.send(
      `**${
        message.author.username
      }**, você precisa esperar, você só pode minerar a cada **5h**. Faltam **${ms(
        1000 * 60 * 60 * 5 - (Date.now() - documento.cooldownPick)
      )}** para que você possa minerar novamente.`
    );
  } else if (
    !message.member.roles.cache.some(r =>
      ["610503517865771028", "604901740940230694"].includes(r.id)
    )
  ) {
    documento.xp += 30;
    documento.coins += 50;
    documento.cooldownPick = Date.now();
    documento.save();
    let embedNoVip = await new Discord.MessageEmbed()
      .setColor("#dcdcdc")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setThumbnail("https://imgur.com/CYVUVFR.png")
      .setDescription(
        "<:picareta:723070335057920071> **+30 de XP minerados!**\n<:barras:732045043031867465> **+50 `Papisgold` minerados!**"
      )
      .setFooter("Ice Cream ┃ I Scream");
    return message.channel.send(embedNoVip);
  } else {
    documento.xp += 300;
    documento.coins += 500;
    documento.cooldownPick = Date.now();
    documento.save();
    let embedVip = await new Discord.MessageEmbed()
      .setColor("#ffd700")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setThumbnail("https://imgur.com/yLjzLJN.png")
      .setDescription(
        "<:picareta:723070335057920071> **+300 de XP minerados!**\n<:barras:732045043031867465> **+500 `Papisgold` minerados!**"
      )
      .setFooter("Ice Cream ┃ I Scream");
    return message.channel.send(embedVip);
    }
  }
};

module.exports.help = () => {
  return {
    name: "pick",
    info: "minerar xp e gold.",
    restrict: false
  };
};
