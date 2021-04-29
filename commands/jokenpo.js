const Discord = require("discord.js");
const Database = require("../database.js");

exports.run = async (client, message, args) => {
  const rng = Math.floor(Math.random() * 99 + 1);

  let player = await Database.Users.findOne({
    _id: message.author.id
  });

  if (player.coins < 20) {
    const embedA = new Discord.MessageEmbed()
      .setDescription(
        `**${message.author.username}**, seu saldo é insuficiente caso perca.`
      )
      .setColor(5132672);
    return message.channel.send(embedA);
  }

  if (args[0] === "pedra" && rng > 0 && rng <= 34) {
    return message.channel.send(
      `**Pedra**, empatamos! **${message.author.username}**, ninguém ganhou nada.`
    );
  } else if (args[0] === "pedra" && rng > 34 && rng <= 67) {
    player.coins -= 20;
    player.save();
    return message.channel.send(
      `**Papel**, você perdeu! **${message.author.username}**, passa pra cá **¥20yen**`
    );
  } else if (args[0] === "pedra" && rng > 67 && rng <= 100) {
    player.coins += 20;
    player.save();
    return message.channel.send(
      `**Tesoura**, eu perdi! **${message.author.username}**, aqui está seus **¥20yen**`
    );
  } else if (args[0] === "papel" && rng > 0 && rng <= 34) {
    return message.channel.send(
      `**Papel**, empatamos! **${message.author.username}**, ninguém ganhou nada.`
    );
  } else if (args[0] === "papel" && rng > 34 && rng <= 67) {
    player.coins -= 20;
    player.save();
    return message.channel.send(
      `**Tesoura**, você perdeu! **${message.author.username}**, passa pra cá **¥20yen**`
    );
  } else if (args[0] === "papel" && rng > 67 && rng <= 100) {
    player.coins += 20;
    player.save();
    return message.channel.send(
      `**Pedra**, eu perdi! **${message.author.username}**, aqui está seus **¥20yen**`
    );
  } else if (args[0] === "tesoura" && rng > 0 && rng <= 34) {
    return message.channel.send(
      `**Tesoura**, empatamos! **${message.author.username}**, ninguém ganhou nada.`
    );
  } else if (args[0] === "tesoura" && rng > 34 && rng <= 67) {
    player.coins -= 20;
    player.save();
    return message.channel.send(
      `**Pedra**, você perdeu! **${message.author.username}**, passa pra cá **¥20yen**`
    );
  } else if (args[0] === "tesoura" && rng > 67 && rng <= 100) {
    player.coins += 20;
    player.save();
    return message.channel.send(
      `**Papel**, eu perdi! **${message.author.username}**, aqui está seus **¥20yen**`
    );
  } else if (
    !args[0] ||
    args[0] !== "pedra" ||
    args[0] !== "papel" ||
    args[0] !== "tesoura"
  ) {
    const embedB = new Discord.MessageEmbed()
      .setDescription(
        "**Escreva `pedra`, `papel`, ou `tesoura` na frente do comando. Caso vença, você ganha `20 Papisgold`; Se perder uma partida, então eu ganho `20 Papisgold`! Se der empate ninguém ganha ou perde nada.**"
      )
      .setColor(5132672);
    return message.channel.send(embedB);
  }
};
