const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

if (!message.member.permissions.has("ADMINISTRATOR")) return;
message.delete();
const embed1 = new Discord.MessageEmbed()
        .setTitle("<:hpplayer:736802386407849984> | Cores Disponíveis Para o Nickname.")
        .setColor("#fb8da1")
        .setDescription("Abaixo estão algumas poções de cores para que você possa alterar a cor do seu nickname. Para você pode comprá-las siga o exemplo abaixo escrevendo no canal de <#602011779379363840>\n**Exemplo: `$$color verde`**")
        .setThumbnail("https://imgur.com/g4tpKuN.png")
        await message.channel.send(embed1);

const embed2 = new Discord.MessageEmbed()
        .setTitle("<:bau:723072234259873814> | Cores Disponíveis Para o Nickname.")
        .setColor("#ffd700")
        .setDescription("<:goldbars:737496534068887613> **`5000` ➥** <@&736458002734776330>\n<:goldbars:737496534068887613> **`5000` ➥** <@&736458655008030753>\n<:goldbars:737496534068887613> **`5000` ➥** <@&736458854308642840>\n<:goldbars:737496534068887613> **`5000` ➥** <@&736459399085686794>\n<:goldbars:737496534068887613> **`5000` ➥** <@&736459621899960340>\n<:goldbars:737496534068887613> **`5000` ➥** <@&736459835029061653>\n<:goldbars:737496534068887613> **`5000` ➥** <@&736460273254137926>\n<:goldbars:737496534068887613> **`5000` ➥** <@&736461077168128100>\n<:goldbars:737496534068887613> **`7500` ➥** <@&736460826889814058>\n<:goldbars:737496534068887613> **`7500` ➥** <@&736460088339988480>\n<:goldbars:737496534068887613> **`5000` ➥** <@&736461335747100753>\n<:goldbars:737496534068887613> **`10000` ➥** <@&602034315869683714>")
        await message.channel.send(embed2);

const embed3 = new Discord.MessageEmbed()
        .setTitle("<:rep:737870629880987749> | Cargos obtidos por interação.")
        .setColor("#1e90ff")
        .setDescription("Como em todo bom RPG você irá começar de baixo e deverá aumentar sua experiência para subir de nível e obter novas habilidades. Abaixo estão as classes desbloqueadas a cada level e as conquistas referentes a elas. Para checar seu level e experiência você deve escrever **`$$level`** no canal designado para comandos.")
        .setThumbnail("https://imgur.com/Dr5vJuq.png")
        await message.channel.send(embed3);

const embed4 = new Discord.MessageEmbed()
        .setTitle("<:power:736802386949177384> | Lista de Cargos.")
        .setColor("#dc143c")
        .setDescription("<@&634557560778915840> **(LV2: acesso à call)**\n<@&634557672292876310> **(LV5)**\n<@&634558987819548673> **(LV10: acesso à sugestões)**\n<@&634559149186875414> **(LV15)**\n<@&634559225963479040> **(LV20: teste para staff)**\n<@&634559300101996544> **(LV28)** \n<@&634559354905034766> **(LV35: sorteios privados)**\n<@&634559398760415242> **(LV45)**\n<@&634559434714251265> **(LV53)**\n<@&634559472563519494> **(LV63)**\n<@&634559516939386891> **(LV71)**\n<@&634560136328904714> **(LV80)**\n<@&634560212161789962> **(LV90)**\n<@&634560243904413696> **(LV100)**\n<@&634560250745192449> **(LV110)**\n<@&634560257103888394> **(LV120)**")
        await message.channel.send(embed4);
};