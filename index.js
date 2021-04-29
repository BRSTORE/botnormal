const express = require('express');
const app = express();
app.get("/", (request, response) => {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
	response.sendStatus(200);
});
app.listen(process.env.PORT);
const Discord = require("discord.js");
const Canvas = require("canvas");
const { loadImage, registerFont, createCanvas } = require('canvas');
const Database = require("./database.js");
const client = new Discord.Client();
const config = require("./config.json");
const levelsystem = require("./levelsystem.json");
const bgs = require('./bgs.json');
const levelup = require('./atribuirCargos.js');
Canvas.registerFont('./fonts/arialU.ttf', { family: 'arialU' });
Canvas.registerFont('./fonts/arial.ttf', { family: 'arial' });
Canvas.registerFont('./fonts/times.ttf', { family: 'times' });

var bsts = null;

client.on("guildMemberUpdate", async (oldm, newm) => {
  if (!bsts) return;
  let ice = client.guilds.cache.get("602006032931225620");
  if (!oldm.roles.cache.get("604901740940230694") && newm.roles.cache.get("604901740940230694")) {
	  console.log("SERVER BOOSTED!");
	  console.log(bsts + " - " + ice.premiumSubscriptionCount);
	  if (bsts+1 === ice.premiumSubscriptionCount) {
		  if (newm.roles.cache.get("610503142173442059")) {
			  console.log("ADD O1");
			  if(newm.roles.cache.get("610503142173442059")) await newm.roles.remove("610503142173442059", "Removendo Burgês Safado").then(a => console.log("CARGO REMOVIDO 1"));
			  await newm.roles.add("610503387410071575");
		  }else {
			  console.log("ADD B");
			  await newm.roles.add("610503142173442059");
		  }
	  }else if (bsts+2 === ice.premiumSubscriptionCount) {
		  console.log("ADD O2");
		  await newm.roles.add("610503387410071575");
	  }
	  bsts = ice.premiumSubscriptionCount;
  }else if (oldm.roles.cache.get("604901740940230694") && !newm.roles.cache.get("604901740940230694")) {
	  if(newm.roles.cache.get("610503142173442059")) await newm.roles.remove("610503142173442059", "Removendo Burgues Safado 2").then(a => console.log("CARGO REMOVIDO 2.1"));
	  if(newm.roles.cache.get("610503387410071575")) await newm.roles.remove("610503387410071575", "Removendo Ostentador Opressor").then(a => console.log("CARGO REMOVIDO 2.2"));
	  bsts = ice.premiumSubscriptionCount;
  }
  if (bsts !== ice.premiumSubscriptionCount) bsts = ice.premiumSubscriptionCount;
});

client.on("guildUpdate", async (oldg, newg) => {
	setTimeout(async() => {
		if (oldg.premiumSubscriptionCount !== newg.premiumSubscriptionCount) {
			bsts = newg.premiumSubscriptionCount;
		}
	}, 500);
});

client.on("guildMemberAdd", async (member) => {
	if (member.guild.id === "640320022417244180") {
		await member.roles.add("745015143062175784");
		if (member.user.flags.toArray().find(h => h === "HOUSE_BRAVERY")) await member.roles.add("750938140952232048");
		else if (member.user.flags.toArray().find(h => h === "HOUSE_BRILLIANCE")) await member.roles.add("750938002284609638");
		else if (member.user.flags.toArray().find(h => h === "HOUSE_BALANCE")) await member.roles.add("750937818712375306");
		else await member.roles.add("753775027345948743");
		let cht = await client.channels.cache.get("744334244968398849");
		let iv = await member.guild.fetchInvites();
		let ivf = iv.find(i => i.code === "4sTpppv");
		if (cht) cht.setTopic(`<:Mago:702157094874251304> **${ivf.uses.toLocaleString().split(",").join(".")}** aventureiros embarcaram nessa jornada! <:Dragon:702157093439930469>`)
	}
	let guild = await client.guilds.cache.get("602006032931225620");
	let channel = await client.channels.cache.get("602006032931225622");
	if (guild != member.guild) {
		return;
	} else {
		channel.send(`<:rpgBeer:751194786807152640> **Saudações** ${member.user}**, venha bater um papo na taberna com o resto da guilda** <a:rpgSkullCoffee:751195023277817867>`);
	}
});

client.on("message", async message => {
	if (message.guild.id !== "602006032931225620") return;
	try {
		var sender = message.author;
		if (!sender) return;
		var flags = await sender.fetchFlags();
		var house = await flags
			.toArray()
			.find(
				a =>
					a === "HOUSE_BRAVERY" ||
					a === "HOUSE_BALANCE" ||
					a === "HOUSE_BRILLIANCE"
			);
		let member = await message.guild.member(message.author);
		if (!member) return;
		var brvid = "711600216704548956";
		var balid = "711603048643821641";
		var brid = "711633611111268363";
		if (house === "HOUSE_BRAVERY" && !member.roles.cache.get(brvid)) {
			if (member.roles.cache.get(balid)) await member.roles.remove(balid, "Removendo Balance 1").then(a => console.log("CARGO REMOVIDO 3.1"));
			if (member.roles.cache.get(brid)) await member.roles.remove(brid, "Removendo Brilliance 1").then(a => console.log("CARGO REMOVIDO 3.2")); //ok
			await member.roles.add(brvid);
		} else if (house === "HOUSE_BALANCE" && !member.roles.cache.get(balid)) {
			if (member.roles.cache.get(brvid)) await member.roles.remove(brvid, "Removendo Bravery 1").then(a => console.log("CARGO REMOVIDO 4.1")); //ok
			if (member.roles.cache.get(brid)) await member.roles.remove(brid, "Removendo Brilliance 2").then(a => console.log("CARGO REMOVIDO 4.2"));
			await member.roles.add(balid);
		} else if (house === "HOUSE_BRILLIANCE" && !member.roles.cache.get(brid)) {
			if (member.roles.cache.get(brvid)) await member.roles.remove(brvid, "Removendo Bravery 2").then(a => console.log("CARGO REMOVIDO 5.1")); //ok
			if (member.roles.cache.get(balid)) await member.roles.remove(balid, "Removendo Balance 2").then(a => console.log("CARGO REMOVIDO 5.2"));
			await member.roles.add(brid);
		} else {
			return;
		}
	} catch (err) {
		if (err instanceof Error && !err.message.includes("Unknown User")) console.log(err);
		else return;
	}
});

client.on("message", message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
	if (message.content.startsWith(`<@!749015774835769507>`) ||
		message.content.startsWith(`<@749015774835769507>`)) return;

	const args = message.content
		.trim()
		.slice(config.prefix.length)
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	try {
		const commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args);
	} catch (err) {
		if (!err.message.match("Cannot find module")) console.error(err);
		if (err.message.match("Cannot find module")) {
			message.react("733334358798237726");
		}
	}
});

client.on("ready", () => {
	client.user
		.setStatus("dnd")
		.catch(console.error);
	console.log("Estou Online!")

	var guild = client.guilds.cache.get("602006032931225620");
	var bg = bgs.bg;
	var x = 0;
	bsts = guild.premiumSubscriptionCount;
	setInterval(async () => {
		x = Math.floor(Math.random() * bg.length);
		await guild.setBanner(bg[x]);
	}, 60 * 3000);
});

client.on("guildMemberAdd", async (member) => {

	if (member.guild.id === "636963398889897994") {
		await member.roles.add("638221428759461908");
		let cemit = await member.guild.roles.cache.get("638221428759461908");
		let vidas = await member.guild.roles.cache.get("639627197694345244");
		member.roles.add([cemit, vidas]);
		return;
	}
	//if (member.id === "488564742458441729") return;
	if (member.guild.id != "602006032931225620") return;

	const channel = client.channels.cache.get("602006032931225622");

	let auto = member.guild.roles.cache.get("602570791065747486");
	let tomo = member.guild.roles.cache.get("602021374088970250");
	let cores = member.guild.roles.cache.get("602570891439767573");
	let cargos = member.guild.roles.cache.get("602571408714760205");
	let carteira = member.guild.roles.cache.get("620796694052864000");

	//member.roles.add([auto, tomo, cargos, cores /*, carteira*/]);
	/*
	  if (!channel) return;
	
	  const applyText = (canvas, text) => {
		const ctx = canvas.getContext("2d");
		let fontSize = 70;
		do {
		  ctx.font = `${(fontSize -= 10)}px arial`;
		} while (ctx.measureText(text).width > canvas.width - 200);
	
		return ctx.font;
	  };
	
	  const canvas = Canvas.createCanvas(500, 200);
	  const ctx = canvas.getContext("2d");
	  var myArray = [
		"https://i.imgur.com/TH1FTFl.png",
		"https://i.imgur.com/OegOMH7.png",
		"https://i.imgur.com/lKzt60m.png",
		"https://i.imgur.com/AS6yAZG.png",
		"https://i.imgur.com/TFZcALb.png",
		"https://i.imgur.com/tJNziEr.png",
		"https://i.imgur.com/nYboZh8.png",
		"https://i.imgur.com/wDfWlBq.png",
		"https://i.imgur.com/MIXVnle.png",
		"https://i.imgur.com/9IRgmBs.png",
		"https://i.imgur.com/waeuQQn.png",
		"https://i.imgur.com/V0IhcTX.png",
		"https://i.imgur.com/I2zfg96.png",
		"https://i.imgur.com/oC1Uul0.png",
		"https://i.imgur.com/r86PJrd.png",
		"https://i.imgur.com/6a8DpmW.png",
		"https://i.imgur.com/RLF2r4z.png",
		"https://i.imgur.com/mpYIkVe.png",
		"https://i.imgur.com/atzk8lw.png",
		"https://i.imgur.com/aU2EW1K.png",
		"https://i.imgur.com/GoGK9mT.png",
		"https://i.imgur.com/nIb6WL0.png",
		"https://i.imgur.com/fYw9pL5.png",
		"https://i.imgur.com/RtdDBYJ.png",
		"https://i.imgur.com/Ol29iN6.png",
		"https://i.imgur.com/csT0BYn.png"
	  ];
	  var bv = ["Boas Vindas", "Saudações"];
	  var val = Math.floor(Math.random() * myArray.length);
	  var arr = [myArray[val]];
	
	  const background = await Canvas.loadImage(arr[0]);
	
	  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	
	  ctx.font = "28px arial";
	
	  ctx.fillStyle = "#ffffff";
	  ctx.strokeStyle = "#000000";
	
	  // canvas.width / 2.5
	  var bvS = bv[Math.floor(Math.random()*bv.length)];
	  ctx.strokeText(bvS, 180, canvas.height / 3.5);
	  ctx.fillText(bvS, 180, canvas.height / 3.5);
	
	  ctx.lineWidth = 2;
		
	  ctx.font = applyText(canvas, `${member.user.username}!`);
	  ctx.fillStyle = "#ffffff";
	  ctx.strokeStyle = "#000000";
	  ctx.strokeText(`${member.user.username}!`, 180, canvas.height / 1.7);
	  ctx.fillText(`${member.user.username}!`, 180, canvas.height / 1.7);
	  ctx.font = "28px times";
	  ctx.textAlign = "right";
	  ctx.strokeText(`#${member.user.discriminator}`, 476, 170);
	  ctx.fillText(`#${member.user.discriminator}`, 476, 170);
	  ctx.beginPath();
	  ctx.arc(100, 100, 75, 0, Math.PI * 2, true);
	  ctx.closePath();
	  ctx.clip();
	
	  const avatar = await Canvas.loadImage(
		member.user.displayAvatarURL({ format: "png", dynamic: false, size: 1024 })
	  );
	  ctx.drawImage(avatar, 25, 25, 150, 150);
	  const attachment = await new Discord.MessageAttachment(
		canvas.toBuffer(),
		"welcome-image.png"
	  );
	  let em1 = await client.emojis.cache.get("704486576951918633");
	  let em2 = await client.emojis.cache.get("704486322651398180");
	  let em3 = await client.emojis.cache.get("707402968923766855");
	  let em4 = await client.emojis.cache.get("707424294971637810");
	  let em5 = await client.emojis.cache.get("704486322538151996");
	  let cargosch = await client.channels.cache.get("602006904801329172");
	  let regras = await client.channels.cache.get("641686470746177556");
	  await channel.send(
		`${member}, **Boas vindas ao Ice Cream Kingdom!** ${em1}\nAtualmente nosso reino possui **${member.guild.members.cache.size.toLocaleString().replace(",", ".")}** aventureiros. ${em5} Que tipo de aventureiro serás neste Reino? Só o tempo dirá! ${em2} Mas por hora, você pode ver algumas poções para **mudar de cor** em ${cargosch}. ${em3}\nNão se esqueça de **checar as leis** do Reino em ${regras}. ${em4}`,
		attachment
	  );
	  console.log("Alguém entrou!");
	  */
});

let invites = null;
let vanityURL = null;
const wait = require("util").promisify(setTimeout);
client.on("ready", async () => {
	wait(2000);
	let g = await client.guilds.cache.get("602006032931225620");
	invites = await g.fetchInvites();
	let vurl = await g.fetchVanityData();
	vanityURL = vurl.uses;
});

client.on("inviteCreate", async invt => {
	let g = await client.guilds.cache.get("602006032931225620");
	invites = await g.fetchInvites();
});

client.on("inviteDelete", async invt => {
	let g = await client.guilds.cache.get("602006032931225620");
	invites = await g.fetchInvites();
});

client.on("guildMemberAdd", async member => {
	if (member.guild.id === "602006032931225620") {
		let guildInvites = await member.guild.fetchInvites();
		let invite = await guildInvites.find(
			i => invites.get(i.code).uses < i.uses
		);
		let logChannel = await member.guild.channels.cache.get(
			"626145464525389864"
		);
		
		if (invite) {
			invites = guildInvites;
			var chan = invite.channel;
			var ma = invite.maxAge;
			var mu = invite.maxUses;
			if (mu === 0) mu = "Ilimitado.";
			if (ma === 0) ma = "∞";
			else {
				var aux = ma;
				var hr = null;
				var min = null;
				var sec = null;
				if (aux / (60 * 60) > 0) {
					hr = Math.floor(aux / (60 * 60));
					if (hr < 10) hr = "0" + hr.toString();
					aux = aux % (60 * 60);
				} else hr = "00";
				if (aux / 60 > 0) {
					min = Math.floor(aux / 60);
					if (min < 10) min = "0" + min.toString();
					sec = aux % 60;
					if (sec < 10) sec = "0" + sec.toString();
				} else {
					min = "00";
					sec = aux;
					if (sec < 10) sec = "0" + sec.toString();
				}
				ma = hr.toString() + ":" + min.toString() + ":" + sec.toString();
			}
			
			let embed = new Discord.MessageEmbed()
				.setAuthor(
					member.user.tag,
					member.user.avatarURL({ format: "png", dynamic: false, size: 1024 })
				)
				.setFooter(
					invite.inviter.tag,
					invite.inviter.avatarURL({ format: "png", dynamic: false, size: 1024 })
				)
				.setTimestamp()
				.setTitle(`Novo membro do Ice Cream.`)
				.addField(`Usuário:`, `${member.user}`)
				.addField(`Convite criado por:`, `${invite.inviter}`)
				.addField(`Informações do convite:\nCódigo de convite:`, `${invite.code}`)
				.addField(`Número de usos:⠀⠀`, `${invite.uses} usos.`, true)
				.addField(`Tempo do convite:⠀⠀`, `${ma}`, true)
				.addField(`Máximo de usos:`, `${mu}`, true)
				.addField(`Canal do convite:`, `${chan}`, false)
				.setColor("ee82ee");
			logChannel.send(embed);
		}else {
			let gdv = await member.guild.fetchVanityData();
			if (vanityURL < gdv.uses) {
				vanityURL++;
				let embed = new Discord.MessageEmbed()
					.setAuthor(
						member.user.tag,
						member.user.avatarURL({ format: "png", dynamic: false, size: 1024 })
					)
					.setTimestamp()
					.setTitle(`Novo membro do Ice Cream.`)
					.addField(`Usuário:`, `${member.user}`)
					.addField(`Convite criado por:`, `URL padrão.`)
					.addField(`Informações do convite:\nCódigo de convite:`, `icecream`)
					.addField(`Número de usos:⠀⠀`, `${vanityURL} usos.`, true)
					.setColor("ee82ee");
				logChannel.send(embed);
			}
		}
	}
});

client.on("message", async message => {
	const canal = message.guild.channels.cache.find(ch => ch.id === "602006032931225622")
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	let user = await Database.Users.findOne({
		_id: message.author.id
	});

	var loopLevels = levelsystem.allLevels;
	if (user) {
		for (let i in loopLevels) {
			if (loopLevels[i] > user.level) {
				break;
			} else if (!message.member.roles.cache.find(r => r.id === levelsystem.level[loopLevels[i]].role)) {
				await message.member.roles.add(levelsystem.level[loopLevels[i]].role);
			}
		}
		let getxp = true;//await levelup.questsVerify(user, message.member);
		if (getxp) {
			if (levelsystem.blockedChannels.channels.includes(message.channel.id)) return;
			if (message.channel.parent.id === "689917170926354456") return;

			const randomNumb1 = (await Math.floor(Math.random() * 20)) + 10;
			const randomNumb2 = (await Math.floor(Math.random() * 20)) + 30;
			const now = new Date();
			const hora = now.getHours() - 3;
			if (hora >= 2 && hora < 5 && 1000 * 60 - (now - user.cooldownXp) < 0) {
				user.xp += randomNumb2;
				user.cooldownXp = now;
			} else if ((hora < 0 || hora < 2 || hora >= 5) && 1000 * 60 - (now - user.cooldownXp) < 0) {
				user.xp += randomNumb1;
				user.cooldownXp = now;
			};

			if (user.xp > user.level * 100) {
				var limite = user.level * 100;
				var sobra = user.xp - limite;
				user.xp = sobra;
				user.level += 1;

				var hypeemoji = "<:Mago:702157094874251304>";
				if (message.member.roles.cache.get("711633611111268363")) {
					hypeemoji = "<:brilliance:707412433450565722>";
				}
				if (message.member.roles.cache.get("711600216704548956")) {
					hypeemoji = "<:bravery:707412430799634453>";
				}
				if (message.member.roles.cache.get("711603048643821641")) {
					hypeemoji = "<:balance:707412428614402131>";
				};

				if (!levelsystem.allLevels.includes(user.level)) {
					message.channel.send(`${hypeemoji} **┃ ${message.author}, você acaba de avançar para o  ` + "`nível " + `${user.level}` + "`" + `! Continue assim e um dia poderá tornar-se o maior aventureiro deste reino.**`)

				} else if (user.level === levelsystem.level[user.level].number) {
					await message.member.roles.add(levelsystem.level[user.level].role);
					message.channel.send(`${hypeemoji} **┃ ${message.author} avançou para o ` + "`level " + `${user.level}` + "`" + `! Seu novo título é ${levelsystem.level[user.level].roleName}.**`)

				};
			}
			user.save().catch(err => console.log("erro: " + err));
		}
	}else if (!user) {
		new Database.Users({ _id: message.author.id })
			.save()
			.catch(err => console.log("erro: " + err));
	};
});

client.on("guildMemberRemove", async member => {
	if (member.guild.id === "602006032931225620") {
		if (member.id != "360538008069472256") {
			let deleted = await Database.Users.findOne({ _id: member.id });
			if (deleted) deleted.delete();
		}
	}
});

client.on("guildMemberAdd", async member => {
	const Database = require("./database.js");
	let documento = await Database.Users.findOne({ _id: `${member.id}` });

	if (!documento) {
		new Database.Users({ _id: member.id })
			.save()
			.catch(err => console.log("erro: " + err));
	}
});

client.on("guildMemberAdd", async member => {
	var sv = member.guild;
	let channel = await member.guild.channels.cache.get("751186976270712892");
	var mcount = member.guild.memberCount.toLocaleString();
	var count = mcount.split(",").join(".");
	if (channel) {
			var msg = `${member}, **Boas vindas ao Ice Cream Kingdom**! <a:cavaleiro:704486576951918633>\nAtualmente nosso reino possui **${count}** aventureiros. Que tipo de aventureiro serás neste Reino? Só o tempo dirá! <a:chars16:704486322651398180>\nPor hora, você pode verificar todos os cargos do reino em <#602006904801329172>. <:potiontransparentpixel15:707402969318162465>\nNão se esqueça também de checar as leis do Reino em <#641686470746177556>. <a:Rules:707424294971637810>`;
			var bv = ["Boas Vindas", "Saudações"];
			var bvs = bv[Math.floor(Math.random()*bv.length)];
			var mu = member.user.username.split(/ +/g).join(' ');
			var mu1 = mu.slice(0, 16);
			var mu2 = mu.slice(16, 32);
			var user = `${mu1}\n${mu2}`;
			var tag = "#" + member.user.discriminator;
			var img = config.imgs[Math.floor(Math.random()*config.imgs.length)];
			var mav = member.user.displayAvatarURL({format: 'png', size: 512});
			const canvas = createCanvas(500, 200);
			const ctx = canvas.getContext('2d');
			var img1 = await loadImage(img).catch(err => {return loadImage("./wcm/wcm.png")});
			var img2 = await loadImage(mav).catch(err => {return loadImage("./wcm/default.jpg")});
			var imit = 50/2;
			ctx.drawImage(img1, 0, 0);
			ctx.font = '37px "Arial"';
			ctx.fillStyle = '#FDFDFD';
			ctx.strokeStyle = '#000000';
			ctx.lineWidth = 4;
			ctx.strokeText(user, 375/2, 195/2);
			ctx.fillText(user, 375/2, 195/2);
			ctx.font = '30px "Arial"';
			ctx.fillStyle = '#FFFFFF';
			ctx.strokeStyle = '#000000';
			ctx.lineWidth = 3;
			ctx.strokeText(bvs, 435/2, 100/2);
			ctx.fillText(bvs, 435/2, 100/2);
			ctx.font = '25px "Arial"';
			ctx.textAlign = 'right';
			ctx.strokeText(tag, 960/2, 360/2);
			ctx.fillText(tag, 960/2, 360/2);
			var x = Math.floor(Math.random()*4+1);
			if (x === 1) { // Circulo
				ctx.beginPath();
				ctx.arc(150/2+imit, 150/2+imit, 150/2, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.strokeStyle = '#000000';
				ctx.lineWidth = 5;
				ctx.stroke();
				ctx.clip();
			}else if (x === 2) { // Losango
				ctx.beginPath();
				ctx.moveTo(imit, 150/2+imit);
				ctx.lineTo(150/2+imit, imit);
				ctx.lineTo(300/2+imit, 150/2+imit);
				ctx.lineTo(150/2+imit, 300/2+imit);
				ctx.lineTo(imit, 150/2+imit);
				ctx.closePath();
				ctx.strokeStyle = '#000000';
				ctx.lineWidth = 5;
				ctx.stroke();
				ctx.clip();
			}else if (x === 3) { // Hexagono
				ctx.beginPath();
				ctx.moveTo(imit, 182/2+imit);
				ctx.lineTo(45/2+imit, 37/2+imit);
				ctx.lineTo(195/2+imit, 3/2+imit);
				ctx.lineTo(300/2+imit, 116/2+imit);
				ctx.lineTo(254/2+imit, 262/2+imit);
				ctx.lineTo(104/2+imit, 296/2+imit);
				ctx.lineTo(imit, 182/2+imit);
				ctx.closePath();
				ctx.strokeStyle = '#000000';
				ctx.lineWidth = 5;
				ctx.stroke();
				ctx.clip();
			}else if (x === 4) { // Estrela
				ctx.beginPath();
				ctx.moveTo(imit, 111/2+imit);
				ctx.lineTo(103/2+imit, 95/2+imit);
				ctx.lineTo(150/2+imit, 2/2+imit);
				ctx.lineTo(196/2+imit, 95/2+imit);
				ctx.lineTo(299/2+imit, 111/2+imit);
				ctx.lineTo(223/2+imit, 184/2+imit);
				ctx.lineTo(242/2+imit, 286/2+imit);
				ctx.lineTo(150/2+imit, 238/2+imit);
				ctx.lineTo(57/2+imit, 286/2+imit);
				ctx.lineTo(75/2+imit, 184/2+imit);
				ctx.lineTo(imit, 111/2+imit);
				ctx.closePath();
				ctx.strokeStyle = '#000000';
				ctx.lineWidth = 5;
				ctx.stroke();
				ctx.clip();
			}
			ctx.drawImage(img2, imit, imit, 300/2, 300/2);
			ctx.restore();
			var attach = new Discord.MessageAttachment(canvas.toBuffer(), 'one.png');
			await channel.send(`${msg}`, attach);
		
		
	}
		
	
});

client.login(process.env.TOKEN);
