const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const content = args.join(" ");

  if (
    !message.member.roles.cache.some(r =>
      [
        "634558987819548673",
        "604901740940230694",
        "602616263218561024"
      ].includes(r.id)
    )
  ) {
    await message.channel.send(
      "**`" +
        message.author.username +
        "`, você precisa de no mínimo `nível 10` para dar Sugestões.**"
    );
  } else if (!args[0]) {
    await message.channel.send(
      "**`" +
        message.author.username +
        "`, escreva a sugestão após o comando.**"
    );
  } else if (content.length > 1000) {
    await message.channel.send(
      "**`" +
        message.author.username +
        "`, forneça um sugestão de no máximo `1000` caracteres**"
    );
  } else {
    var canal = message.guild.channels.cache.find(
      a => a.id === "612477827773759518"
    );
    const msg = await canal.send(
      new Discord.MessageEmbed()
        .setColor("#dc143c")
        .addField("Autor:", message.author)
        .addField("Conteúdo:", content)
        .setFooter("Para sugestões use $$ideia")
        .setTimestamp()
    );
    await message.channel.send(
      "**`" +
        message.author.username +
        "`, sua sugestão foi enviada com sucesso.**"
    );

    const emojis = ["710311641400737965", "718853682497716395"];
    for (const i in emojis) {
      await msg.react(emojis[i]);
    }
  }
};

module.exports.help = () => {
  return {
    name: "suggestion",
    info: "comando para dar sugestões no servidor",
    restrict: false
  };
};
