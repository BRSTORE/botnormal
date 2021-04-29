const Discord = require("discord.js");
const database = require("../database.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      "você é fraco! lhe falta permissão para usar este comando."
    );

  var cmd = args[0];
  let ice = client.guilds.cache.get("602006032931225620");
  let channel = ice.channels.cache.get("667093901546356766");
  let role = ice.roles.cache.get("667093512822456353");
  let ev = ice.roles.everyone;
  if (cmd === "mute") {
	  channel.overwritePermissions([{
		  id: role,
		  deny: ["SPEAK"],
		  allow: ["VIEW_CHANNEL", "CONNECT"]
	  }, {
		  id: ev,
		  deny: ["VIEW_CHANNEL", "CONNECT"]
	  }]);
  }else if (cmd === "unmute") {
	  channel.overwritePermissions([{
		  id: role,
		  allow: ["SPEAK", "VIEW_CHANNEL", "CONNECT"]
	  }, {
		  id: ev,
		  deny: ["VIEW_CHANNEL", "CONNECT"]
	  }]);
  }
};

module.exports.help = () => {
  return {
    name: "among",
    info: "mutar ou desmutar call do among.",
    restrict: true
  };
};
