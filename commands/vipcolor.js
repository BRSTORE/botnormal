const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (
    !message.member.roles.cache.some(r =>
      [
        "610503517865771028",
        "604901740940230694",
        "610503387410071575",
        "608328060701376514",
        "610503142173442059",
        "608328083002490890",
        "644572492261883934",
        "602616263218561024",
		"755290711707877427",
		"755290711707877428",
		"744392452005429258"
      ].includes(r.id)
    )
  ) {
    const embedA = new Discord.MessageEmbed()
      .setColor("#4cd8b2")
      .setDescription(
        `${message.author}***, você é fraco! lhe falta cargos Vips.***`
      );
    await message.channel.send(embedA);
  } else if (!args[0]) {
    const embedB = new Discord.MessageEmbed()
      .setColor("#4cd8b2")
      .setDescription(
        "**Passo 1:** escolha uma das cores disponíveis no chat de #》💎cores-especiais.\n**Passo 2:** use o comando `$$vipcolor` e escreva o nome da cor desejada na frente."
      )
      .setFooter("Exemplo: $$vipcolor branco");
    await message.channel.send(embedB);
  } else {
    let colors = message.guild.roles.cache.filter(role =>
      role.name.startsWith("♢")
    );

    let str = args.join(" ");
    let role = colors.find(
      role => role.name.slice(1).toLowerCase() === str.toLowerCase()
    );

    if (!role) {
      const embedC = new Discord.MessageEmbed()
        .setColor("#4cd8b2")
        .setDescription(
          "***Não existem cores especiais com o nome `" +
            str +
            "` no servidor.***"
        );
      return await message.channel.send(embedC);
    }
    var colorEmbed = role.color;
    if (str.toLowerCase() === "white") {
      colorEmbed = "#FFFFF1";
    }
    try {
      await message.member.roles.remove(colors, "Removendo outras cores do usuário com comando $$vipcolor");
      await message.member.roles.add(role);
      const embedD = new Discord.MessageEmbed()
        .setColor(colorEmbed)
        .setDescription(`***Agora você ganhou a cor*** ${role}***.***`);
      return await message.channel.send(embedD);
    } catch (e) {
      message.channel.send(`**Algo deu errado:** ${e.message}`);
    }
  }
};
