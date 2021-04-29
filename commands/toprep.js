const Discord = require('discord.js');
const table = require('table');
const database = require('../database.js')

exports.run = (client, message) => {
  var usuarios = []
  var num = 0

  database.Users.find({}, function (erro, documento, user) {
    database.Users.findOne({
      '_id': message.author.id
    }, function (err, usu) {
      if (usu) {
        documento.filter(a => message.guild.members.cache.get(a._id)).map(a => usuarios.push({
          user: a._id,
          rep: a.rep
        }))
        usuarios.sort(function (a, b) {
          return b.rep - a.rep
        })
				

        var reptop = usuarios.map(a => '**`' + (num += 1) + '`** - **`' + client.users.cache.get(a.user).username + '` ' + Number(a.rep).toLocaleString() + " rep's.**").slice(0, 10).join('\n')

				const embed = new Discord.MessageEmbed()
				.setTitle('Top Reputações')
        .setThumbnail('https://imgur.com/H1l3XiK.png')
				.setDescription(reptop)
				.setColor('#dc143c')
				.setTimestamp()
				.setFooter(`Suas Reputações: ${Number(usu.rep).toLocaleString()}`, message.author.displayAvatarURL({dynamic: true, format:"png", size:1024}))
				message.channel.send(embed)
       /* message.channel.send({
          'embed': {
            'title': `:moneybag: TOP Money:`,
            'description': `${moneytop}`,
            'color': 'RANDOM',
            'timestamp': new Date(),
            'footer': {
              'icon_url': message.author.displayAvatarURL,
              'text': `Sua pontuação: ${Number(usu.rep).toLocaleString()} rep.`
            }
          }
        })
				*/
      } else {
        message.channel.send(':x: **Ocorreu um erro ao executar este comando.**')
      }
    })
  })
}
exports.help = {
  name: "cointop",
  aliases: ["toprep", "topmoney", "moneytop"]
}