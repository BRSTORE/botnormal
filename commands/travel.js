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

  var msg = await message.channel.send(new MessageEmbed()
    .setColor("#dc143c")
    .setTitle('Mapa Global')
    .addField(
      "<:kingdom:736943559516880926> Aiskream Kingdom.",
      "**Custo da viagem - `" + locales.identifier.kingdom.price
      + "`**<:barras:732045043031867465>")
    .addField(
      "<:floresta:736937216814612491> Floresta.",
      "**Custo da viagem - `" + locales.identifier.floresta.price
      + "`**<:barras:732045043031867465>"
    )
    .addField(
      "<:mine:737541286143197184> Mina Abandonada.",
      "**Custo da viagem - `" + locales.identifier.minaAbandonada.price
      + "`**<:barras:732045043031867465>"
    )
    .setFooter(`Sua posição: ${locales.content[localePlayer].embed.title}`, gMapLink));

  const emojis = [
    "736943559516880926", // kingdom
    "736937216814612491", // Floresta
    "737541286143197184"  // Mina Abandonada
  ];

  for (const i in emojis) {
    await msg.react(emojis[i]);
  }

  const filter = (r, u) => r.me && u.id === sender.id;
  const collector = msg.createReactionCollector(filter, {
    max: 1,
    time: 60 * 1000
  });
  collector.on("collect", async r => {
    if (r.emoji.id === locales.identifier[localePlayer].emojiID) {
      message.channel.send("**" + sender.username + " você já está nesse local.**")
    } else if (r.emoji.id === "736943559516880926") {
      if (player.coins < locales.identifier.kingdom.price) {
message.channel.send("**~" + sender.username + " seu saldo é insuficiente para uma travel à `Aiskream Kingdom`**")
      } else {
message.channel.send('**Escreva `viajar` para confirmar a travel para `Aiskream Kingdom` no valor de ' + locales.identifier.kingdom.price + "**<:barras:732045043031867465>")

      message.channel
        .awaitMessages(m => m.author.id == message.author.id, {
          max: 1,
          time: 30000
        })
        .then(async collected => {
          if (collected.first().content.toLowerCase() === "viajar") {
            player.coins -= locales.identifier.kingdom.price;
            player.localeMap = 'kingdom'
            player.save();
            const embedKingdom = new Discord.MessageEmbed()
              .setColor('#00bfff')
              .setDescription("**~" + sender.username + " viajou para `Aiskream Kingdom`** <:kingdom:736943559516880926>");
            return await message.channel.send(embedKingdom);
          } else {
            return message.channel.send(
              "**Viagem não confirmada corretamente. Encerrando travel...**"
            );
          }
        })
        .catch(() => {
          message.channel.send(
            "**Nenhuma resposta fornecida, cancelando travel...**"
          );
        });

      }
      
    } else if (r.emoji.id === "736937216814612491") {
      if (player.coins < locales.identifier.floresta.price) {
message.channel.send("**~" +sender.username + " seu saldo é insuficiente para uma travel à `Floresta`**")
      } else {
      message.channel.send('**Escreva `viajar` para confirmar a travel para a `Floresta` no valor de ' + locales.identifier.floresta.price + "**<:barras:732045043031867465>")

      message.channel
        .awaitMessages(m => m.author.id == message.author.id, {
          max: 1,
          time: 30000
        })
        .then(async collected => {
          if (collected.first().content.toLowerCase() === "viajar") {
            player.coins -= locales.identifier.floresta.price;
            player.localeMap = 'floresta'
            player.save();
            const embedForest = new Discord.MessageEmbed()
              .setColor('#00fa9a')
              .setDescription("**~" + sender.username + " viajou para a `Floresta`** <:floresta:736937216814612491>");
            return await message.channel.send(embedForest);
          } else {
            return message.channel.send(
              "**Viagem não confirmada corretamente. Encerrando travel...**"
            );
          }
        })
        .catch(() => {
          message.channel.send(
            "**Nenhuma resposta fornecida, cancelando travel...**"
          );
        });
      }

    } else if (r.emoji.id === "737541286143197184") {
      if (player.coins < locales.identifier.floresta.price) {
message.channel.send("**~" +sender.username + " seu saldo é insuficiente para uma travel à `Mina Abandonada`**")
      } else {
      message.channel.send('**Escreva `viajar` para confirmar a travel para a `Mina Abandonada` no valor de ' + locales.identifier.minaAbandonada.price + "**<:barras:732045043031867465>")

      message.channel
        .awaitMessages(m => m.author.id == message.author.id, {
          max: 1,
          time: 30000
        })
        .then(async collected => {
          if (collected.first().content.toLowerCase() === "viajar") {
            player.coins -= locales.identifier.floresta.price;
            player.localeMap = 'minaAbandonada'
            player.save();
            const embedMine = new Discord.MessageEmbed()
              .setColor('#934c18')
              .setDescription("**~" + sender.username + " viajou para a `Mina Abandonada`** <:mine:737541286143197184>");
            return await message.channel.send(embedMine);
          } else {
            return message.channel.send(
              "**Viagem não confirmada corretamente. Encerrando travel...**"
            );
          }
        })
        .catch(() => {
          message.channel.send(
            "**Nenhuma resposta fornecida, cancelando travel...**"
          );
        });
      }
    }
  });
};
