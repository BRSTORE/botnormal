const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	if (!message.member.permissions.has("ADMINISTRATOR")) return;
	let guild = message.guild;
	var not = ["297805818319994880", "461756231049150474", "617558527979814937", "302050872383242240", "422087909634736160", "493224032167002123", "561906688559677465", "115385224119975941"];
	let invites = await guild.fetchInvites();
	let invitesArray = await invites.filter(i => i.uses <= 5 && i.maxAge === 0 && i.code !== "evS3TpC" && !not.includes(i.inviter.id));
	let arr = await invitesArray.array();
    var i = 1;
    var count = 0;
	var ci = 0;
	await message.channel.send(`Limpando **${arr.length}** invites.`);
	function doSetTimeout(x) {
		setTimeout(async function() {
			try {
				await arr[x].delete().catch(err => console.log("ERRO INVITE " + err));
				console.log("invite " + arr[x].code + " deletado [" + i + "].");
				if (ci === arr.length-1) message.channel.send(`**${i}** invites deletados!`);
				i++;
			}catch (err) {
				console.log("ERR INV" + err);
			}
			ci++;
		}, count*1000);
	}
	for (var x = 0; x < arr.length; x++) {
		await doSetTimeout(x);
		count++;
	}
};