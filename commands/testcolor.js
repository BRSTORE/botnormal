const Discord = require("discord.js");
const colorsArray = require("../colors.json");
const Database = require("../database.js");

module.exports.run = async (client, message, args) => {
  var str = args.join(" ");
  var price = colorsArray.cores[str.toLowerCase()];
  var colors = message.guild.roles.cache.filter(role =>
    role.name.startsWith("♢")
  );
  var role = colors.find(
    role => role.name.slice(1).toLowerCase() === str.toLowerCase()
  );

  let buyer = await Database.Users.findOne({
    _id: message.author.id
  });
  if (!args[0]) {
    const embedB = new Discord.MessageEmbed()
      .setColor("#4cd8b2")
      .setDescription(
        "**Passo 1:** escolha uma das cores disponíveis no chat de <#602006904801329172>.\n**Passo 2:** use o comando `$$color` e escreva o nome da cor desejada na frente."
      )
      .setFooter("Exemplo: $$color preto");
    await message.channel.send(embedB);
  } else if (!price) {
    const embedNop = new Discord.MessageEmbed()
      .setColor("#4cd8b2")
      .setDescription(
        "**`" + str + "` não é uma poção de cor possível de se comprar.**"
      );
    return message.channel.send(embedNop);
  } else if (!role) {
    const embedC = new Discord.MessageEmbed()
      .setColor("#4cd8b2")
      .setDescription(
        "***Não existem cores especiais com o nome `" +
          str +
          "` no servidor.***"
      );
    return await message.channel.send(embedC);
  } else {
    const embedConfirm = new Discord.MessageEmbed()
      .setColor(role.color)
      .setDescription(
        "**~`" +
          message.author.username +
          "` escreva `Sim` para testar essa cor.**"
      );
    message.channel.send(embedConfirm);

    message.channel
      .awaitMessages(m => m.author.id == message.author.id, {
        max: 1,
        time: 30000
      })
      .then(async collected => {
        if (collected.first().content.toLowerCase() === "sim") {

          //await message.member.roles.remove(colors);
          await message.member.roles.add(role);
          const embedD = new Discord.MessageEmbed()
            .setColor(role.color)
            .setDescription('**~`'+ message.author.username + '` a cor** ' + `${role}` + ' **será removida daqui `20 segundos`.**');
          await message.channel.send(embedD);
        setTimeout(async function(){ 
          await message.member.roles.remove(role); 
        }, 20000);
        } else {
          return message.channel.send(
            "**Teste rejeitado pelo usuário.**"
          );
        }
      })
      .catch(() => {
        message.channel.send(
          "**Nenhuma resposta fornecida, cancelando operação...**"
        );
      });
  }
};
