exports.run = async (client, message, args) => {

	if (!message.member.hasPermission("ADMINISTRATOR")) return;

	try {
		message.guild.emojis.create(args[0], args[1]).then(emoji => message.channel.send(`Novo emoji criado com o nome ${emoji.name}`))
	} catch (err) {
		message.channel.send(`Não foi possível add o emoji devido a: ${err}`)
	}
}
