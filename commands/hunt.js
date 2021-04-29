const Discord = require("discord.js");
const locales = require('../locales.json');
const monsters = require('../monsters.json');
const Database = require("../database.js");

module.exports.run = async (client, message, args) => {

  const playerDB = await Database.Users.findOne({
    _id: message.author.id
  });
  let localePlayer = playerDB.localeMap;
  if (locales.identifier[localePlayer].hunt != true) {
  const embedNopHunt = new Discord.MessageEmbed()
        .setColor(locales.content[localePlayer].embed.color)
        .setDescription('**`~' + message.author.username + '` sua localização não permite caçada.** ' + locales.identifier[localePlayer].emojiMention);
      return message.channel.send(embedNopHunt);
  } else {
    /*
  var playerHP = playerDB.level * 10;
  var playerPower = playerDB.level * 5;
*/
  var playerHP = 55 + playerDB.level;
  var playerPower = Math.floor(40 + (playerDB.level / 2));

  var monsterList = locales.identifier[localePlayer].monsters;
  var whoMonster = monsterList[Math.floor(Math.random() * monsterList.length)];

  var monster = {
    name: monsters.dataMonsters[whoMonster].name,
    color: monsters.dataMonsters[whoMonster].color,
    avatar: monsters.dataMonsters[whoMonster].avatar,
    element: monsters.dataMonsters[whoMonster].element,
    level: monsters.dataMonsters[whoMonster].level,
    hp: monsters.dataMonsters[whoMonster].hp,
    powerMin: monsters.dataMonsters[whoMonster].powerMin,
    powerMax: monsters.dataMonsters[whoMonster].powerMax,
    drops : monsters.dataMonsters[whoMonster].drops,
    goldMin: monsters.dataMonsters[whoMonster].goldMin,
    goldMax: monsters.dataMonsters[whoMonster].goldMax
  };
  var player = {
    hp: playerHP,
    power: playerPower
  };

 var drop = monster.drops[Math.floor(Math.random() * monster.drops.length)];
 var goldDrop = Math.floor(Math.random() * (monster.goldMax - monster.goldMin + 1)) + monster.goldMin;

 async function droparAlgo (){
    if (drop === 'gold') {
      playerDB.coins += goldDrop;
      playerDB.save();
      const embedGoldDrop = new Discord.MessageEmbed()
      .setColor(monster.color)
      .setDescription('**~' + message.author.username + ' dropou' + ' +`' + goldDrop + '`<:barras:732045043031867465> por derrotar um `' + monster.name + '`**')
       return message.channel.send(embedGoldDrop)
      } else if (drop === 'nada') { 
              const embedNopDrop = new Discord.MessageEmbed()
      .setColor(monster.color)
      .setDescription('**~`' + message.author.username + '` derrotou um `' + monster.name + '`**');
        return message.channel.send(embedNopDrop)
       };
  }

async function perderBatalha(){
    if (playerDB.coins <= goldDrop) {
       playerDB.coins = 0;
       playerDB.save(); 
      } else {
       playerDB.coins -= goldDrop;
       playerDB.save();
    }
    const embedLose = new Discord.MessageEmbed()
      .setColor(monster.color)
      .setDescription("**`~" + message.author.username + "` perdeu `-" + goldDrop + "`**<:barras:732045043031867465> **pela derrota contra o `" + monster.name + "`**")
       return message.channel.send(embedLose)
}

async function fugirBatalha(){
     if (playerDB.coins <= goldDrop) {
     playerDB.coins = 0;
     playerDB.save();
     } else { 
      playerDB.coins -= goldDrop;
      playerDB.save();
     }
   message.channel.send("**`~" + message.author.username + "` fugiu de um `" + monster.name + "` e perdeu `-" + goldDrop + "`**<:barras:732045043031867465>")
}

  function attackAgain() {
    const embedAttackAgain = new Discord.MessageEmbed()
      .setColor('#f1e2e2')
      .setDescription("**~" + message.author.username + " escolha uma ação: `atacar` ou `fugir`**");
      message.channel.send(embedAttackAgain);
    message.channel.awaitMessages(m => m.author.id == message.author.id, {
        max: 1,
        time: 30000
      })
      .then(async collected => {
        if (collected.first().content.toLowerCase() === "atacar") {
  var randMonster = Math.floor(Math.random() * (monster.powerMax - monster.powerMin + 1)) + monster.powerMin;
  var randPlayer = Math.floor(Math.random() * player.power);

  var hpMonster = monster.hp;
  var hpPlayer = player.hp;

  var damageInMonster = (monster.hp = hpMonster - randPlayer);
  var damageInPlayer = (player.hp = hpPlayer - randMonster);
          if (monster.hp <= 0) {
        droparAlgo()
          } else if (player.hp <= 0) {
        perderBatalha()
          } else {
  let embedAgain = await new Discord.MessageEmbed()
      .setColor(monster.color)
      .addField(`${message.author.username}`, '<:power:736802386949177384> **Desferiu um dano de `' + randPlayer + '`**\n<:hpplayer:736802386407849984> **HP do Guerreiro:** `' + player.hp + '`')
      .addField(`${monster.name}`, '<:power:736802386949177384> **Revidou um dano de `' + randMonster + '`**\n<:hpmonster:736802385665589360> **HP do Monstro:** `' + monster.hp + '`')
      message.channel.send(embedAgain)
          attackAgain();
          }
        } else if (collected.first().content.toLowerCase() === "fugir") {
      fugirBatalha()
        } else {
         message.channel.send("**`~" + message.author.username + "` preste atenção na batalha ou irá morrer**");
        await attackAgain();
        }
      })
      .catch(() => {
        console.log(console.err)
      message.channel.send("**Você é lento! `~" + message.author.username + "` perdeu `-" + goldDrop + "`**<:barras:732045043031867465> **pela derrota contra o `" + monster.name + "`**")
      });
  }

    let embedInit = new Discord.MessageEmbed()
      .setColor(monster.color)
      .setAuthor(monster.name, monster.avatar)
      .setDescription('<:hpmonster:736802385665589360> **HP: `' + monster.hp + '`**\n<:power:736802386949177384> **Poder de Ataque: `' + monster.powerMin + ' - ' + monster.powerMax + '`**')
      .setThumbnail(monster.avatar)
    await message.channel.send('**~' + message.author.username + ' um `' + monster.name + '` surgiu. Você deseja `Atacar` ou `Fugir`?**', embedInit);
  message.channel.awaitMessages(m => m.author.id == message.author.id, {
      max: 1,
      time: 30000
    })
    .then(async collected => {
      if (collected.first().content.toLowerCase() === "atacar") {
  var randMonster = Math.floor(Math.random() * (monster.powerMax - monster.powerMin + 1)) + monster.powerMin;
  var randPlayer = Math.floor(Math.random() * player.power);

  var hpMonster = monster.hp;
  var hpPlayer = player.hp;

  var damageInMonster = (monster.hp = hpMonster - randPlayer);
  var damageInPlayer = (player.hp = hpPlayer - randMonster);
      if (monster.hp <= 0) {
   let embedCritic = new Discord.MessageEmbed()
      .setColor(monster.color)
      .setDescription("**~`" + message.author.username + "` deu HIT KILL em um `" + monster.name + "`.**")
      .addField('Drop', '** +`' + goldDrop + '`**<:barras:732045043031867465>')
      playerDB.coins += goldDrop;
      playerDB.save();
     return message.channel.send(embedCritic)
        } else {
  let embedContinue = new Discord.MessageEmbed()
      .setColor(monster.color)
      .addField(`${message.author.username}`, '<:power:736802386949177384> **Desferiu um dano de `' + randPlayer + '`**\n<:hpplayer:736802386407849984> **HP do Guerreiro:** `' + player.hp + '`')
      .addField(`${monster.name}`, '<:power:736802386949177384> **Revidou um dano de `' + randMonster + '`**\n<:hpmonster:736802385665589360> **HP do Monstro:** `' + monster.hp + '`')
      message.channel.send(embedContinue)
         attackAgain();
        }
      } else if (collected.first().content.toLowerCase() === "fugir") {
      fugirBatalha()
      } else {
         message.channel.send("**`~" + message.author.username + "` preste atenção na batalha ou irá morrer**");
         attackAgain();
      }
    })
    .catch(() => {
      console.log(console.err)
      message.channel.send("**Você é lento! `~" + message.author.username + "` perdeu `-" + goldDrop + "`**<:barras:732045043031867465> **pela derrota contra o `" + monster.name + "`**")
    });
  }
};
