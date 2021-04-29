const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setThumbnail("https://imgur.com/8bo7JOD.png")
    .setColor("#9c84ef")
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .addField(
      "Social:",
      "**`$$level`, `$$profile`, `$$rep`, `$$toplevel`, `$$toprep`, `$$topmoney`, `$$map`, `$$travel`. **"
    )
    .addField(
      "Economia e Diversão:",
      "**`$$balance`, `$$daily`, `$$pick`, `$$coinflip`, `$$jokenpo`, `$$hunt`, `$$pay`.**"
    )
    .addField(
      "Úteis:",
      "**`$$testcolor`, `$$emoji`, `$$help`, `$$ping`, `$$vipcolor`, `$$form`, `$$ideia`, `$$color`.**"
    )
    .setFooter("Ice Cream Kingdom");
  message.channel.send(embed);
};

module.exports.help = () => {
  return {
    name: "help",
    info: "comando para se obter ajuda",
    restrict: false
  };
};
