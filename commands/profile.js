const Discord = require("discord.js");
const mongoose = require("mongoose");
const Database = require("../database.js");
const locales = require("../locales.json")

module.exports.run = async (client, message, args) => {

	var thumb = 'https://cdn.discordapp.com/emojis/733992300237029477.png?v=1';
	var color = '#dc143c';

	if (message.member.roles.cache.some(role => role.id === '711633611111268363')) { //Bril
		thumb = 'https://cdn.discordapp.com/emojis/704488862461984868.png?v=1'
		color = '#f67b63'
	} else if (message.member.roles.cache.some(r => r.id === "711603048643821641")) { //bal
		thumb = 'https://cdn.discordapp.com/emojis/704488860381347870.png?v=1'
		color = '#3adec0'
	} else if (message.member.roles.cache.some(r => r.id === "711600216704548956")) { //brav
		thumb = 'https://cdn.discordapp.com/emojis/704488861321134140.png?v=1'
		color = '#9c81f2'
	};

	let member = message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
	message.author;
	let user = await Database.Users.findOne({_id: member.id});

	if (!user) {
		message.channel.send(`**${member.tag} não possui um ` + '`profile`' + `.**`)
		 new Database.Users({_id: member.id})
        .save()
        .catch(err => console.log("erro: " + err));
	} else if (user) {
			let localePlayer = user.localeMap;
			const embed = new Discord.MessageEmbed()
				.setAuthor(member.tag, member.displayAvatarURL())
				.addField('<:level:737870629348442184> Level', '**`' + user.level + '`**', true)
				.addField('<:xp:737872975373533306> Experiência', '**`' + user.xp + '-' + user.level * 100 + '`**', true)
				.addField("<:rep:737870629880987749> Rep's", '**`' + user.rep + '`**', true)
				.addField("<:goldbars:737496534068887613> Saldo", '**`' + user.coins.toLocaleString().replace(",", ".") + '`**', true)
				.setThumbnail(thumb)
				.setColor(color)
				.setFooter(`Sua posição: ${locales.content[localePlayer].embed.title}`)
				.setTimestamp(message.createdAt);

			message.channel.send(embed);
		}
};

module.exports.help = () => {
	return {
		name: "profile",
		info: "ver as informações de perfil do usuário.",
		restrict: false
	};
};
