const Discord = require("discord.js");
const database = require("../database.js");

exports.run = (client, message) => {
  var usuarios = [];
  var num = 0;

  database.Users.find({}, function(erro, documento, user) {
    database.Users.findOne(
      {
        _id: message.author.id
      },
      function(err, usu) {
        if (usu) {
          documento
            .filter(a => message.guild.members.cache.get(a._id))
            .map(a =>
              usuarios.push({
                user: a._id,
                coins: a.coins
              })
            );
          usuarios.sort(function(a, b) {
            return b.coins - a.coins;
          });

          var moneytop = usuarios
            .map(
              a =>
                "**`" +
                (num += 1) +
                "`** **-** `" +
                client.users.cache.get(a.user).username +
                "` \n**" +
                Number(a.coins).toLocaleString() +
                " Papisgold.**"
            )
            .slice(0, 10)
            .join("\n");

          const embed = new Discord.MessageEmbed()
            .setTitle("Top Money")
            .setThumbnail("https://imgur.com/GjSUD13.png")
            .setDescription(moneytop)
            .setColor("#9c84ef")
            .setTimestamp()
            .setFooter(
              `Seus Papisgold: ${Number(usu.coins).toLocaleString()}`,
              message.author.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 1024
              })
            );
          message.channel.send(embed);
          /* message.channel.send({
          'embed': {
            'title': `:moneybag: TOP Money:`,
            'description': `${moneytop}`,
            'color': 'RANDOM',
            'timestamp': new Date(),
            'footer': {
              'icon_url': message.author.displayAvatarURL,
              'text': `Sua pontuação: ${Number(usu.level).toLocaleString()} level.`
            }
          }
        })
				*/
        } else {
          message.channel.send(
            ":x: **Ocorreu um erro ao executar este comando.**"
          );
        }
      }
    );
  });
};
exports.help = {
  name: "topmoney",
  aliases: ["topmoney", "moneytop"]
};
