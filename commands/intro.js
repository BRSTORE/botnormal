
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

if (!message.member.permissions.has("ADMINISTRATOR")) return;
message.delete();
const embed1 = new Discord.MessageEmbed()
        .setTitle("<:ebBeelzebub:733992294117670972> Adicione o bot Erebus ao seu servidor.")
        .setColor("#7c2ae8")
        .setDescription("Erebus é um bot de **`diversão`** para o seu servidor Discord. Adicione-o ao seu servidor e promova mais **`interação`** entre seus membros e, consequentemente, tenha membros mais engajados e um **`servidor ativo`**.")
        .setThumbnail("https://imgur.com/8bo7JOD.png")
        .addField("Site para adicioná-lo:", "<:ebAmaymon:734279967294357545> | [erebusbot.com](https://www.erebusbot.com/)")
        await message.channel.send(embed1);
};
