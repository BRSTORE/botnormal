const Discord = require("discord.js");
const database = require("../database.js");

exports.run = async (client, message, args) => {
  	if (!message.member.hasPermission("KICK_MEMBERS"))
		return message.reply("você é fraco! lhe falta permissão para usar este comando.");

	if (!args)
		return message.reply("você não forneceu o código do invite.");
	
	var code = args[0];
	var inv = true;
	let invite = await client.fetchInvite(code).catch(err => {
		inv = false;
		if (!err.message.match("Unknown Invite"))
			console.log(err);
	});

	if (!inv)
		return message.reply("Invite não encontrado!");

	if (invite.guild.id !== "602006032931225620")
		return message.reply("Este invite não é do Ice Cream Kingdom.");

	let msg = await message.channel.send(`Invite encontrado. Criado por ${invite.inviter.tag}.\nDeseja excluir este invite?`);
	msg.react("✅");
	var filter = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
	msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] }).then(async r => {
		invite.delete().then(() => {
			message.channel.send("Invite excluido.");
		}).catch(err => {
			console.log(err);
			message.channel.send("Erro ao excluir o invite.");
		});
	}).catch(err => {
		if (err instanceof Error)
			return console.log(err);
		
		message.channel.send("Operação cancelada!");
	});
};

module.exports.help = () => {
  return {
    name: "dropinvite",
    info: "excluir um invite.",
    restrict: true
  };
};
