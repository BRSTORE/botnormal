const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const m = await message.channel.send("Ping?");
  m.edit(
    `Pong! A Latência é ${m.createdTimestamp -
      message.createdTimestamp}ms. A Latência da API é ${Math.round(
      client.ws.ping
    )}ms`
  );
};
