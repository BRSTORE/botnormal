const Discord = require("discord.js");
const Database = require("../database.js");

module.exports.run = async (client, message, args) => {

	let color = '#dc143c';
	if (message.member.roles.cache.some(role => role.id === '711633611111268363')) { //Bril
		color = '#f67b63'
	} else if (message.member.roles.cache.some(r => r.id === "711603048643821641")) { //bal
		color = '#3adec0'
	} else if (message.member.roles.cache.some(r => r.id === "711600216704548956")) { //brav
		color = '#9c81f2'
	};

	let member = message.author;

	let user = await Database.Users.findOne({
		_id: member.id
	});


	if (!user) {
		message.channel.send(`**${message.author.username} você ainda não possui level.**`)
		 new Database.Users({_id: member.id})
        .save()
        .catch(err => console.log("erro: " + err));
	} else if (user) {
		var xpPorcent = (user.xp / (user.level * 100)) * 100;
		var xp = Math.floor(xpPorcent.toFixed());
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.addField('<:level:737870629348442184> Level', '**`' + user.level + '`**', true)
			.addField('<:xp:737872975373533306> Experiência', '**`' + user.xp + '/' + user.level * 100 + '` - `' + xp + '%`**', true)
			.setColor(color)

		message.channel.send(embed);
	}
};

module.exports.help = () => {
	return {
		name: "level",
		info: "ver as informações de perfil do usuário.",
		restrict: false
	};
};
