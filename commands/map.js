const Discord = require("discord.js");
const locales = require("../locales.json")
const Database = require("../database.js");
const { MessageEmbed } = require("discord.js");


exports.run = async (client, message, args) => {
  let player = await Database.Users.findOne({
    _id: message.author.id
  });
  let localePlayer = player.localeMap;
  var principalLocale = locales.content[localePlayer]; 
  let sender = message.author;
  let gMapLink = 'https://imgur.com/SCbhNef.png';

  var msg = await message.channel.send(principalLocale);

  const emoji = [
    "736935988819001390", // Local Map
    "736935989175386144" // Global Map
  ];

  for (const i in emoji) {
    await msg.react(emoji[i]);
  }

  const filter = (r, u) => r.me && u.id === sender.id;
  const collector = msg.createReactionCollector(filter, {
    max: 10,
    time: 60 * 1000
  });
  collector.on("collect", async r => {
    switch (r.emoji.id) {
      case "736935988819001390":
        await msg.edit(principalLocale);
        r.users.remove(sender.id);
        break;

      case "736935989175386144":
        await msg.edit(
          new MessageEmbed()
            .setColor("#dc143c")
            .setTitle('Mapa Global')
            .addField(
              "<:kingdom:736943559516880926> Aiskream Kingdom.",
              "**`Reino livre de monstros. Recupere suas energias aqui.`**"
            )
            .addField(
              "<:floresta:736937216814612491> Floresta.",
              "**`Local habitado por monstros de level baixo como Slimes.`**"
            )
            .addField(
              "<:mine:737541286143197184> Mina Abandonada.",
              "**`Antigo local de mineração devastado por monstros.`**"
            )
            .setFooter(`Sua posição: ${locales.content[localePlayer].embed.title}`, gMapLink)
        );
        r.users.remove(sender.id);
        break;
    }
  });
};
