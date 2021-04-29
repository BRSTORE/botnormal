const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (
    !message.member.roles.cache.get("634559225963479040") && !member.roles.cache.get("602616263218561024")
  ) {
    return message.channel.send(
      "**`" +
        message.author.username +
        "`, você precisa de no mínimo `nível 20` para fazer o Teste.**"
    );
  }
  var sender = message.author;
  message.channel.send(
    `<:form:723742700054118491> ${message.author.username}, o formulário acerca do teste para staff foi enviado ao seu **Privado**. Leia com calma e responda com cuidado`
  );
	var str1 = process.env.Q1;
  	message.author.send(
      `<:form:723742700054118491> **Teste para Staff** <:form:723742700054118491>\n${str1}`
    )
    .then(async msg => {
      let nome = await msg.channel.createMessageCollector(
        m => m.author.id === message.author.id,
        { max: 1 }
      );
      // create a message collector
      nome.on("collect", async () => {
        var name = nome.collected.first().content;
        if (nome.collected.first().content.length > 950) {
          sender.send("Limite de caracteres excedido! Resposta reduzida.");
          let ts = nome.collected.first().content;
          name = ts.slice(0, 1000);
        }
        var str2 = process.env.Q2;
        message.author.send(
          `${str2}`
        );
        let idade = await msg.channel.createMessageCollector(
          m => m.author.id === message.author.id,
          { max: 1 }
        );

        // collector message 2
        idade.on("collect", async () => {
          var idadee = idade.collected.first().content;
          if (idade.collected.first().content.length > 950) {
            sender.send("Limite de caracteres excedido! Resposta reduzida.");
            let ts2 = idade.collected.first().content;
            idadee = ts2.slice(0, 1000);
          }
		  var str3 = process.env.Q3;
          message.author.send(
            str3
          );
          let hora = await msg.channel.createMessageCollector(
            m => m.author.id === message.author.id,
            { max: 1 }
          );

          // collector message 2
          hora.on("collect", async () => {
            var hour = hora.collected.first().content;
            if (hora.collected.first().content.length > 950) {
              sender.send("Limite de caracteres excedido! Resposta reduzida.");
              let ts3 = hora.collected.first().content;
              hour = ts3.slice(0, 1000);
            }
			var str4 = process.env.Q4;
            message.author.send(
              str4
            );
            let cargo = await msg.channel.createMessageCollector(
              m => m.author.id === message.author.id,
              { max: 1 }
            );

            cargo.on("collect", async () => {
              var carg = cargo.collected.first().content;
              if (cargo.collected.first().content.length > 950) {
                sender.send(
                  "Limite de caracteres excedido! Resposta reduzida."
                );
                let ts4 = cargo.collected.first().content;
                carg = ts4.slice(0, 1000);
              }
			  var str5 = process.env.Q5;
              message.author.send(
                str5
              );
              let bots = await msg.channel.createMessageCollector(
                m => m.author.id === message.author.id,
                { max: 1 }
              );

              bots.on("collect", async () => {
                var bot = bots.collected.first().content;
                if (bots.collected.first().content.length > 950) {
                  sender.send(
                    "Limite de caracteres excedido! Resposta reduzida."
                  );
                  let ts5 = bots.collected.first().content;
                  bot = ts5.slice(0, 1000);
                }
				var str7 = process.env.Q7;
				message.author.send(
                  `${str7}\n${process.env.OP1}\n${process.env.OP2}\n${process.env.OP3}\n${process.env.OP4}`
                );
                let setor = await msg.channel.createMessageCollector(
                  m => m.author.id === message.author.id,
                  { max: 1 }
                );

                setor.on("collect", async () => {
					var setr = setor.collected.first().content;
					if (setor.collected.first().content.length > 1000) {
						sender.send(
						"Limite de caracteres excedido! Resposta reduzida."
						);
						let ts7 = setor.collected.first().content;
						setr = ts7.slice(0, 1000);
					}
					var str6 = process.env.Q6;
					message.author.send(
						str6
					);
					let motivo = await msg.channel.createMessageCollector(
					m => m.author.id === message.author.id,
					{ max: 1 }
					);

					motivo.on("collect", async () => {
					var motv = motivo.collected.first().content;
					if (motivo.collected.first().content.length > 1000) {
						sender.send(
						"Limite de caracteres excedido! Resposta reduzida."
						);
						let ts6 = motivo.collected.first().content;
						motv = ts6.slice(0, 1000);
					}
					//Mensagem final
					message.author.send(
						"<:form:723742700054118491> **Seu formulário foi enviado com sucesso.** <:form:723742700054118491>\n**1.** Se entrarmos em contato quer dizer que foi aprovado na primeira etapa do teste.\n**2.** Caso não contactarmos você, então quer dizer que você não foi aceito."
					);

					let rcanal = message.guild.channels.cache.find(
						a => a.id === "673179616042680359"
					);
					let form = new Discord.MessageEmbed()
						.setTitle(message.author.username)
						.setThumbnail(
						message.author.avatarURL({
							dynamic: true,
							format: "png",
							size: 1024
						})
						)
						.setColor("#dc143c")
						.setTimestamp()
						.addField("Nome:", name)
						.addField("Idade:", idadee)
						.addField("Tempo no Discord:", hour)
						.addField("Experiência em Administração:", carg)
						.addField("Conhecimento de Bots:", bot)
						.addField("Setor(es) desejado(s):", setr)
						.addField("Porquê deseja ser da staff:", motv)
						.setFooter("ID do Usuário: " + message.author.id);

					rcanal.send(form);
					});
				});
              });
            });
          });
        });
      });
    });
};

module.exports.help = () => {
  return {
    name: "form",
    info: "formulário de requisição para aderir à staff.",
    restrict: false
  };
};
